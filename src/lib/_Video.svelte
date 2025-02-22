<script lang="ts">
	import { Slider } from "@skeletonlabs/skeleton-svelte";
	import MyRange from "./MyRange.svelte"
	import VideoControlBar from "./VideoControlBar.svelte";
	import { Play, Pause } from "lucide-svelte";
	import { onMount } from "svelte";
	let { src }: { src: string } = $props();
	let fullScreen = $state(false);
	let playbackRate = $state(1);

	let paused = $state(true);
	let vid: HTMLVideoElement | undefined = $state()

	let sliderValue = $state([0])
	let rangeValue = $state(0)
</script>

<div
	class="overflow-hidden group {fullScreen
		? 'fixed top-0 left-0 h-full w-full z-10 bg-black/80'
		: 'relative'}"
>
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		bind:this={vid}
		bind:playbackRate
		bind:paused
		ontimeupdate={()=>{
			// range!.value = vid?.currentTime.toFixed(2)!
			// rangeValue = vid!.currentTime / vid!.duration * 100
			if(!vid) return
			sliderValue[0] = vid!.currentTime / vid!.duration * 100
		}}
		onclick={() => {
			paused = !paused;
		}}
		playsinline
		preload="auto"
		{src}
		class="h-full w-fit object-contain mx-auto z-30"
	></video>
	<div
		class="left-0 right-0 -top-32 absolute group-hover:top-0 transition-all duration-300 flex flex-col gap-2 p-2"
	>
		<VideoControlBar
			name={src}
			bind:fullScreen
			bind:playbackRate
		/>
	</div>

	<div
		class="absolute -bottom-14 left-0 right-0 p-2 flex gap-2 items-center bg-primary-500/30 backdrop-blur-md group-hover:bottom-0 transition-all duration-300"
	>
		<!-- <button
			class="btn-icon preset-filled-primary-500"
			onclick={() => (paused = !paused)}
			>{#if paused}
				<Play />
			{:else}
				<Pause />
			{/if}</button
		> -->
		<MyRange bind:value={rangeValue}/>
		<!-- <Slider
			value = {sliderValue}
			onValueChange = {(v)=>{
				if(!vid?.duration) return
				paused = true
				vid.currentTime= v.value[0] * vid.duration / 100
			}}
			onValueChangeEnd = {()=>{
				paused = false
			}}
			thumbSize="w-5 h-5"
			height="h-2"
			thumbBg="bg-primary-500"
			thumbRingColor="ring-post_edges"
			trackBg="bg-white"
			meterBg="bg-primary-500"
			materRounded="rounded-none"
			min={0}
			max={100}
			step={1}
		/> -->
		<!-- <input
			bind:value={rangeValue}
			oninput={()=>{
				vid!.currentTime= rangeValue * vid!.duration / 100
				paused = true
			}}
			onchange={()=>{
				paused = false
			}}
			step=0.1
			max=100
			type="range"
			class="w-full transition-all"
		/> -->
	</div>
</div>

<!-- <style lang="postcss">
	input[type="range"]::-webkit-slider-thumb {
			cursor: pointer;
			fill: aqua;
			color: aqua;
			background-color: aqua;
			stroke: aquamarine;
	} -->

<!-- </style> -->
