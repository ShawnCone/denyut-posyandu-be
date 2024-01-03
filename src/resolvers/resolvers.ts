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
    weightIsEnough2: async (_, _args, _contextValue) => {
      return {
        isEnough: true,
      }
    },
  },
  Mutation: {
    // Example
    someChange: async (_, __, ___) => {
      // Something
      return true
    },
  },
}

export default resolvers
