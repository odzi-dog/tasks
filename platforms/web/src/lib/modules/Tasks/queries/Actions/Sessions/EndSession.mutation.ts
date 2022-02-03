// Importing modules
import { gql } from '@apollo/client/core';
import type { ITaskSession } from '$shared/types';

// Exporting result object
export interface IEndSessionMutationResponse {
  EndTaskSession: Pick<ITaskSession, '_id'>
};

// Exporting mutation itself
export const EndSessionMutation = gql`
  mutation EndSession($sessionId: String!) {
    EndTaskSession(sessionId: $sessionId) {
      _id
    }
  }
`;