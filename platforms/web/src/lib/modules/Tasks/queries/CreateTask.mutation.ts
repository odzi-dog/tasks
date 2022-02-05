// Importing modules
import gql from 'graphql-tag';
import type { ITaskObject } from '$shared/types';

// Exporting mutation response interface
export interface ICreateTaskMutationResult {
  CreateTask: Pick<ITaskObject, '_id'>,
};

// Exporting mutation itself
export const CreateTaskMutation = gql`
  mutation CreatTask(
    $collectionId: String, 
    $taskId: String,
    $input: CreateTaskInput!
  ) {
      CreateTask(collectionId: $collectionId, taskId: $taskId, input: $input) {
        _id
      }
    }
`;