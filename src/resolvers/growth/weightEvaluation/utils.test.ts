import { test } from 'vitest'
import { getRequiredWeightIncreaseForMonth } from './utils'

test('getRequiredWeightIncreaseForMonth - should return true when weight increase is enough', ({
  expect,
}) => {
  const params = {
    weightIncreaseInGrams: 400,
    monthOld: 6,
  }

  const targetIncrease = getRequiredWeightIncreaseForMonth(params.monthOld)
  expect(targetIncrease).toBeTypeOf('number')
  if (targetIncrease === null) return

  expect(params.weightIncreaseInGrams >= targetIncrease).toBe(true)
})

test('getRequiredWeightIncreaseForMonth - should return false when weight increase is not enough', ({
  expect,
}) => {
  const params = {
    weightIncreaseInGrams: 399,
    monthOld: 6,
  }
  const targetIncrease = getRequiredWeightIncreaseForMonth(params.monthOld)
  expect(targetIncrease).toBeTypeOf('number')
  if (targetIncrease === null) return

  expect(params.weightIncreaseInGrams >= targetIncrease).toBe(false)
})

test('getRequiredWeightIncreaseForMonth - should return null when there is no required weight increase for the given month', ({
  expect,
}) => {
  const params = {
    weightIncreaseInGrams: 15,
    monthOld: 0,
  }
  const targetIncrease = getRequiredWeightIncreaseForMonth(params.monthOld)
  expect(targetIncrease).toBeNull()
})
