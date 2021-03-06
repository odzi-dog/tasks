// Importing modules
import gql from 'graphql-tag';
import type { ITaskSession } from '$shared/types';

// Exporting result object
export interface IStartSessionMutationResponse {
  StartTaskSession: Pick<ITaskSession, '_id'>
};

// Exporting mutation itself
export const StartSessionMutation = gql`
  mutation StartSession($taskId: String!) {
    StartTaskSession(taskId: $taskId) {
      _id
    }
  }
`;