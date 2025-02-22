import { skeleton, contentPath } from "@skeletonlabs/skeleton/plugin";
import * as themes from "@skeletonlabs/skeleton/themes";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "selector",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,svelte}",
		contentPath(import.meta.url, "svelte"),
	],
	theme: {
		extend: {
			colors: {
				post_edges: "rgb(var(--color-surface-200) / 0.3)",
			},
		},
	},
	plugins: [
		skeleton({
			// NOTE: each theme included will increase the size of your CSS bundle
			themes: [...Object.values(themes)],
		}),
	],
};
