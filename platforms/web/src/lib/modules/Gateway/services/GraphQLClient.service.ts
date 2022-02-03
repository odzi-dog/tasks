// Importing modules
import { InMemoryCache } from '@apollo/client/core';
import { SvelteApolloClient } from 'svelte-apollo-client';

// Creating and exporting basic http-graphql client
export const client = SvelteApolloClient({
	// +todo change
	uri: 'https://api.tasks.odzi.dog/graphql',
	cache: new InMemoryCache(),
	credentials: 'include'
});
