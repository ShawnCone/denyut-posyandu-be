import { GrowthType, Resolvers } from '../../../generated/graphql'
import { checkTokenExists } from '../../errors'
import { getSupabaseClient } from '../../utils/supabase'
import { getMaybePreviousMeasurementRecord, getRecordInfo } from '../queries'
import {
  getGrowthLabelAndSeverity,
  getKidAgeInMonths,
} from './growthInterpreter'
import { getWeightIncreaseIsEnough } from './weightEnoughEvaluator'

const resolver: Resolvers['Query']['growthInterpretation'] = async (
  _,
  { growthType, recordId },
  { token },
) => {
  // Check if user is authenticated
  const dirtyToken = checkTokenExists(token)

  // Get supabase client (use token)
  const supabase = getSupabaseClient(dirtyToken)

  // Get kid age and sex from supabase, and outpost month and year (Use kid info from recordId)
  const recordInfo = await getRecordInfo({
    supabase,
    recordId,
    growthType,
  })

  if (recordInfo.measurementValue === null) return null

  // Get label and severity (Use the growthType, kid age (month) and sex)
  const kidAgeInMonths = getKidAgeInMonths(
    recordInfo.kidInfo.dateOfBirth,
    recordInfo.measurementDate,
  )
  const labelAndSeverity = getGrowthLabelAndSeverity(
    kidAgeInMonths,
    growthType,
    recordInfo.kidInfo.sex,
    recordInfo.measurementValue,
  )

  if (labelAndSeverity === null) return null

  // Get previous month record and calculate diff (if applicable) (Use outpost month and year - 1)
  const previousMeasurementValue = await getMaybePreviousMeasurementRecord({
    supabase,
    outpostRecordMonthIdx: recordInfo.outpostRecordMonthIdx,
    outpostRecordYear: recordInfo.outpostRecordYear,
    growthType,
  })

  const diff =
    previousMeasurementValue === null
      ? null
      : recordInfo.measurementValue - previousMeasurementValue

  // If weight, check isEnough
  const isEnough =
    growthType === GrowthType.Weight && diff !== null
      ? getWeightIncreaseIsEnough({
          weightIncrease: diff,
          monthOld: kidAgeInMonths,
        })
      : null

  return {
    label: labelAndSeverity.label,
    severity: labelAndSeverity.severity,
    isEnough: isEnough,
    differenceSincePrevious: diff,
  }
}

export default resolver
