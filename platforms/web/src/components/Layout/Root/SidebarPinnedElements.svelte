<script lang="ts">
	// Importing modules
	import { onMount } from 'svelte';
	import { Icon, DotsHorizontal, Collection } from 'svelte-hero-icons';
	import { PinnedElements } from '$lib/stores';
	import { EDocumentEvent } from '$lib/types';
	import { Circle } from 'svelte-loading-spinners';
	import { slide } from 'svelte/transition';
	import { MinifiedText } from '$components/Helpers';

	let loaded = false;

	// Function, that'll fetch pinned elements
	// from API
	async function fetchElements() {
		await PinnedElements.fetch();
		loaded = true;
	}

	// Fetching pinned elements on mount
	onMount(() => {
		// Registering document-wide event listener
		document.addEventListener(EDocumentEvent.SIDEBAR_FETCH_PINNED, fetchElements);

		// First-time fetch
		fetchElements();

		// Removing event listener onDestroy method.
		return () => {
			document.removeEventListener(EDocumentEvent.SIDEBAR_FETCH_PINNED, fetchElements);
		};
	});
</script>

{#if !loaded}
	<!-- Loading spinner -->
	<div class="w-full h-full flex items-center justify-center">
		<Circle size={15} color="#fff" />
	</div>
{:else}
	<!-- Pinned tasks -->
	{#each $PinnedElements.tasks as task}
		<div
			in:slide
			class="my-2 py-2 px-3 flex items-center justify-start text-white opacity-60 hover:bg-zinc-600 hover:opacity-100 hover:shadow-md hover:cursor-pointer rounded-xl"
		>
			<!-- Icon -->
			<p class="text-xl">{task.icon ?? '🤔'}</p>

			<!-- Information -->
			<div class="ml-2 flex-grow">
				<h1 class="text-xs text-white">
					<MinifiedText text={task.title} length={20} />
				</h1>
				<!-- <p class="text-extra-xs text-white opacity-60">30 м. из <span class="underline">1 ч. 30 м.</span></p> -->
			</div>

			<!-- Settings -->
			<button
				class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-500 hover:opacity-100 hover:shadow-md"
			>
				<Icon src={DotsHorizontal} class="w-4 h-4" />
			</button>
		</div>
	{/each}

	<!-- Pinned collections -->
	{#each $PinnedElements.collections as collection}
		<div
			in:slide
			class="my-2 py-2 px-3 flex items-center justify-start text-white opacity-60 hover:bg-zinc-600 hover:opacity-100 hover:shadow-md hover:cursor-pointer rounded-xl"
		>
			<!-- Icon -->
			<p class="text-xl">{collection.icon ?? '🤔'}</p>

			<!-- Information -->
			<div class="ml-2 pb-1 flex-grow">
				<div class="flex items-center">
					<!-- Collection icon -->
					<Icon src={Collection} solid class="w-3 h-3 text-white" />

					<!-- Collection title -->
					<h1 class="ml-0.5 text-xs text-white">
						<MinifiedText text={collection.title} length={20} />
					</h1>
				</div>

				<p class="text-extra-xs text-white opacity-60">
					{collection.tasks?.length ?? 0} заданий, 1 ч. 30 м.
				</p>
			</div>

			<!-- Settings -->
			<button
				class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-500 hover:opacity-100 hover:shadow-md"
			>
				<Icon src={DotsHorizontal} class="w-4 h-4" />
			</button>
		</div>
	{/each}
{/if}
