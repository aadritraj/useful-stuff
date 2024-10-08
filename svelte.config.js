import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// See https://kit.svelte.dev/docs/adapter-cloudflare for more information about the Cloudflare adapter.
		adapter: adapter({
			routes: {
				include: ["/*"],
				exclude: ["<all>"],
			}
		})
	}
};

export default config;
