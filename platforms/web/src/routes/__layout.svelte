<script>
	// Importing modules
	import { SvelteToast } from '@zerodevx/svelte-toast';
  import Modal from 'svelte-simple-modal';

	// ...and styles
	import '../app.css';
</script>

<Modal unstyled classContent="w-full h-full" classWindow="w-2/3 h-2/3 relative" classWindowWrap="z-50 w-full h-screen absolute bg-black bg-opacity-60 flex items-center justify-center">
  <slot />
</Modal>

<SvelteToast />
