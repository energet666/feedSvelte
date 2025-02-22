<script lang="ts">
	import Video from "./Video.svelte";
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
</script>

<div
	class="flex flex-col max-h-[calc(100vh-10px)] bg-primary-600/10 rounded-xl overflow-hidden shadow-lg ring-1"
>
	{#if isVideo}
		<Video {src} />
	{:else if isImage}
		<img
			alt=""
			class="p-1 active:fixed active:left-0 active:top-0 active:z-10 active:bg-black active:w-screen active:h-screen"
			{src}
		/>
	{:else}
		<p class="text-center p-2">Unsupported file type {src}</p>
	{/if}

	<div
		class="flex flex-col gap-1 px-2 pt-1 pb-2 border-t-[1px] border-post_edges"
	>
		<p class="overflow-y-auto customScroll max-h-28">
			Русский текст Lorem ipsum dolor sit amet consectetur adipisicing elit.
			Dicta quasi enim quos repellat, quis, officiis temporibus reprehenderit
			facilis, at quia corporis? Voluptatem molestiae magnam autem quo alias
			voluptate unde consequatur? Lorem, ipsum dolor sit amet consectetur
			adipisicing elit. Explicabo, quasi. Error officiis accusantium natus
			soluta iste harum vel pariatur delectus placeat enim praesentium, minus ex
			quos illum maxime esse! Ad.
		</p>
		<input
			type="text"
			class="input shrink-0 outline-none px-2 py-1 ring-1 ring-post_edges"
		/>
	</div>
</div>

<style lang="postcss">
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
