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
      'outpostRecordMonthIdx, outpostRecordYear, measurementDate, height, weight, armCirc, headCirc, KidInfo(dateOfBirth, sex)',
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
}

export async function getMaybePreviousMeasurementRecord({
  supabase,
  outpostRecordMonthIdx,
  outpostRecordYear,
  growthType,
}: GetMaybePreviousMeasurementRecordParams): Promise<PreviousGrowthMeasurementData | null> {
  const { monthIdx: previousMonthIdx, year: previousYear } =
    getPreviousMonthIdxAndYear(outpostRecordMonthIdx, outpostRecordYear)

  const { data: previousRecord, error } = await supabase
    .from('KidBodilyGrowth')
    .select('height, weight, armCirc, headCirc, measurementDate')
    .eq('outpostRecordMonthIdx', previousMonthIdx)
    .eq('outpostRecordYear', previousYear)
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
