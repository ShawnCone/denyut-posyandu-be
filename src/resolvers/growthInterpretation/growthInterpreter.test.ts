import { describe, expect, it } from 'vitest'
import { getKidAgeInMonths } from './growthInterpreter'

describe('getKidAgeInMonths', () => {
  const dateOfBirth = new Date('2021-01-01').toISOString()

  it('should return 0 months', () => {
    const measurementDate = new Date('2021-01-01').toISOString()
    const result = getKidAgeInMonths(dateOfBirth, measurementDate)
    expect(result).toBe(0)
  })

  it('should return 1 month', () => {
    const measurementDate = new Date('2021-02-01').toISOString()
    const result = getKidAgeInMonths(dateOfBirth, measurementDate)
    expect(result).toBe(1)
  })

  it('should return 2 months', () => {
    const measurementDate = new Date('2021-03-01').toISOString()
    const result = getKidAgeInMonths(dateOfBirth, measurementDate)
    expect(result).toBe(2)
  })
})
