<script lang="ts">
	// Importing modules
	import {
		Icon,
		Beaker,
		ColorSwatch,
		ChevronDown
	} from 'svelte-hero-icons';
	import { MappedTasks, UpdatesConnection, UserCollections } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import { CollectionTile, TaskTile } from '$components/Tiles';
  
  import { EClientUpdateType, IUpdatePayload } from '$shared/types';
  import type { ITaskObject } from '$shared/types';

	let loaded = false;

  // handleUpdateEvent function
  async function handleUpdateEvent(payload: IUpdatePayload) {
    // All-tasks
    if (payload.type == EClientUpdateType.ALL_TASKS) {
      await UserCollections.fetch();
    };

    // One task
    if (payload.type == EClientUpdateType.TASK) {
      // Fetching this task from mapped tasks
      const task = payload.payload as ITaskObject;
      const mappedTask = $MappedTasks[String(task._id)];

      if (mappedTask) {
        MappedTasks.update(task, mappedTask.collectionId);
      } else {
        // Refetching all tasks
        await UserCollections.fetch();
      };
    };
  };

  // onMount event
	onMount(async () => {
		await UserCollections.fetch();
		loaded = true;

    // Subscribing to collection/tasks updates
    $UpdatesConnection.instance.on('update', handleUpdateEvent);

    return () => {
      $UpdatesConnection.instance.removeListener('update', handleUpdateEvent);
    };
	});
</script>

<!-- Hero -->
<section class="w-full flex">
	<!-- Current & Upcoming tasks -->
	<div class="w-1/2 px-2">
		<div class="w-full py-2 bg-zinc-800 rounded-xl">
			<!-- Header -->
			<div class="w-full px-4 py-2 flex items-center justify-between">
				<div class="flex items-center opacity-60">
					<!-- Icon -->
					<Icon src={ColorSwatch} class="text-white w-5 h-5" />

					<!-- Title -->
					<div class="ml-2">
						<h1 class="text-sm text-white">Задания</h1>
						<p class="text-extra-xs text-white opacity-60">Текущие и будущие задания</p>
					</div>
				</div>

				<!-- Hide widget -->
				<button class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100">
					<Icon src={ChevronDown} class="w-4 h-4" />
				</button>
			</div>

			<!-- Tasks -->
		</div>
	</div>

	<!-- Toolbox -->
	<div class="w-1/2 px-2">
		<div class="w-full py-2 bg-zinc-800 rounded-xl">
			<!-- Header -->
			<div class="w-full px-4 py-2 flex items-center justify-between">
				<div class="flex items-center opacity-60">
					<!-- Icon -->
					<Icon src={Beaker} class="text-white w-5 h-5" />

					<!-- Title -->
					<div class="ml-2">
						<h1 class="text-sm text-white">Другие сервисы</h1>
						<p class="text-extra-xs text-white opacity-60">Дополнительные сервисы для всех</p>
					</div>
				</div>

				<!-- Hide widget -->
				<button class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100">
					<Icon src={ChevronDown} class="w-4 h-4" />
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Collections -->
<section class="w-full flex items-stretch flex-wrap mt-4">
	{#if !loaded}
		<div class="w-full h-screen flex items-center justify-center">
			<Circle size={15} color="#fff" />
		</div>
	{:else}
		{#each $UserCollections.list as collection}
			<CollectionTile {collection} />
		{/each}
	{/if}
</section>
