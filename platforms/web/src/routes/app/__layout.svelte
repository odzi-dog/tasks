<script lang="ts">
	// Importing modules
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { goto } from '$app/navigation';

	import { CurrentUser, UserLayoutSettings, UpdatesConnection } from '$lib/stores';

	// Importing components
	import { AppHeader, AppSidebar } from '$components/Layout';

	let loaded = false;

	// Checking if our user is logged in or no
	onMount(() => {
		// Pre-fetching UserLayoutSettings
		// (Fetching them before user auth to prevent
		// unnecessary UI updates)
		UserLayoutSettings.initialize();

		CurrentUser.initialize().then((isLoggedIn: boolean) => {
			if (isLoggedIn) {
				loaded = true;

        // Initializing socket connection
        UpdatesConnection.initialize();
      } else {
				goto('/');
			}
		});
	});
</script>

{#if loaded && $UpdatesConnection.connected}
	<div class="w-full h-screen bg-zinc-900">
		<!-- Header -->
		<AppHeader isSidebarHidden={$UserLayoutSettings.isSidebarHidden} />

		<!-- Content -->
		<main class="w-full h-full flex overflow-hidden">
			<!-- Sidebar -->
			<AppSidebar isSidebarHidden={$UserLayoutSettings.isSidebarHidden} />

			<!-- Content itself -->
			<div class="w-full h-full overflow-y-auto pt-20">
				<slot />
			</div>
		</main>
	</div>
{:else}
	<div class="w-full h-screen bg-zinc-900 flex items-center justify-center">
		<Circle size={20} color="#fff" />
	</div>
{/if}
