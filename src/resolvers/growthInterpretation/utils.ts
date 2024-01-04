export function getPreviousMonthIdxAndYear(
  monthIdx: number,
  year: number,
): {
  monthIdx: number
  year: number
} {
  if (monthIdx === 0) {
    return {
      monthIdx: 11,
      year: year - 1,
    }
  }
  return {
    monthIdx: monthIdx - 1,
    year,
  }
}
