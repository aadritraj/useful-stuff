<script lang="ts">
	let { children, ...props } = $props();
</script>

<button
	{...props}
	class="rounded border-2 border-slate-200/50 bg-white px-2 py-1 font-sans text-slate-950 hover:bg-slate-100"
>
	{@render children?.()}
</button>
