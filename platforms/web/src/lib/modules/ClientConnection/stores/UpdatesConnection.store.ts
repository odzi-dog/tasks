// Importing modules
import type { Socket } from 'socket.io-client';
import { writable } from 'svelte/store';
import { fetchStore } from '$lib/helpers';
import { io } from 'socket.io-client';
import type { IInitializeRequest } from '$shared/types';

import { CurrentUser } from '$lib/modules/User/stores';
import type { ICurrentUserStore } from '$lib/modules/User/stores';

export interface IUpdatesConnectionStore {
  instance?: Socket,
  connected: boolean,
};

// Function, that'll initialize our store
function _initialize() {
  const defaultStore: IUpdatesConnectionStore = {
    connected: false,
  };
  const { subscribe, update } = writable(defaultStore);

  // returning subscribe and other methods
  return {
    subscribe,

    // method initialize
    async initialize() {
      const store = await fetchStore(subscribe) as IUpdatesConnectionStore;

      if (store.instance == null || !store.connected) {
        // Creating new socket io instance
        // +todo production url
        const socket = io('https://api.tasks.odzi.dog');

        // on connect listener
        socket.on('connect', async () => {
          const profile = await fetchStore(CurrentUser.subscribe) as ICurrentUserStore;

          // Sending initialize request
          socket.emit('initialize', <IInitializeRequest>{
            uid: String(profile.user?._id)
          });

          update((object) => {
            object.connected = true;
            
            return object;
          });
        });

        // on disconnect listener
        socket.on('disconnect', () => {
          // Updating store
          update((object) => {
            object.connected = false;

            return object;
          });
        });

        // Updating our Store
        update((object) => {
          object.instance = socket;

          return object;
        });
      };
    },
  };
};

// Store itself
export const UpdatesConnection = _initialize();