<script lang="ts">
	import { Play } from "lucide-svelte";
	type Props = {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
	};
	let { value = $bindable<number>(0), min = 0, max = 100, step = 0.1 }: Props = $props();
	const hTime = (timeSeconds: number) => {
		const hours = Math.floor(timeSeconds / 3600);
		const minutes = Math.floor((timeSeconds % 3600) / 60);
		const seconds = Math.floor(timeSeconds % 60);
		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};
</script>

<div class="flex items-center gap-2 w-full relative">
	<input
		type="range"
		class="w-full"
		{min}
		{max}
		{step}
		bind:value
		onclick={(e) => {
			const el = e.target as HTMLInputElement;
			el.focus();
		}}
	/>
	<p
		class="absolute left-0 top-0 pointer-events-none font-mono text-[12px] h-full flex items-center pl-7"
	>
		{hTime(value)}
	</p>
	<p
		class="absolute right-0 top-0 pointer-events-none font-mono text-[12px] h-full flex items-center pr-7"
	>
		{hTime(max)}
	</p>
</div>

<style lang="postcss">
	input[type="range"]::-webkit-slider-thumb {
		@apply appearance-none w-6 h-6 -translate-y-1 bg-primary-300-700 rounded-full cursor-pointer;
	}
	input[type="range"]:focus::-webkit-slider-thumb {
		@apply bg-primary-400-600 z-50;
	}
	/* input[type="range"]::-webkit-slider-runnable-track {
		@apply w-full h-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full dark:from-primary-600 dark:to-secondary-600;
	} */
	input[type="range"]::-webkit-slider-runnable-track {
		@apply appearance-none w-full h-4 bg-primary-500/30 backdrop-blur-md rounded-full;
	}
	input[type="range"] {
		@apply bg-transparent h-8 appearance-none focus:outline-none;
	}
</style>
