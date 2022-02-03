<script lang="ts">
	// Importing modules
	import { Icon, DotsHorizontal, Play, ChevronUp, Plus, ChevronDown, Pause } from 'svelte-hero-icons';
	import { onMount } from 'svelte';
	import type { IMappedTask } from '$lib/types';
	import { MappedTasks } from '$lib/stores';
	import { Circle } from 'svelte-loading-spinners';
	import { slide } from 'svelte/transition';
  
  // Importing components
  import TaskTime from './TaskTime.svelte';
  import TaskEndedTime from './TaskEndedTime.svelte';

	// Variables
	let task: Partial<IMappedTask> = {};
	let loaded = false;
	let isSubtasksHidden = false;

	// function toggleSubtasks
	// - This function'll change value of
	// isSubtasksHidden to inversed and save it
	// in localStorage
	function toggleSubtasks() {
		isSubtasksHidden = !isSubtasksHidden;
	};

	// Fetching this task information
	onMount(() => {
		// Fetching this task
		MappedTasks.subscribe((tasks) => {
			if (tasks[taskId] != null) {
				task = tasks[taskId];
				loaded = true;
			};
		});
	});

	// Exporting sensible information
	export let taskId: string;
	export let parentId: string;
	export let isSubtask: boolean;
</script>

<!-- Layout -->
<div transition:slide class="relative">
	<!-- Loading spinner -->
	{#if !loaded}
		<div
			class="z-20 absolute w-full h-full bg-zinc-900 bg-opacity-50 rounded-xl flex items-center justify-center"
		>
			<Circle size={15} color="#fff" />
		</div>
	{/if}

	<!-- Subtask: background -->
	{#if isSubtask}
		<div class="w-1/3 absolute rounded-xl h-full bg-blue-400 bg-opacity-70 z-0" />
	{/if}

	<div class="bg-zinc-900 shadow-lg rounded-xl my-2 px-2 py-3">
		<!-- Header -->
		<div class="w-full flex items-center justify-between opacity-60">
			<!-- Title -->
			<div class="flex items-start">
				<!-- <p class="text-md">{task?.icon}</p> -->

				<h1 class="text-sm pt-1 text-white ml-2">{task?.title}</h1>
			</div>

			<!-- Controls -->
			<div class="flex items-center pr-1">
				<!-- Settings -->
				<button class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-800 hover:opacity-100">
					<Icon src={DotsHorizontal} class="w-4 h-4" />
				</button>

				<!-- Record time  -->
				<button on:click={() => {
          if (task.sessions?.running?.length > 0) {
            task.instance.endSession();
          } else {
            task.instance.startSession();
          };
        }} class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-800 hover:opacity-100">
					{ #if task.sessions?.running?.length > 0 }
            <Icon src={Pause} class="w-4 h-4" />
          { :else }
            <Icon src={Play} class="w-4 h-4" />
          { /if }
				</button>
			</div>
		</div>

		<!-- Badges -->
		{#if !isSubtask}
			<div class="flex items-center flex-wrap py-2">
				<!-- User badges -->
				<!-- <div class="mx-0.5 rounded-full px-2 py-0.5 bg-purple-500 bg-opacity-50">
					<p class="text-xs text-white opacity-60">Важное</p>
				</div> -->

        <!-- Ended sessions -->
        { #if task?.sessions?.ended?.length > 0 }
          <div class="mx-0.5 rounded-full px-2 py-0.5 bg-zinc-700 bg-opacity-50 relative">
            <p class="z-10 text-xs text-white opacity-60 flex">
              <!-- +todo something with this -->
              <TaskEndedTime sessions={task.sessions.ended} />

              <span class="ml-1">всего</span>
            </p>
          </div>
        { /if }

        <!-- Running sessions -->
        { #if task?.sessions?.running?.length > 0 }
          <div class="mx-0.5 rounded-full px-2 py-0.5 bg-indigo-500 bg-opacity-50 relative">
            <p class="z-10 text-xs text-white opacity-60">
              <!-- +todo something with this -->
              <TaskTime startDate={task.sessions.running[0].startDate} />
            </p>
          </div>
        { /if }
			</div>
		{/if}

		<!-- Subtasks -->
		{#if task.subtasks?.length > 0}
			<div class="mt-2 bg-zinc-800 rounded-lg p-2">
				<!-- Header -->
				<div class="w-full flex justify-between">
					<!-- Title -->
					<h1 class="text-base text-white opacity-60">Задания</h1>

					<!-- Buttons -->
					<div class="flex items-center">
						<!-- New subtask -->
						<button
							class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-700 hover:opacity-100"
						>
							<Icon src={Plus} class="w-3 h-3" />
						</button>

						<!-- Hide subtasks -->
						<button
							on:click={toggleSubtasks}
							class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-700 hover:opacity-100"
						>
							<Icon src={isSubtasksHidden ? ChevronDown : ChevronUp} class="w-3 h-3" />
						</button>
					</div>
				</div>

				{#if !isSubtasksHidden}
					<div class="relative">
						{#each task.subtasks as subtask}
							<svelte:self taskId={subtask} parentId={task._id} isSubtask={true} />
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
