import { UNABLE_TO_FETCH_DATA_ERROR } from '../errors'
import { getKidInfosInPosyandu } from '../growth/queries'
import { DenyutPosyanduSupabaseClient } from '../utils/supabase'

type GetValidSKDNMonthYearParams = {
  supabase: DenyutPosyanduSupabaseClient
  posyanduId: string
}

export async function getValidSKDNMonthYear({
  supabase,
  posyanduId,
}: GetValidSKDNMonthYearParams) {
  // Get the list of posyandu kids
  const poysanduKidIds = await getKidInfosInPosyandu({
    supabase,
    posyanduId,
  })

  //   Get all records that has kid ID in the posyandu kids list
  const { data: measurementRecords, error } = await supabase
    .from('KidBodilyGrowth')
    .select('outpostRecordMonthIdx, outpostRecordYear')
    .in(
      'kidId',
      poysanduKidIds.map(kid => kid.id),
    )

  if (error) {
    throw UNABLE_TO_FETCH_DATA_ERROR
  }

  // Get unique month and year from the records
  const uniqueMonthYear = new Set(
    measurementRecords.map(
      cRecord =>
        `${cRecord.outpostRecordMonthIdx}-${cRecord.outpostRecordYear}`,
    ),
  )

  const uniqueMonthYearArr = Array.from(uniqueMonthYear)
    .map(cMonthYear => {
      const [monthIdx, year] = cMonthYear.split('-')
      return {
        monthIdx: Number(monthIdx),
        year: Number(year),
      }
    })
    .sort((a, b) => {
      if (a.year === b.year) {
        return a.monthIdx - b.monthIdx
      }
      return a.year - b.year
    })

  return uniqueMonthYearArr
}
