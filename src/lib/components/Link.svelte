<script lang="ts">
	import Link from "$lib/svgs/Link.svelte";

	let { children, href = "", target = "_self", ...props } = $props();
</script>

<div class="flex items-center gap-1">
	<a {...props} {href} {target} class="underline decoration-dotted hover:decoration-solid">
		{@render children?.()}
	</a>
	<Link />
</div>
