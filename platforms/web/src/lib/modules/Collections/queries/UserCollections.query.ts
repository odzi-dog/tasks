// Importing modules
import gql from 'graphql-tag';
import type { ITaskSessionObject, ICollectionObject, ITaskObject } from '$shared/types';
import { TaskPart } from '$lib/modules/Tasks/queries';

// Exporting result interface
export interface IUserCollectionsResult {
	UserCollections: Array<
		Pick<ICollectionObject, '_id' | 'title' | 'subtitle'> & {
			tasks: Array<
				Pick<ITaskObject, '_id' | 'title' | 'subtitle' | 'parent'> & {
					sessions: Array<Pick<ITaskSessionObject, '_id' | 'startDate' | 'endDate'>>;
				}
			>;
		}
	>;
}

// Exporting query itself
export const UserCollectionsQuery = gql`
  {
    UserCollections {
      _id
      title
      subtitle
      tasks {
        ${TaskPart}
      }
    }
  }
`;
