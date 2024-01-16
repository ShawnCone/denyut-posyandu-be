import { Resolvers } from '../../../generated/graphql'
import { checkTokenExists } from '../../errors'
import { getSupabaseClient } from '../../utils/supabase'
import { getSingleGrowthMonthData } from './getSingleGrowthMonthData'

const resolver: Resolvers['Query']['singleMeasurementMonthSKDNData'] = async (
  _,
  { posyanduId, recordMonthIdx, recordYear },
  { token },
) => {
  // Check if user is authenticated
  const dirtyToken = checkTokenExists(token)

  // Get supabase client (use token)
  const supabase = getSupabaseClient(dirtyToken)

  return await getSingleGrowthMonthData({
    supabase,
    posyanduId,
    recordMonthIdx,
    recordYear,
  })
}

export default resolver
