import { Resolvers } from '../../../generated/graphql'
import { checkTokenExists } from '../../errors'
import { getSupabaseClient } from '../../utils/supabase'
import { getKidAgeInMonths } from '../growthInterpreter'
import { getRecordInfo } from '../queries'
import { getGraphStandardData } from './utils'

const resolver: Resolvers['Query']['growthGraphStandardData'] = async (
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

  // Get the standard data given kid age month plus minus 5 months
  return {
    standardData: getGraphStandardData(
      growthType,
      kidAgeInMonths,
      recordInfo.kidInfo.sex,
    ),
    measurementMonthOld: kidAgeInMonths,
    measurementValue: recordInfo.measurementValue,
  }
}

export default resolver
