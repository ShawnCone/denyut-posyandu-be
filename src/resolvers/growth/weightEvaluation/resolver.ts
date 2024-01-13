import { GrowthType, Resolvers } from '../../../generated/graphql'
import { checkTokenExists } from '../../errors'
import { getSupabaseClient } from '../../utils/supabase'
import { getKidAgeInMonths } from '../growthInterpretation/growthInterpreter'
import { getMaybePreviousMeasurementRecord, getRecordInfo } from '../queries'
import { getRequiredWeightIncreaseForMonth } from './utils'

const resolver: Resolvers['Query']['weightGrowthEvaluation'] = async (
  _,
  { recordId },
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
    growthType: GrowthType.Weight,
  })

  if (recordInfo.measurementValue === null) return null

  // Get kid age in month and required weight associated with it
  const kidAgeInMonths = getKidAgeInMonths(
    recordInfo.kidInfo.dateOfBirth,
    recordInfo.measurementDate,
  )

  const targetIncrease = getRequiredWeightIncreaseForMonth(kidAgeInMonths)
  if (targetIncrease === null) return null

  // Get previous month record and calculate diff (if applicable) (Use outpost month and year - 1)
  const previousMeasurementData = await getMaybePreviousMeasurementRecord({
    supabase,
    outpostRecordMonthIdx: recordInfo.outpostRecordMonthIdx,
    outpostRecordYear: recordInfo.outpostRecordYear,
    growthType: GrowthType.Weight,
    kidId: recordInfo.kidInfo.id,
  })

  if (previousMeasurementData === null) return null

  const increaseInWeightGrams =
    recordInfo.measurementValue * 1000 -
    previousMeasurementData.measurementValue * 1000

  // Get the standard data given kid age month plus minus 5 months
  return {
    increaseInWeight: increaseInWeightGrams,
    isEnough: increaseInWeightGrams >= targetIncrease,
    targetIncrease,
  }
}

export default resolver
