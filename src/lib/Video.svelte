<script lang="ts">
	import VideoControlBar from "./VideoControlBar.svelte";
	import MyRange from "./MyRange.svelte";
	let { src }: { src: string } = $props();
	let fullScreen = $state(false);
	let playbackRate = $state(1);
	let currentTime = $state(0);
	let paused = $state(true);
	let duration = $state(1);
	$effect(() => {
		if (fullScreen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="overflow-hidden group flex flex-col justify-center items-center {fullScreen
		? 'fixed top-0 left-0 h-full w-full z-10 bg-black/80'
		: 'relative'}"
	onkeydown={(e) => {
		e.preventDefault();
		console.log("key: ", e.key);
		switch (e.key) {
			case " ":
				paused = !paused;
				break;
			case "ArrowRight":
				currentTime += 1;
				break;
			case "ArrowLeft":
				currentTime -= 1;
				break;
		}
	}}
>
	<!-- svelte-ignore a11y_media_has_caption -->
	<video
		bind:playbackRate
		bind:currentTime
		bind:paused
		bind:duration
		{src}
		tabindex="0"
		playsinline
		class="min-h-0 [border-radius:calc(var(--radius-container)-0.25rem)]"
		onclick={(e) => {
			paused = !paused;
			const el = e.target as HTMLVideoElement;
			el.focus();
		}}
	></video>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="left-0 right-0 -top-32 absolute group-hover:top-0 transition-all duration-300 flex flex-col gap-2 p-2 outline-none"
		tabindex="0"
	>
		<VideoControlBar
			name={src}
			bind:fullScreen
			bind:playbackRate
		/>
	</div>

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="absolute -bottom-16 left-0 right-0 p-2 flex gap-2 items-center {fullScreen
			? 'group-hover:bottom-10 px-5'
			: 'group-hover:bottom-0'} group-hover:bottom-0 transition-all duration-300 outline-none"
		tabindex="0"
	>
		<MyRange
			bind:value={currentTime}
			max={+duration.toFixed(0)}
			step={1}
		/>
	</div>
</div>
