import { GraphQLClient } from 'graphql-request';

// Exporting GraphQLClient
export const client = new GraphQLClient('http://localhost:3001/graphql', {
  credentials: 'include',
});