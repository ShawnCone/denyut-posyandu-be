import '@total-typescript/ts-reset'
import {
  GrowthType,
  PreviousGrowthMeasurementData,
} from '../../generated/graphql'
import { DATA_NOT_FOUND_ERROR, UNABLE_TO_FETCH_DATA_ERROR } from '../errors'
import { DenyutPosyanduSupabaseClient } from '../utils/supabase'
import { getPreviousMonthIdxAndYear } from './growthInterpretation/utils'

type MeasurementRecordValues = {
  height: number
  weight: number
  armCirc: number | null
  headCirc: number | null
}
function getRecordMeasurementValue(
  growthType: GrowthType,
  measurementRecordValues: MeasurementRecordValues,
): number | null {
  switch (growthType) {
    case GrowthType.Height:
      return measurementRecordValues.height
    case GrowthType.Weight:
      return measurementRecordValues.weight
    case GrowthType.Armcirc:
      return measurementRecordValues.armCirc
    case GrowthType.Headcirc:
      return measurementRecordValues.headCirc
  }
}

type GetRecordInfoParams = {
  supabase: DenyutPosyanduSupabaseClient
  recordId: string
  growthType: GrowthType
}

export async function getRecordInfo({
  supabase,
  recordId,
  growthType,
}: GetRecordInfoParams) {
  const { data: recordInfo, error } = await supabase
    .from('KidBodilyGrowth')
    .select(
      'outpostRecordMonthIdx, outpostRecordYear, measurementDate, height, weight, armCirc, headCirc, KidInfo(dateOfBirth, sex, id)',
    )
    .eq('recordId', recordId)
    .single()

  if (error) {
    throw UNABLE_TO_FETCH_DATA_ERROR
  }

  if (!recordInfo || !recordInfo.KidInfo) {
    throw DATA_NOT_FOUND_ERROR
  }

  const measurementValue = getRecordMeasurementValue(growthType, recordInfo)

  return {
    outpostRecordMonthIdx: recordInfo.outpostRecordMonthIdx,
    outpostRecordYear: recordInfo.outpostRecordYear,
    measurementDate: recordInfo.measurementDate,
    kidInfo: recordInfo.KidInfo,
    measurementValue,
  }
}

type GetMaybePreviousMeasurementRecordParams = {
  supabase: DenyutPosyanduSupabaseClient
  outpostRecordMonthIdx: number
  outpostRecordYear: number
  growthType: GrowthType
  kidId: string
}

export async function getMaybePreviousMeasurementRecord({
  supabase,
  outpostRecordMonthIdx,
  outpostRecordYear,
  growthType,
  kidId,
}: GetMaybePreviousMeasurementRecordParams): Promise<PreviousGrowthMeasurementData | null> {
  const { monthIdx: previousMonthIdx, year: previousYear } =
    getPreviousMonthIdxAndYear(outpostRecordMonthIdx, outpostRecordYear)

  const { data: previousRecord, error } = await supabase
    .from('KidBodilyGrowth')
    .select('height, weight, armCirc, headCirc, measurementDate')
    .eq('outpostRecordMonthIdx', previousMonthIdx)
    .eq('outpostRecordYear', previousYear)
    .eq('kidId', kidId)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw UNABLE_TO_FETCH_DATA_ERROR
  }

  if (!previousRecord) {
    return null
  }

  const measurementValue = getRecordMeasurementValue(growthType, previousRecord)

  if (measurementValue === null) {
    return null
  }

  return {
    measurementDate: previousRecord.measurementDate,
    measurementValue,
  }
}

// For SKDN data
type SKDNRecordInfo = {
  recordId: string
  weight: number
  kidId: string
  measurementDate: string
  KidInfo: {
    dateOfBirth: string
    sex: 'male' | 'female'
  }
}[]

type GetKidListInPosyanduParams = {
  supabase: DenyutPosyanduSupabaseClient
  posyanduId: string
}

export async function getKidInfosInPosyandu({
  supabase,
  posyanduId,
}: GetKidListInPosyanduParams) {
  const { data: kidList, error } = await supabase
    .from('OutpostKids')
    .select('KidInfo(sex, dateOfBirth, id)')
    .eq('outpostId', posyanduId)

  if (error) {
    throw UNABLE_TO_FETCH_DATA_ERROR
  }

  return kidList.map(cDatum => cDatum.KidInfo).filter(Boolean)
}

type GetPosyanduMonthYearRecordsParams = {
  supabase: DenyutPosyanduSupabaseClient
  outpostRecordMonthIdx: number
  outpostRecordYear: number
  posyanduId: string
}

export async function getPosyanduMonthYearRecords({
  supabase,
  outpostRecordMonthIdx,
  outpostRecordYear,
  posyanduId,
}: GetPosyanduMonthYearRecordsParams): Promise<SKDNRecordInfo> {
  // Maybe able to be optimized by inserting posyandu kids list in the param
  const posyanduKidInfos = await getKidInfosInPosyandu({ supabase, posyanduId })

  const { data: posyanduMonthYearRecords, error } = await supabase
    .from('KidBodilyGrowth')
    .select(
      'recordId, weight, kidId, measurementDate, KidInfo(dateOfBirth, sex)',
    )
    .lte('outpostRecordMonthIdx', outpostRecordMonthIdx)
    .lte('outpostRecordYear', outpostRecordYear)
    .in(
      'kidId',
      posyanduKidInfos.map(kid => kid.id),
    )

  if (error) {
    throw UNABLE_TO_FETCH_DATA_ERROR
  }

  if (!posyanduMonthYearRecords) {
    throw DATA_NOT_FOUND_ERROR
  }

  // Kidinfo must be not null, filter out if null
  const skdnRecordInfoArr: SKDNRecordInfo = []
  for (const cRecord of posyanduMonthYearRecords) {
    if (cRecord.KidInfo === null) {
      continue
    }
    skdnRecordInfoArr.push({
      recordId: cRecord.recordId,
      weight: cRecord.weight,
      kidId: cRecord.kidId,
      measurementDate: cRecord.measurementDate,
      KidInfo: cRecord.KidInfo,
    })
  }

  return skdnRecordInfoArr
}
