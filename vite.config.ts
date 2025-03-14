import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { purgeCss } from "vite-plugin-tailwind-purgecss";

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte(), , purgeCss()],
});
