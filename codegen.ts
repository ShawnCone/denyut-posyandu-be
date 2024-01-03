import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schemas/**/*.graphql', // This line points to all .graphql files in the src/schemas/ directory
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        addUnderscoreToArgsType: true,
        contextType: '../context/AuthContext#AuthContext', // Path is relative to the generated file
      },
    },
  },
}

export default config
