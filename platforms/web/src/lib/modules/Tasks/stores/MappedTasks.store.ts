// Importing modules
import { writable } from 'svelte/store';
import type { IMappedTask } from '$lib/types';
import type { ITaskObject, ITaskSessionObject } from '$shared/types';
import { TaskInstanceService } from '../services';

// Exporting store interface
export type IMappedTasks = Record<string, IMappedTask>;

// Function, that'll initialize our store
function _initialize() {
	// Default store
	const defaultStore: IMappedTasks = {};
	const { subscribe, update } = writable(defaultStore);

	// Exporting subscribe and other methods
	return {
		subscribe,

		// method update
		async update(
			task: Pick<ITaskObject, '_id' | 'title' | 'subtitle' | 'parent'> & {
				sessions: Array<Pick<ITaskSessionObject, '_id' | 'startDate' | 'endDate'>>;
			},
			collectionId?: string
		) {
			// Updating this task in our store
			update((object) => {
				let mappedTask: IMappedTask = {
					_id: task._id,
					parent: task.parent,
					title: task.title,
					subtitle: task.subtitle,
					subtasks: [],
					sessions: {
						ended: [],
						running: []
					},
					collectionId
				};

        // Checking if we are updating this task
        if (object[String(task._id)] != null) {
          // hard-update subtasks
          mappedTask.subtasks = object[String(task._id)].subtasks;

          // hard-update parent object
          mappedTask.parent = object[String(task._id)].parent;
        };

				// Updating subtasks of other tasks (if needed)
				if (object[String(task.parent?._id)] != null) {
					const parent = object[String(task.parent?._id)];
          if (!parent.subtasks.includes(String(task._id)))
            parent.subtasks.push(String(task._id));

					object[String(task.parent?._id)] = parent;
				}

				// Sessions
				if (task.sessions?.length > 0) {
					mappedTask.sessions.ended = task.sessions.filter((session) => session.endDate);
          mappedTask.sessions.running = task.sessions.filter((session) => !session.endDate);
				};

        // Regenerating task instance for this task
        const instance = TaskInstanceService.createForTask(mappedTask);
        mappedTask.instance = instance;

				object[String(task._id)] = mappedTask;

				return object;
			});
		}
	};
}

// Exporting store itself
export const MappedTasks = _initialize();
