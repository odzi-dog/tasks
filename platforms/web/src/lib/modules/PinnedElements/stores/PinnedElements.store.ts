// Importing modules
import { writable } from 'svelte/store';
import type { ICollectionObject, ITaskObject } from '$shared/types';
import { client } from '$lib/modules/GraphQLClient/module';
import { ErrorHandler } from '$lib/modules/Errors/stores';
import { ErrorType } from '$lib/types';

// Queries
import { PinnedCollectionsQuery } from '../queries';
import type { IPinnedCollectionsResult } from '../queries';

import { PinnedTasksQuery } from '../queries';
import type { IPinnedTasksResult } from '../queries';

// Exporting store interface
export interface IPinnedElementsStore {
	tasks: Array<Pick<ITaskObject, '_id' | 'icon' | 'title' | 'subtitle'>>;
	collections: Array<Pick<ICollectionObject, '_id' | 'icon' | 'title' | 'subtitle' | 'tasks'>>;
}

// Function, that'll initialize our store
function _initialize() {
	// Default store object
	const defaultStore: IPinnedElementsStore = {
		tasks: [],
		collections: []
	};
	const { subscribe, update } = writable(defaultStore);

	// Fetch tasks function
	async function _fetchTasks() {
		return new Promise((resolve) => {
			// Generating query
      client.request<IPinnedTasksResult>(PinnedTasksQuery)
      .then((data) => {
					// Updating
					update((object) => {
						object.tasks = data?.PinnedTasks;

						return object;
					});

					resolve(null);
      })
      .catch(() => {
        ErrorHandler.throw({
          type: ErrorType.SERVER_ERROR,
          message: 'Could not fetch PinnedTasks'
        });

        // Resolving
        resolve(null);
      });
		});
	}

	// Fetch collections function
	async function _fetchCollections() {
		return new Promise((resolve) => {
			// Generating query
      client.request<IPinnedCollectionsResult>(PinnedCollectionsQuery)
      .then((data) => {
        // Updating
        update((object) => {
          object.collections = data?.PinnedCollections;

          return object;
        });

        resolve(null);
      })
      .catch(() => {
        ErrorHandler.throw({
          type: ErrorType.SERVER_ERROR,
          message: 'Could not fetch PinnedCollections'
        });

        // Resolving
        resolve(null);
      });
		});
	}

	// Returning subscribe and other store methods
	return {
		subscribe,

		// @method fetch
		// - Fetches/refetches pinned elements
		// from GraphQL API
		async fetch() {
			console.log('fetch pinned elements');
			await _fetchTasks();
			await _fetchCollections();
		}
	};
}

// Exporting store itself
export const PinnedElements = _initialize();
