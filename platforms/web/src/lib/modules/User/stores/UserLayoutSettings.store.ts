// Importing modules
import { writable } from 'svelte/store';
import { LocalStorageService } from '$lib/modules/Storage/services';
import { fetchStore } from '$lib/helpers';

// Exporting store interface
export interface IUserLayoutSettingsStore {
	isSidebarHidden: boolean;
}

// Function, that'll  initialize our store
function _initialize() {
	// Default store object
	const defaultStore: IUserLayoutSettingsStore = {
		isSidebarHidden: false
	};
	const { subscribe, update } = writable(defaultStore);

	// Reusable function, that'll save our store
	async function saveStore() {
		// Getting store
		const store = await fetchStore(subscribe);

		// Saving
		LocalStorageService.set('layout.settings', store);
	}

	// Returning subscribe and other store methods
	return {
		subscribe,

		// @method initialize
		// - Fetches current user layout settings
		// from localStorage
		initialize() {
			// Fetching this store
			const store: Partial<IUserLayoutSettingsStore> = LocalStorageService.get('layout.settings');

			// Updating store
			update((object) => {
				return { ...object, ...store };
			});
		},

		// > Sidebar-related
		// @method switchSidebar
		// - Switches sidebar on/off depending on
		// current state (or just asserts provided state)
		switchSidebar(state?: boolean) {
			update((object) => {
				if (state == null) {
					object.isSidebarHidden = !object.isSidebarHidden;
				} else {
					object.isSidebarHidden = state;
				}

				// Saving store
				saveStore();

				return object;
			});
		}
	};
}

// Exporting store
export const UserLayoutSettings = _initialize();
