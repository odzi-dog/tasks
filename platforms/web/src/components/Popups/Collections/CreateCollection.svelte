<script lang="ts">
  // Importing modules
  import { Collection, Icon, Plus, X } from "svelte-hero-icons";
  import { getContext } from "svelte";
  import Circle from "svelte-loading-spinners/dist/ts/Circle.svelte";
  import { client } from '$lib/modules/GraphQLClient/services';

  // Importing queries
  import { CreateCollectionMutation } from '$lib/modules/Collections/queries';
  import type { ICreateCollectionMutationResult } from '$lib/modules/Collections/queries';
  import { ErrorHandler } from "$lib/modules/Errors/stores";
  import { ErrorType } from "$lib/types";
  import { UserCollections } from "$lib/stores";

  // Variables
  const { close } = getContext('simple-modal');

  let loading = false;
  let title: string;
  let subtitle: string;

  // function, that'll create our collection
  function create() {
    loading = true;

    client.request<ICreateCollectionMutationResult>(CreateCollectionMutation, {
      input: {
        title,
        subtitle
      }
    })
    .then(async () => {
      // Updating user collections
      await UserCollections.fetch();

      // Closing
      close();
    })
    .catch((error) => {
      loading = false;

      ErrorHandler.throw({
        type: ErrorType.SERVER_ERROR,
        message: 'Could not create new collection',
      });
      console.error(error);
    });
  };
</script>

<!-- Popup content -->
<div class="w-full h-full flex flex-col rounded-bg bg-zinc-800 rounded-xl">
  <!-- Loading screen -->
  { #if loading }
    <div class="z-20 absolute inset-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
      <Circle color="#fff" size={15} />
    </div>
  { /if }

  <!-- Header -->
  <div class="w-full flex items-center justify-between rounded-t-xl bg-zinc-700 py-2 px-4">
    <!-- Title -->
    <div>
      <h1 class="opacity-70 text-md text-white">Создать коллекцию</h1>
    </div>

    <!-- Controls -->
    <button on:click={() => {
      close();
    }} class="p-2 rounded-xl text-white opacity-60 hover:bg-zinc-600 hover:opacity-100">
      <Icon src={X} class="w-4 h-4" />
    </button>
  </div>

  <!-- Content itself -->
  <div class="flex-grow flex flex-col items-center justify-center">
    <!-- Explanation -->
    <div class="text-center w-2/3">
      <h1 class="text-xl text-white">Lorem ipsum dolor sit amet.</h1>
      <p class="text-sm text-white opacity-60">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae quia earum deserunt velit quisquam aperiam? Alias consectetur ipsum iusto optio!</p>
    </div>

    <!-- Collection Title/Subtitle -->
    <div class="mt-6">
      <!-- Title -->
      <div>
        <div class="flex items-center rounded-xl bg-zinc-900 shadow-md py-2 px-4">
          <!-- Icon -->
          <Icon src={Collection} class="w-4 h-4 text-white opacity-60 " />

          <!-- Input -->
          <input type="text" bind:value={title} placeholder="Моя коллекция" class="w-full ml-2 rounded-r-xl bg-zinc-900 text-white">
        </div>

        <p class="text-extra-xs text-white opacity-60 mt-1">Название коллекции</p>
      </div>

      <!-- Subtitle -->
    </div>
  </div>

  <!-- Create button -->
  <div class="w-full flex justify-end py-2 px-4">
    <button on:click={() => {
      create();
    }} class="rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 text-white flex px-6 py-2 items-center justify-center">
      <Icon src={Plus} class="w-4 h-4" />

      <p class="text-base ml-2">Создать</p>
    </button>
  </div>
</div>