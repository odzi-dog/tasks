<script lang="ts">
	// Exporting variables
	export let text: string;
	export let length: number = 10;
</script>

<!-- Component itself -->
{text.slice(0, length)}{text.length > length ? '...' : ''}
