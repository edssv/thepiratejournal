module.exports = {
  projects: {
    app: {
      schema: ['src/gql/schema/schema.graphql'],
      documents: ['src/**/*.graphql'],
      extensions: {
        endpoints: {
          default: {
            url: process.env.NEXT_PUBLIC_GRAPHQL_URL
          }
        },
        languageService: {
          // skip generated_schema.graphql file with GoTo definition
          useSchemaFileDefinitions: true
        }
      }
    }
  }
};
