<script lang="ts">
	import { Segment } from "@skeletonlabs/skeleton-svelte";
	import { Heart, FileVideo, Maximize2, Minimize2 } from "lucide-svelte";
	type Props = {
		name: string;
		fullScreen: boolean;
		playbackRate: number;
	};
	const speeds = [1, 1.5, 2];
	let liked = $state(false);
	let {
		name,
		fullScreen = $bindable(),
		playbackRate = $bindable(),
	}: Props = $props();
	let playbackRateStr = $state("1");
	$effect(() => {
		playbackRate = +playbackRateStr;
	});
</script>

<div class="flex flex-col gap-2 w-full">
	<p
		class="p-2 select-none bg-primary-500/30 text-primary-contrast-500 rounded-container backdrop-blur-sm flex gap-2"
	>
		<FileVideo />{name}
	</p>
	<div
		id="buttons wrapper"
		class="flex gap-2 items-center"
	>
		<Segment
			background="bg-primary-500/30 text-primary-contrast-500 backdrop-blur-sm"
			indicatorBg="bg-primary-500"
			indicatorText=""
			name="speed"
			gap="gap-0"
			padding="p-[5px]"
			bind:value={playbackRateStr}
		>
			{#each speeds as s}
				<Segment.Item value={s.toString()}>x{s}</Segment.Item>
			{/each}
		</Segment>
		<button
			onclick={() => {
				fullScreen = !fullScreen;
			}}
			class="btn-icon preset-filled-primary-500 ml-auto"
		>
			{#if fullScreen}
				<Minimize2 />
			{:else}
				<Maximize2 />
			{/if}
		</button>
		<button
			onclick={() => {
				liked = !liked;
			}}
			class="btn-icon preset-filled-primary-500"
			><Heart class={liked ? "fill-secondary-500" : ""} /></button
		>
	</div>
</div>
