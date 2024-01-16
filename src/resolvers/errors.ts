import { GraphQLError } from 'graphql'

const UNAUTHORIZED_ERROR = new GraphQLError(
  'You are not authorized to perform this action.',
  {
    extensions: {
      code: 'FORBIDDEN',
    },
  },
)

export function checkTokenExists(token?: string): string {
  if (typeof token === 'undefined') {
    throw UNAUTHORIZED_ERROR
  }
  return token
}

export const DATA_NOT_FOUND_ERROR = new GraphQLError('Data not found.', {
  extensions: {
    code: 'DATA_NOT_FOUND',
  },
})

export const UNABLE_TO_FETCH_DATA_ERROR = new GraphQLError(
  'Unable to fetch data.',
  {
    extensions: {
      code: 'UNABLE_TO_FETCH_DATA',
    },
  },
)

export const STANDARD_DATA_NOT_FOUND_ERROR = new GraphQLError(
  'Standard data not found.',
  {
    extensions: {
      code: 'STANDARD_DATA_NOT_FOUND',
    },
  },
)

export const INVALID_MONTH_OLD_ERROR = new GraphQLError(
  'Invalid month old error.',
  {
    extensions: {
      code: 'INVALID_MONTH_OLD',
    },
  },
)

export const NO_MEASUREMENT_RECORDS_FOUND = new GraphQLError(
  'No measurement records found.',
  {
    extensions: {
      code: 'INVALID_MONTH_OLD',
    },
  },
)

export const UNABLE_TO_GENERATE_SKDN_REPORT = new GraphQLError(
  'Unable to generate SKDN report.',
  {
    extensions: {
      code: 'UNABLE_TO_GENERATE_SKDN_REPORT',
    },
  },
)
