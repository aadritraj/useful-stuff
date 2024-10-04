<script lang="ts">
	import Link from "$lib/svgs/Link.svelte";

	export let href: string = "";
	export let target: string = "_self";
</script>

<div class="flex items-center gap-1">
	<a {href} {target} class="underline decoration-dotted hover:decoration-solid">
		<slot />
	</a>
	<Link />
</div>
