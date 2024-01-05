import { Resolvers } from '../generated/graphql'
import growthGraphResolver from './growth/growthGraph/resolver'
import growthInterpretationResolver from './growth/growthInterpretation/resolver'

const resolvers: Resolvers = {
  Query: {
    growthInterpretation: growthInterpretationResolver,
    growthGraphStandardData: growthGraphResolver,
  },
}

export default resolvers
