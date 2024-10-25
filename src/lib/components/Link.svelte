<script lang="ts">
	import Link from "$lib/svgs/Link.svelte";

	let { href = "", target = "_self" } = $props();
</script>

<div class="flex items-center gap-1">
	<a {href} {target} class="underline decoration-dotted hover:decoration-solid">
		<slot />
	</a>
	<Link />
</div>
