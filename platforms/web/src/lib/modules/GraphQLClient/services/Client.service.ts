import { GraphQLClient } from 'graphql-request';

// Exporting GraphQLClient
export const client = new GraphQLClient('https://api.tasks.odzi.dog/graphql', {
  credentials: 'include',
});