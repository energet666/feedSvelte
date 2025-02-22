<script lang="ts">
	type Props = {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
	};
	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 0.1,
	}: Props = $props();
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
		ontouchmove={(e) => {
			const el = e.target as HTMLInputElement;
			e.preventDefault();
		}}
	/>
	<p
		class="absolute left-2 top-0 pointer-events-none font-mono h-full flex items-center text-primary-contrast-500"
	>
		{hTime(value)}
	</p>
	<p
		class="absolute right-2 top-0 pointer-events-none font-mono h-full flex items-center text-primary-contrast-500"
	>
		{hTime(max)}
	</p>
</div>

<style lang="postcss">
	p {
		/* @apply drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]; */
		/* text-shadow: 1px 1px 1px rgba(0, 0, 0, 1); */
	}
	input[type="range"]::-webkit-slider-thumb {
		@apply appearance-none w-8 h-8 translate-y-1 bg-primary-500 cursor-pointer rounded-md;
	}
	/* input[type="range"]:focus::-webkit-slider-thumb {
		@apply bg-primary-500;
	} */
	/* input[type="range"]::-webkit-slider-runnable-track {
		@apply w-full h-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full dark:from-primary-600 dark:to-secondary-600;
	} */
	input[type="range"]::-webkit-slider-runnable-track {
		@apply appearance-none w-full h-full bg-gradient-to-r from-primary-300/40 to-primary-800/40 backdrop-blur-sm rounded-md px-1;
	}
	input[type="range"] {
		@apply bg-transparent h-10 appearance-none  focus:outline-none;
	}
</style>
