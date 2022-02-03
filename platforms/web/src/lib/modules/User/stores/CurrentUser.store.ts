// Importing modules
import { writable } from 'svelte/store';
import { client } from '$lib/modules/Gateway/module';
import type { IUserObject } from '$shared/types';

// Queries
import { MeQuery } from '../queries';
import type { MeQueryResult } from '../queries';
import { ErrorHandler } from '$lib/modules/Errors/stores';
import { ErrorType } from '$lib/types';

// Exporting store interface
export interface ICurrentUserStore {
	loggedIn: boolean;
	user?: IUserObject;
}

// Function, that'll initialize our store
function _initialize() {
	// Creating defaultStore
	const defaultStore: ICurrentUserStore = {
		loggedIn: false
	};
	const { subscribe, update } = writable(defaultStore);

	// Returning subscribe and other store-related methods
	return {
		subscribe,

		// @method initialize
		// - Checking user on graphql api
		// Returns {loggedIn} boolean
		async initialize() {
			return new Promise((resolve) => {
				// Getting query results
				const query = client.query<MeQueryResult>(MeQuery);

				// Refetching query to clear cache
				query.refetch();

				const unsubscribe = query.subscribe((response) => {
					if (response.loading) return;

					// Checking if we have any errors
					if (response.error || response.data?.Me == null) {
						// Firing error
						ErrorHandler.throw({
							type: ErrorType.UNAUTHORIZED,
							message: 'You need to authorize to view this page',

							doFireToast: true,
							isAuthorizationRequired: true
						});

						// Triggering store update
						update((object) => {
							return { loggedIn: false };
						});
					} else {
						// Updating store
						update((object) => {
							object.loggedIn = true;
							object.user = response.data?.Me;

							return object;
						});
					}

					unsubscribe();

					// Resolving
					resolve(response.error || response.data?.Me == null ? false : true);
				});
			});
		}

		// @method authenticate
		// - Authenticate user using provided {token}
	};
}

// Exporting store itself
export const CurrentUser = _initialize();
