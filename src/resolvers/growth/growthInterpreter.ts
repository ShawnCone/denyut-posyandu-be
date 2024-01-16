import { differenceInCalendarMonths } from 'date-fns'
import {
  GrowthInterpretationSeverity,
  GrowthType,
} from '../../generated/graphql'
import { INVALID_MONTH_OLD_ERROR } from '../errors'
import { SexType } from '../utils/supabase'
import {
  GROWTH_STDEV_DATA_OBJECT,
  GrowthStandardDeviationLevel,
  GrowthStandardDeviationsMap,
  ValidAgeInMonths,
} from './growthSTDEVData'

function getValidAgeInMonths(ageInMonths: number): ValidAgeInMonths {
  if (ageInMonths < 0) {
    throw INVALID_MONTH_OLD_ERROR
  }
  if (ageInMonths > 60) {
    throw INVALID_MONTH_OLD_ERROR
  }
  return ageInMonths as ValidAgeInMonths
}

type GetSpecificStandardDataParams = {
  sex: SexType
  ageInMonths: number
  growthType: GrowthType
}

function getSpecificStandardData({
  sex,
  ageInMonths,
  growthType,
}: GetSpecificStandardDataParams): GrowthStandardDeviationsMap | null {
  const validAgeInMonths = getValidAgeInMonths(ageInMonths)

  const specificStandardData =
    GROWTH_STDEV_DATA_OBJECT[sex][validAgeInMonths][growthType]
  return specificStandardData
}

type StandardDeviationZone =
  | '< SD3neg'
  | 'SD3neg - SD2neg'
  | 'SD2neg - SD1neg'
  | 'SD1neg - SD0'
  | 'SD0 - SD1'
  | 'SD1 - SD2'
  | 'SD2 - SD3'
  | '> SD3'

function getStandardDeviationZone(
  measurementValue: number,
  specificStandardData: GrowthStandardDeviationsMap,
): StandardDeviationZone {
  let retStandardDeviationZone: StandardDeviationZone = '< SD3neg'
  const GrowthStandardDeviationLevelsToCheck: GrowthStandardDeviationLevel[] = [
    'SD3neg',
    'SD2neg',
    'SD1neg',
    'SD0',
    'SD1',
    'SD2',
    'SD3',
  ]
  // Get the standard deviation zone here
  for (const level of GrowthStandardDeviationLevelsToCheck) {
    if (measurementValue < specificStandardData[level]) {
      break
    }
    switch (level) {
      case 'SD3neg':
        retStandardDeviationZone = 'SD3neg - SD2neg'
        break
      case 'SD2neg':
        retStandardDeviationZone = 'SD2neg - SD1neg'
        break
      case 'SD1neg':
        retStandardDeviationZone = 'SD1neg - SD0'
        break
      case 'SD0':
        retStandardDeviationZone = 'SD0 - SD1'
        break
      case 'SD1':
        retStandardDeviationZone = 'SD1 - SD2'
        break
      case 'SD2':
        retStandardDeviationZone = 'SD2 - SD3'
        break
      case 'SD3':
        retStandardDeviationZone = '> SD3'
        break
    }
  }

  return retStandardDeviationZone
}

function getHeightSeverityAndLabel(inZone: StandardDeviationZone): {
  severity: GrowthInterpretationSeverity
  label: string
} {
  switch (inZone) {
    case '> SD3':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Tinggi',
      }
    case 'SD3neg - SD2neg':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Pendek',
      }
    case '< SD3neg':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Sangat Pendek',
      }
    default:
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Normal',
      }
  }
}

export const BAWAH_GARIS_MERAH_LABEL = 'Bawah Garis Merah (BGM)'

function getWeightSeverityAndLabel(inZone: StandardDeviationZone) {
  if (inZone === '> SD3' || inZone === 'SD2 - SD3') {
    return {
      severity: GrowthInterpretationSeverity.Severe,
      label: 'Berat Badan Lebih',
    }
  }

  if (inZone === 'SD1 - SD2') {
    return {
      severity: GrowthInterpretationSeverity.Normal,
      label: 'Berat Normal Lebih',
    }
  }

  if (inZone === 'SD0 - SD1' || inZone === 'SD1neg - SD0') {
    return {
      severity: GrowthInterpretationSeverity.Normal,
      label: 'Berat Normal',
    }
  }

  if (inZone === 'SD2neg - SD1neg') {
    return {
      severity: GrowthInterpretationSeverity.Normal,
      label: 'Berat Cukup',
    }
  }

  if (inZone === 'SD3neg - SD2neg') {
    return {
      severity: GrowthInterpretationSeverity.Warning,
      label: 'Kurang Gizi Ringan',
    }
  }

  return {
    severity: GrowthInterpretationSeverity.Severe,
    label: BAWAH_GARIS_MERAH_LABEL,
  }
}

function getHeadCircumferenceSeverityAndLabel(
  inZone: StandardDeviationZone,
): GrowthInterpreterOutput {
  // Defaults
  let severity: GrowthInterpretationSeverity =
    GrowthInterpretationSeverity.Normal
  let label = 'Normosefal'

  if (inZone === '> SD3' || inZone === 'SD2 - SD3') {
    severity = GrowthInterpretationSeverity.Severe
    label = 'Makrosefal'
  }

  if (inZone === 'SD3neg - SD2neg' || inZone === '< SD3neg') {
    severity = GrowthInterpretationSeverity.Severe
    label = 'Mikrosefal'
  }
  return { severity, label }
}

function getArmCircumferenceSeverityAndLabel(
  inZone: StandardDeviationZone,
): GrowthInterpreterOutput {
  switch (inZone) {
    case '> SD3':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Sangat lebar',
      }
    case 'SD2 - SD3':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Cukup lebar',
      }

    case 'SD3neg - SD2neg':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Cukup sempit',
      }
    case '< SD3neg':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Sangat sempit',
      }
    default:
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Normal',
      }
  }
}

// Exported functions
export function getKidAgeInMonths(
  dateOfBirth: string,
  dateOfMeasurement: string,
) {
  // Use date fns
  const ageInMonths = differenceInCalendarMonths(dateOfMeasurement, dateOfBirth)

  return ageInMonths
}

type GrowthInterpreterOutput = {
  label: string
  severity: GrowthInterpretationSeverity
}

export function getGrowthLabelAndSeverity(
  ageInMonths: number,
  growthType: GrowthType,
  sex: SexType,
  measurementValue: number,
): GrowthInterpreterOutput | null {
  // Get specific standard data
  const specificStandardData = getSpecificStandardData({
    ageInMonths,
    growthType,
    sex,
  })

  if (specificStandardData === null) {
    return null
  }

  // Get standard deviation zone
  const standardDeviationZone = getStandardDeviationZone(
    measurementValue,
    specificStandardData,
  )

  switch (growthType) {
    case GrowthType.Height:
      return getHeightSeverityAndLabel(standardDeviationZone)
    case GrowthType.Weight:
      return getWeightSeverityAndLabel(standardDeviationZone)
    case GrowthType.Headcirc:
      return getHeadCircumferenceSeverityAndLabel(standardDeviationZone)
    case GrowthType.Armcirc:
      return getArmCircumferenceSeverityAndLabel(standardDeviationZone)
  }
}
