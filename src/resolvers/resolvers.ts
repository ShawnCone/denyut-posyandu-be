import { Resolvers } from '../generated/graphql'
import growthGraphResolver from './growth/growthGraph/resolver'
import growthInterpretationResolver from './growth/growthInterpretation/resolver'
import weightGrowhtEvaluationResolver from './growth/weightEvaluation/resolver'

const resolvers: Resolvers = {
  Query: {
    growthInterpretation: growthInterpretationResolver,
    growthGraphStandardData: growthGraphResolver,
    weightGrowthEvaluation: weightGrowhtEvaluationResolver,
  },
}

export default resolvers
