<script lang="ts">
	// Importing modules
	import { UserLayoutSettings } from '$lib/stores';
	import {
		Icon,
		ViewGrid,
		ColorSwatch,
		ChevronLeft,
		Plus,
		Beaker,
		ChevronRight
	} from 'svelte-hero-icons';

	// headerTabs information
	let headerTabs = [
		{
			icon: ViewGrid,
			text: 'Dashboard'
		},
		{
			icon: ColorSwatch,
			text: 'Tasks'
		}
	];

	// Exporting settings
	// > Sidebar-related
	export let isSidebarHidden: boolean;
</script>

<!-- Layout -->
<header
	class="absolute top-0 px-3 py-3 w-full bg-zinc-800 shadow-lg flex justify-between items-stretch"
>
	<!-- Tabs -->
	<div class="flex items-stretch">
		<!-- Logotype -->
		<button
			on:click={() => {
				UserLayoutSettings.switchSidebar();
			}}
			class="mx-2 p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100"
		>
			<Icon src={isSidebarHidden ? ChevronRight : ChevronLeft} class="h-5" />
		</button>

		{#each headerTabs as tab}
			<button
				class="mx-2 px-3 py-2 flex items-center text-white opacity-60 hover:bg-zinc-600 hover:opacity-100 rounded-xl"
			>
				<!-- Icon -->
				<Icon src={tab.icon} class="h-5 w-5" />

				<!-- Text -->
				<p class="text-sm ml-1.5">{tab.text}</p>
			</button>
		{/each}
	</div>

	<!-- Account -->
	<div class="flex items-center">
		<!-- Time -->
		<div />

		<!-- Add task -->
		<button
			class="mx-1 p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-700 text-white hover:from-zinc-600 hover:to-zinc-600 hover:opacity-100"
		>
			<Icon src={Plus} class="h-4" />
		</button>

		<!-- Toolbox -->
		<button class="mx-1 p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100">
			<Icon src={Beaker} class="h-4" />
		</button>
	</div>
</header>
