import { Resolvers } from '../generated/graphql'

const resolvers: Resolvers = {
  Query: {
    // Example
    weightIsEnough: async (_, args, contextValue) => {
      console.log({ args, contextValue: contextValue.token })
      return {
        isEnough: true,
      }
    },
  },
}

export default resolvers
