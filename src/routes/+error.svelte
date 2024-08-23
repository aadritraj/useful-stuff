<script lang="ts">
    import { page } from "$app/stores";
</script>

<div>
    <div class="flex h-screen justify-center items-center gap-4">
        <div class="text-4xl font-medium">{$page.status}</div>

        <div class="float-left h-12 w-px bg-black"></div>

        <div>
            <div class="font-semibold">{$page.error?.message}</div>
            <a href="/" class="no-underline hover:underline">Go Home</a>
        </div>
    </div>
</div>
