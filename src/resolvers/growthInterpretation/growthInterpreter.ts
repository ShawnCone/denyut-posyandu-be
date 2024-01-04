import { differenceInCalendarMonths } from 'date-fns'
import {
  GrowthInterpretationSeverity,
  GrowthType,
} from '../../generated/graphql'
import { Database } from '../../generated/supabase'
import { INVALID_MONTH_OLD_ERROR } from '../errors'
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
  sex: Database['public']['Enums']['sex_enum']
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
        label: GrowthInterpretationSeverity.Normal,
      }
  }
}

function getWeightSeverityAndLabel(
  inZone: StandardDeviationZone,
): GrowthInterpreterOutput {
  switch (inZone) {
    case '> SD3':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Berat Badan Lebih',
      }
    case 'SD2 - SD3':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Berat Badan Lebih Sedikit',
      }
    case 'SD1 - SD2':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Berat Normal Lebih',
      }
    case 'SD0 - SD1':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Berat Normal',
      }
    case 'SD1neg - SD0':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Berat Badan Kurang Sedikit',
      }
    case 'SD2neg - SD1neg':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Berat Badan Kurang',
      }
    case '< SD3neg':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Berat Badan Sangat Kurang',
      }
    default:
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: GrowthInterpretationSeverity.Normal,
      }
  }
}
function getHeadCircumferenceSeverityAndLabel(
  inZone: StandardDeviationZone,
): GrowthInterpreterOutput {
  switch (inZone) {
    case '> SD3':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Lingkar Kepala Lebih',
      }
    case 'SD2 - SD3':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Lingkar Kepala Lebih Sedikit',
      }
    case 'SD1 - SD2':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Lingkar Kepala Normal Lebih',
      }
    case 'SD0 - SD1':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Lingkar Kepala Normal',
      }
    case 'SD1neg - SD0':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Lingkar Kepala Kurang Sedikit',
      }
    case 'SD2neg - SD1neg':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Lingkar Kepala Kurang',
      }
    case '< SD3neg':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Lingkar Kepala Sangat Kurang',
      }
    default:
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: GrowthInterpretationSeverity.Normal,
      }
  }
}
function getArmCircumferenceSeverityAndLabel(
  inZone: StandardDeviationZone,
): GrowthInterpreterOutput {
  switch (inZone) {
    case '> SD3':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Lingkar Lengan Lebih',
      }
    case 'SD2 - SD3':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Lingkar Lengan Lebih Sedikit',
      }
    case 'SD1 - SD2':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Lingkar Lengan Normal Lebih',
      }
    case 'SD0 - SD1':
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: 'Lingkar Lengan Normal',
      }
    case 'SD1neg - SD0':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Lingkar Lengan Kurang Sedikit',
      }
    case 'SD2neg - SD1neg':
      return {
        severity: GrowthInterpretationSeverity.Warning,
        label: 'Lingkar Lengan Kurang',
      }
    case '< SD3neg':
      return {
        severity: GrowthInterpretationSeverity.Severe,
        label: 'Lingkar Lengan Sangat Kurang',
      }
    default:
      return {
        severity: GrowthInterpretationSeverity.Normal,
        label: GrowthInterpretationSeverity.Normal,
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
  sex: Database['public']['Enums']['sex_enum'],
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
