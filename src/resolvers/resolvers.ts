import { Resolvers } from '../generated/graphql'
import growthInterpretationResolver from './growthInterpretation/resolver'

const resolvers: Resolvers = {
  Query: {
    growthInterpretation: growthInterpretationResolver,
  },
}

export default resolvers
