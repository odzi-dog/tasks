// Importing modules
import { writable } from 'svelte/store';
import { MappedTasks } from '../../Tasks/stores';
import type { ICollectionObject } from '$shared/types';
import { client } from '$lib/modules/GraphQLClient/module';
import { ErrorHandler } from '$lib/modules/Errors/stores';
import { ErrorType } from '$lib/types';

// Queries
import { UserCollectionsQuery } from '../queries';
import type { IUserCollectionsResult } from '../queries';

export type ICollectionStoreEntity = Pick<ICollectionObject, '_id' | 'title' | 'subtitle'> & {
	tasks: Array<string>;
};

// Exporting store interface
export interface IUserCollectionsStore {
	list: Array<ICollectionStoreEntity>;
}

// +todo
// MappedCollections. Example of probably properly implemented
// Mapped<Entity> store is in modules/Tasks/MappedTasks

// Function, that'll initialize our store
function _initialize() {
	// Default store
	const defaultStore: IUserCollectionsStore = { list: [] };
	const { subscribe, update } = writable(defaultStore);

	// Function, that'll fetch current user
	// collections and update our store
	async function _fetch() {
		return new Promise((resolve) => {
			// Generating query
      client.request<IUserCollectionsResult>(UserCollectionsQuery)
      .then((data) => {
        console.log(data);

        // Updating collections store
        update((object) => {
          object.list = data?.UserCollections.map((collection) => {
            return {
              ...collection,
              tasks: collection.tasks.map((task) => String(task._id))
            };
          });

          return object;
        });

        // Updating MappedTasks store
        data?.UserCollections.forEach((collection) => {
          if (collection.tasks?.length > 0) {
            collection.tasks.forEach((task) => {
              MappedTasks.update(task, String(collection._id));
            });
          }
        });

        // Resolving our promise
        resolve(null);
      })
      .catch(() => {
        ErrorHandler.throw({
          type: ErrorType.SERVER_ERROR,
          message: 'Error while fetching UserCollections'
        });

        // Resolving our promise
        resolve(null);
      });
		});
	}

	// Exporting subscribe and other methods
	return {
		subscribe,

		// method fetch
		async fetch() {
			await _fetch();
		}
	};
}

// Store itself
export const UserCollections = _initialize();
