// Importing modules
import gql from 'graphql-tag';
import type { ICollectionObject } from '$shared/types';

// Exporting mutation result interface
export interface ICreateCollectionMutationResult {
  CreateCollection: Pick<ICollectionObject, '_id'>,
};

// Exporting mutation itself
export const CreateCollectionMutation = gql`
  mutation CreateCollection($input: CreateCollectionInput!) {
    CreateCollection(input: $input) {
      _id
    }
  }
`;