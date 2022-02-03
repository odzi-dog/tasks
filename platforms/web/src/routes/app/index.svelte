<script lang="ts">
	// Importing modules
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Redirecting user to /app/dashboard
	onMount(() => goto('/app/dashboard'));
</script>
