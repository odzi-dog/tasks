// Importing types
import type { Subscriber } from 'svelte/store';

// @helper FetchStore
// - Subscribes to provided store through svelte's subscribe method
// and returns store object through promise.
export function fetchStore(subscribe: Subscriber<any>) {
	return new Promise((resolve) => {
		subscribe((object) => {
			resolve(object);
		});
	});
}
