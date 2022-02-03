// Importing types
import type { TaskInstance } from '$lib/modules/Tasks/services';
import type { ITaskObject, ITaskSession } from '$shared/types';

// Exporting ITask type
export interface IMappedTask extends Pick<ITaskObject, '_id' | 'title' | 'subtitle' | 'parent'> {
	collectionId?: string;
	sessions: {
		ended: Array<Pick<ITaskSession, '_id' | 'startDate' | 'endDate'>>;
		running: Array<Pick<ITaskSession, '_id' | 'startDate' | 'endDate'>>;
	};
	subtasks: Array<string>;
  instance?: TaskInstance;
}
