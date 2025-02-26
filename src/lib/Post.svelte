<script lang="ts">
	import type { Action } from "svelte/action";
	import Video from "./Video.svelte";
	import { flip } from "svelte/animate";
	import { fade, slide, blur, fly, scale } from "svelte/transition";
	// import { Confetti } from "svelte-confetti";
	let { id, src }: { id: number; src: string } = $props();
	const getExt = (str: string) => {
		let ext = str.split(".").pop();
		return ext ? ext : "";
	};
	const ext = getExt(src);
	const videoExt = ["mp4"];
	const imgExt = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
	const isVideo = videoExt.includes(ext);
	const isImage = imgExt.includes(ext);
	const scrollParentDown: Action<HTMLParagraphElement> = (node) => {
		node.parentElement!.scrollTo({
			top: node.parentElement!.scrollHeight,
			behavior: "smooth",
		});
		// node.scrollIntoView();
	};
	let msgsDiv = $state<HTMLDivElement>();
	let msgs = $state([
		"Hi!",
		"How are you?",
		"I am fine",
		"I am fine too",
		"What about you?",
		"Maybe meet later",
		"Long speech ended here :) More messages to come :) When I have time Hi",
	]);
	// let interval = setInterval(() => {
	// 	msgs.push(
	// 		"Hi! drgdrgdgdrgrdgd dgsthhryh shshwhrtrg dgrggdgrgd grshthhs sthdghr"
	// 	);
	// 	if (msgs.length >= 1000) clearInterval(interval);
	// }, 10);
</script>

<div
	class="flex flex-col max-h-[calc(100vh-10px)] bg-primary-600/10 rounded-container overflow-hidden shadow-lg ring-1 p-1"
>
	{#if isVideo}
		<Video {src} />
	{:else if isImage}
		<img
			draggable="false"
			alt=""
			class="p-1 active:fixed active:left-0 active:top-0 active:z-10 active:bg-black/80 active:w-screen active:h-screen"
			{src}
		/>
	{:else}
		<p class="text-center p-2">Unsupported file type {src}</p>
	{/if}

	<div class="flex flex-col px-1 pb-1">
		<div
			id="msgsDiv"
			bind:this={msgsDiv}
			class="overflow-y-auto customScroll max-h-28 flex flex-col gap-2 items-start py-2 px-1"
		>
			{#each msgs as msg, i (i)}
				<p
					use:scrollParentDown
					transition:scale
					class="p-2 preset-filled-primary-100-900 rounded-container shadow-lg whitespace-pre-wrap"
				>
					{msg}{i}
				</p>
			{/each}
		</div>
		<input
			type="text"
			class="input shrink-0 outline-none px-2 py-1 ring-1 ring-post_edges"
		/>
	</div>
</div>

<style lang="postcss">
	#msgsDiv {
		mask-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 1) 15%,
			rgba(0, 0, 0, 1) 85%,
			rgba(0, 0, 0, 0) 100%
		);
	}
	.customScroll::-webkit-scrollbar {
		background-color: transparent;
		width: 6px;
	}
	.customScroll::-webkit-scrollbar-track {
		background-color: transparent;
	}
	.customScroll::-webkit-scrollbar-thumb {
		@apply bg-post_edges;
		border-radius: 3px;
	}
	.customScroll::-webkit-scrollbar-button {
		display: none;
	}
	.customScroll {
		-webkit-overflow-scrolling: touch;
	}
</style>
