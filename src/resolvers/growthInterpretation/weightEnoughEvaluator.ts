function getRequiredWeightIncreaseForMonth(inMonthOld: number): number | null {
  if (inMonthOld === 1) return 800

  if (inMonthOld === 2) return 900

  if (inMonthOld === 3) return 800

  if (inMonthOld === 4) return 600

  if (inMonthOld === 5) return 500

  if (inMonthOld === 6) return 400

  if (inMonthOld >= 7 && inMonthOld <= 10) return 300
  if (inMonthOld >= 11 && inMonthOld <= 60) return 200

  return null
}

type GetWeightIncreaseIsEnoughParams = {
  weightIncrease: number
  monthOld: number
}

export function getWeightIncreaseIsEnough({
  weightIncrease,
  monthOld,
}: GetWeightIncreaseIsEnoughParams): boolean | null {
  const requiredWeightIncrease = getRequiredWeightIncreaseForMonth(monthOld)
  if (!requiredWeightIncrease) return null

  return weightIncrease >= requiredWeightIncrease
}
