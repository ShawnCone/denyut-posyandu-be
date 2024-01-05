import '@total-typescript/ts-reset'
import { GrowthType, SingleMonthGrowthData } from '../../../generated/graphql'
import { SexType } from '../../utils/supabase'
import { GROWTH_STDEV_DATA_OBJECT, ValidAgeInMonths } from '../growthSTDEVData'

function getValidAgeInMonthsSafe(ageInMonths: number): ValidAgeInMonths | null {
  if (ageInMonths < 0) {
    return null
  }
  if (ageInMonths > 60) {
    return null
  }
  return ageInMonths as ValidAgeInMonths
}

export function getGraphStandardData(
  growthType: GrowthType,
  kidAgeInMonths: number,
  kidSex: SexType,
): SingleMonthGrowthData[] {
  // Get month range plus minus 5 months
  const monthAgeRange = Array.from({ length: 11 }, (_, i) => i - 5).map(i =>
    getValidAgeInMonthsSafe(i + kidAgeInMonths),
  )

  // Get rid of null values
  const monthAgeRangeNotNull: ValidAgeInMonths[] = monthAgeRange.filter(Boolean)

  // Get standard data for each month
  const standardData: (SingleMonthGrowthData | null)[] =
    monthAgeRangeNotNull.map(age => {
      const monthStdevData = GROWTH_STDEV_DATA_OBJECT[kidSex][age][growthType]
      if (!monthStdevData) {
        return null
      }

      return {
        ageInMonths: age,
        ...monthStdevData,
      }
    })

  // Remove null values
  return standardData.filter(Boolean)
}
