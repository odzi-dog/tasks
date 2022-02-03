<script lang="ts">
	// Importing modules
	import {
		Icon,
		Collection,
		ChartBar,
		ClipboardList,
		Search,
		DotsHorizontal
	} from 'svelte-hero-icons';
	import { SidebarPinnedElements } from '.';
	import { fly } from 'svelte/transition';

	// Sidebar links
	let sidebarLinks = [
		{
			icon: Collection,
			text: 'Коллекции'
		},
		{
			icon: ChartBar,
			text: 'Статистика'
		},
		{
			icon: ClipboardList,
			text: 'Автоматизация'
		}
	];

	// Fetching pinned collections/tasks

	// Exporting settings
	export let isSidebarHidden: boolean;
</script>

<!-- Layout -->
{#if !isSidebarHidden}
	<div transition:fly={{ x: -200 }} class="w-1/5 h-full flex flex-col bg-zinc-800 pt-20">
		<!-- Links -->
		<div class="flex-grow flex flex-col">
			<!-- Search -->
			<div class="px-2">
				<div class="w-full bg-zinc-700 rounded-xl p-2 flex items-center opacity-60">
					<Icon src={Search} class="h-4 w-4 text-white opacity-60" />

					<p class="ml-1.5 text-sm text-white opacity-60">Search tasks...</p>
				</div>
			</div>

			<!-- Links Category -->
			<div class="p-2">
				{#each sidebarLinks as link}
					<button
						class="w-full my-2 py-2 px-3 flex items-center justify-start text-white opacity-60 hover:opacity-100 hover:bg-zinc-600 hover:shadow-md rounded-xl"
					>
						<!-- Icon -->
						<div class="p-2 rounded-xl bg-zinc-600">
							<Icon src={link.icon} class="h-4 w-4" />
						</div>

						<!-- Text -->
						<p class="text-base ml-2">{link.text}</p>
					</button>
				{/each}
			</div>

			<!-- Divider -->
			<div class="px-2">
				<div class="w-full border-b-2 border-zinc-600 opacity-40" />
			</div>

			<!-- Pinned tasks/collections -->
			<div class="p-2 flex-grow relative">
				<SidebarPinnedElements />
			</div>
		</div>

		<!-- Account -->
		<div class="bg-zinc-700 p-3 w-full flex items-center justify-between">
			<!-- Avatar -->
			<div class="w-8 h-8 rounded-full bg-red-500" />

			<!-- Information -->
			<div class="mx-3 flex-grow">
				<h1 class="text-sm text-white">Marsh Jameson</h1>
				<p class="text-xs text-white opacity-60">soglacen@gmail.com</p>
			</div>

			<!-- Actions -->
			<button class="mx-1 p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100">
				<Icon src={DotsHorizontal} class="h-4" />
			</button>
		</div>
	</div>
{/if}
