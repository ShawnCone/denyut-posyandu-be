import { test } from 'vitest'
import { getPreviousMonthIdxAndYear } from './utils'

test('getPreviousMonthIdxAndYear - should return previous month and year', ({
  expect,
}) => {
  const result = getPreviousMonthIdxAndYear(1, 2022)
  expect(result).toEqual({ monthIdx: 0, year: 2022 })
})

test('getPreviousMonthIdxAndYear - should return December of previous year if current month is January', ({
  expect,
}) => {
  const result = getPreviousMonthIdxAndYear(0, 2022)
  expect(result).toEqual({ monthIdx: 11, year: 2021 })
})
