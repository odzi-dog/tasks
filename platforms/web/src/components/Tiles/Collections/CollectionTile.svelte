<script lang="ts">
	// Importing modules
	import type { ICollectionStoreEntity } from '$lib/stores';
	import { MappedTasks } from '$lib/stores';
	import { TaskTile } from '$components/Tiles';
	import { Icon, ChevronUp, ChevronDown, Plus } from 'svelte-hero-icons';

	// Variables
	let isTasksHidden = false;

	// function toggleTasks
	// - Switches {isTasksHidden} to !isTasksHidden
	// and saves result in localStorage
	function toggleTasks() {
		isTasksHidden = !isTasksHidden;
	}

	export let collection: Partial<ICollectionStoreEntity> = {};
</script>

<!-- Layout -->
<div class="w-1/3 p-2">
	<div class="w-full bg-zinc-800 rounded-xl">
		<!-- Header -->
		<!-- bg-pink-300 bg-opacity-20 -->
		<div class="w-full bg-zinc-700 rounded-t-xl px-4 py-3 flex items-center justify-between">
			<div class="flex items-center opacity-60">
				<!-- Icon -->
				<!-- <p class="text-xl">{collection?.icon}</p> -->

				<!-- Title -->
				<div class="ml-2">
					<h1 class="text-sm text-white">{collection.title}</h1>
					<p class="text-extra-xs text-white opacity-60">{collection.subtitle}</p>
				</div>
			</div>

			<!-- Hide widget -->
			<button
				on:click={toggleTasks}
				class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100"
			>
				<Icon src={isTasksHidden ? ChevronDown : ChevronUp} class="w-4 h-4" />
			</button>
		</div>

		<!-- Tasks -->
		{#if !isTasksHidden}
			<div class="p-2">
				{#if collection.tasks.length > 0}
					{#each collection.tasks.filter((task) => String($MappedTasks[task].parent?._id) == String(collection._id)) as task}
            <TaskTile taskId={task} parentId={String(collection._id)} isSubtask={false} />
					{/each}
				{:else}
					<!-- Create new task button -->
					<div
						class="w-full py-6 px-4 text-center flex flex-col items-center justify-center opacity-60"
					>
						<Icon src={Plus} class="w-5 h-5 text-white" />

						<h1 class="text-sm text-white">Создать новое задание</h1>
						<p class="w-2/3 text-extra-xs text-white opacity-60">
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
