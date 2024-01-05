import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { Database } from '../../generated/supabase'

// Maybe good to move thjis to .env
const PUBLIC_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uY21rZWVzaXptcGh2cXlsZnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5OTE2NjEsImV4cCI6MTk4NjU2NzY2MX0.ZxRt-WWcUb8b45EDwHkPDrWnYDJkyfx7yMTwVyKkgro'
const SUPABASE_URL = 'https://mncmkeesizmphvqylfqr.supabase.co'

// Make sure token has "Bearer" prefix if not, add it
function getCleanToken(dirtyToken: string) {
  return dirtyToken.startsWith('Bearer ') ? dirtyToken : `Bearer ${dirtyToken}`
}

export type DenyutPosyanduSupabaseClient = SupabaseClient<Database>

export function getSupabaseClient(
  dirtyToken: string,
): DenyutPosyanduSupabaseClient {
  return createClient<Database>(SUPABASE_URL, PUBLIC_ANON_KEY, {
    global: {
      headers: {
        Authorization: getCleanToken(dirtyToken),
      },
    },
  })
}

// Common supabase types
export type SexType = Database['public']['Enums']['sex_enum']
