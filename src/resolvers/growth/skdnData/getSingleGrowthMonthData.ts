import {
  GrowthInterpretationSeverity,
  GrowthType,
  SingleMeasurementMonthSkdnDataResponse,
} from '../../../generated/graphql'
import { NO_MEASUREMENT_RECORDS_FOUND } from '../../errors'
import { DenyutPosyanduSupabaseClient } from '../../utils/supabase'
import {
  BAWAH_GARIS_MERAH_LABEL,
  getGrowthLabelAndSeverity,
  getKidAgeInMonths,
} from '../growthInterpreter'
import { getPosyanduMonthYearRecords } from '../queries'
import { getWeightGrowthEvaluation } from '../weightEvaluation/resolver'

const GRADUATION_AGE_IN_MONTHS = 60
const S36_AGE_IN_MONTHS = 36
const S36_MINIMUM_WEIGHT_KG = 12.5

type GetSingleMonthDataParams = {
  supabase: DenyutPosyanduSupabaseClient
  posyanduId: string
  recordMonthIdx: number
  recordYear: number
}

export async function getSingleGrowthMonthData({
  supabase,
  posyanduId,
  recordMonthIdx,
  recordYear,
}: GetSingleMonthDataParams): Promise<
  Exclude<SingleMeasurementMonthSkdnDataResponse, '__typename'>
> {
  // Get all growth records for the given month and year
  const growthRecords = await getPosyanduMonthYearRecords({
    supabase,
    outpostRecordMonthIdx: recordMonthIdx,
    outpostRecordYear: recordYear,
    posyanduId,
  })
  console.log({ growthRecords })

  // dCount: Unique kid id count
  const dCount = new Set(growthRecords.map(cRecord => cRecord.kidId)).size

  // Get the most common measurement date from the records
  const mostCommonMeasurementDate = getMostCommonMeasurementDate(
    growthRecords.map(cRecord => cRecord.measurementDate),
  )

  if (mostCommonMeasurementDate === null) {
    throw NO_MEASUREMENT_RECORDS_FOUND
  }

  // sCount and kCount: For all recorded posyandu kids, count number of kids under 60 months old
  const skCount = growthRecords
    .map(cRecord => cRecord.KidInfo)
    .filter(
      cKidInfo =>
        getKidAgeInMonths(cKidInfo.dateOfBirth, mostCommonMeasurementDate) <
        GRADUATION_AGE_IN_MONTHS,
    ).length

  // nCount: Check weight evaluation, count isFulfilled
  const weightEvaluationPromises = growthRecords.map(cRecord =>
    getWeightGrowthEvaluation({
      supabase,
      outpostRecordMonthIdx: recordMonthIdx,
      outpostRecordYear: recordYear,
      kidId: cRecord.kidId,
      kidAgeInMonths: getKidAgeInMonths(
        cRecord.KidInfo.dateOfBirth,
        cRecord.measurementDate,
      ),
      currentWeight: cRecord.weight,
    }),
  )

  const weightEvaluations = await Promise.allSettled(weightEvaluationPromises)

  const nCount = weightEvaluations.filter(
    cWeightEvaluation =>
      cWeightEvaluation.status === 'fulfilled' &&
      cWeightEvaluation.value?.isEnough,
  ).length

  // S36 Count: Count number of kids under 36 months old with weight >= 12.5 kg
  const S36Count = growthRecords.filter(
    cRecord =>
      getKidAgeInMonths(
        cRecord.KidInfo.dateOfBirth,
        mostCommonMeasurementDate,
      ) <= S36_AGE_IN_MONTHS && cRecord.weight >= S36_MINIMUM_WEIGHT_KG,
  ).length

  // L count: Count number of kids exactly 60 months old during the the measurement date
  const LCount = growthRecords.filter(
    cRecord =>
      getKidAgeInMonths(
        cRecord.KidInfo.dateOfBirth,
        mostCommonMeasurementDate,
      ) === GRADUATION_AGE_IN_MONTHS,
  ).length

  // Weight interpretation records
  const weightInterpretations = growthRecords
    .map(cRecord => {
      return getGrowthLabelAndSeverity(
        getKidAgeInMonths(cRecord.KidInfo.dateOfBirth, cRecord.measurementDate),
        GrowthType.Weight,
        cRecord.KidInfo.sex,
        cRecord.weight,
      )
    })
    .filter(Boolean)

  const goodWeightCount = weightInterpretations.filter(
    cWeightInterpretation =>
      cWeightInterpretation.severity === GrowthInterpretationSeverity.Normal,
  ).length

  const lessWeightCount = weightInterpretations.filter(
    cWeightInterpretation =>
      cWeightInterpretation.severity === GrowthInterpretationSeverity.Warning,
  ).length

  const lowWeightCount = weightInterpretations.filter(
    cWeightInterpretation =>
      cWeightInterpretation.severity === GrowthInterpretationSeverity.Severe &&
      cWeightInterpretation.label === BAWAH_GARIS_MERAH_LABEL,
  ).length

  return {
    dCount,
    sCount: skCount,
    kCount: skCount,
    nCount,
    S36Count,
    LCount,
    goodWeightCount,
    lessWeightCount,
    lowWeightCount,
  }
}

function getMostCommonMeasurementDate(
  growthRecordMeasurementDates: string[],
): string | null {
  if (growthRecordMeasurementDates.length === 0) {
    return null
  }
  const dateCounts = growthRecordMeasurementDates.reduce(
    (acc, measurementDate) => {
      if (acc[measurementDate]) {
        acc[measurementDate] += 1
      } else {
        acc[measurementDate] = 1
      }

      return acc
    },
    {} as Record<string, number>,
  )

  let mostCommonMeasurementDate = ''
  let maxCount = 0

  for (const [date, count] of Object.entries(dateCounts)) {
    if (count > maxCount) {
      mostCommonMeasurementDate = date
      maxCount = count
    }
  }

  return mostCommonMeasurementDate
}
