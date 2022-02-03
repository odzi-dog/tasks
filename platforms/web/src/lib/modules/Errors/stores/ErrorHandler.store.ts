// Importing modules
import type { IError } from '$lib/types';
import { writable } from 'svelte/store';
import { toast } from '@zerodevx/svelte-toast';
import { fetchStore } from '$lib/helpers';
import { page } from '$app/stores';
import { CurrentUser } from '$lib/stores';
import type { ICurrentUserStore } from '$lib/stores';
import type { IPageStore } from '$lib/types';

// Store interface
export interface IErrorHandlerStore {
	errors: IError[];
}

// Function, that'll initialize our store
function _initialize() {
	// Creating defaultStore
	const defaultStore: IErrorHandlerStore = {
		errors: []
	};
	const { subscribe, update } = writable(defaultStore);

	// Returning subscribe method and other methods
	return {
		subscribe,

		// @method throw
		// - Used to throw errors
		async throw(error: IError) {
			// Checking if we need to redirect user (if he isn't authorized)
			// if (error.isAuthorizationRequired) {
			//   const currentPage = <IPageStore>(await fetchStore(page.subscribe));
			//   const currentUser = <ICurrentUserStore>(await fetchStore(CurrentUser.subscribe));

			//   console.log(currentPage);
			//   console.log(currentUser);

			//   if (!currentUser.loggedIn && currentPage.url.toString().includes('app')) {
			//     // Redirecting to landing page
			//     console.log('redirect');
			//   };
			// };

			// Firing error toast
			if (error.doFireToast != false) {
				toast.push(`Error occured:<br />${error.message ?? 'Unknown error'}`);
			}

			// Adding this error to this store
			update((object) => {
				object.errors.push(error);
				return object;
			});
		}
	};
}

// Exporting store itself
export const ErrorHandler = _initialize();
