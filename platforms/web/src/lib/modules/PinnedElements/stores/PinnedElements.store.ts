// Importing modules
import { writable } from 'svelte/store';
import type { ICollectionObject, ITaskObject } from '$shared/types';
import { client } from '$lib/modules/Gateway/services';
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
			const query = client.query<IPinnedTasksResult>(PinnedTasksQuery);

			query.refetch();

			const unsubscribe = query.subscribe((response) => {
				if (response.loading) return;

				// Checking if we have any errors
				if (response.error) {
					ErrorHandler.throw({
						type: ErrorType.SERVER_ERROR,
						message: 'Could not fetch PinnedTasks'
					});

					resolve(null);
				} else {
					// Updating
					update((object) => {
						object.tasks = response.data?.PinnedTasks;

						return object;
					});

					unsubscribe();
					resolve(null);
				}
			});
		});
	}

	// Fetch collections function
	async function _fetchCollections() {
		return new Promise((resolve) => {
			// Generating query
			const query = client.query<IPinnedCollectionsResult>(PinnedCollectionsQuery);

			query.refetch();

			const unsubscribe = query.subscribe((response) => {
				if (response.loading) return;

				// Checking if we have any errors
				if (response.error) {
					ErrorHandler.throw({
						type: ErrorType.SERVER_ERROR,
						message: 'Could not fetch PinnedCollections'
					});

					resolve(null);
				} else {
					// Updating
					update((object) => {
						object.collections = response.data?.PinnedCollections;

						return object;
					});

					unsubscribe();
					resolve(null);
				}
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
