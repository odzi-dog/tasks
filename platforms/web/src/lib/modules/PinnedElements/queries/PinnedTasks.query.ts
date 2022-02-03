// Importing modules
import { gql } from '@apollo/client/core';
import type { ITaskObject } from '$shared/types';

// Exporting result interface
export interface IPinnedTasksResult {
	PinnedTasks: Array<Pick<ITaskObject, '_id' | 'title' | 'subtitle' | 'icon'>>;
}

// Exporting query itself
export const PinnedTasksQuery = gql`
	{
		PinnedTasks {
			_id
			icon
			title
			subtitle
		}
	}
`;
