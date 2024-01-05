import { test } from 'vitest'
import { getWeightIncreaseIsEnough } from './weightEnoughEvaluator'

test('getWeightIncreaseIsEnough - should return true when weight increase is enough', ({
  expect,
}) => {
  const params = {
    weightIncrease: 400,
    monthOld: 6,
  }
  const result = getWeightIncreaseIsEnough(params)
  expect(result).toBe(true)
})

test('getWeightIncreaseIsEnough - should return false when weight increase is not enough', ({
  expect,
}) => {
  const params = {
    weightIncrease: 399,
    monthOld: 6,
  }
  const result = getWeightIncreaseIsEnough(params)
  expect(result).toBe(false)
})

test('getWeightIncreaseIsEnough - should return null when there is no required weight increase for the given month', ({
  expect,
}) => {
  const params = {
    weightIncrease: 15,
    monthOld: 0,
  }
  const result = getWeightIncreaseIsEnough(params)
  expect(result).toBeNull()
})
