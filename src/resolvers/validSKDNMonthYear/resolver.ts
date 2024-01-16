import { Resolvers } from '../../generated/graphql'
import { checkTokenExists } from '../errors'
import { getSupabaseClient } from '../utils/supabase'
import { getValidSKDNMonthYear } from './utils'

const resolver: Resolvers['Query']['validSKDNMonthYear'] = async (
  _,
  { posyanduId },
  { token },
) => {
  // Check if user is authenticated
  const dirtyToken = checkTokenExists(token)

  // Get supabase client (use token)
  const supabase = getSupabaseClient(dirtyToken)

  return await getValidSKDNMonthYear({
    supabase,
    posyanduId,
  })
}

export default resolver
