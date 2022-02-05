// Importing modules
import { writable } from 'svelte/store';
import { client } from '$lib/modules/GraphQLClient/module';
import type { IUserObject } from '$shared/types';
import { ErrorHandler } from '$lib/modules/Errors/stores';
import { ErrorType } from '$lib/types';

// Queries
import { MeQuery } from '../queries';
import type { MeQueryResult } from '../queries';

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
        // Making request
        client.request(MeQuery)
        .then((data: MeQueryResult) => {
          // Updating store
          update((object) => {
            object.loggedIn = true;
            object.user = data?.Me;

            return object;
          });

          // Resolving
          resolve(true);
        })
        .catch(() => {
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

          // Resolving
          resolve(false);
        });
      });
		}

		// @method authenticate
		// - Authenticate user using provided {token}
	};
}

// Exporting store itself
export const CurrentUser = _initialize();
