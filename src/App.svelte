<script lang="ts">
	import { Switch } from "@skeletonlabs/skeleton-svelte";
	import Post from "./lib/Post.svelte";
	import { MoonIcon, SunIcon } from "lucide-svelte";
	import MyCanvas from "./lib/MyCanvas.svelte";

	type PostData = {
		id: number;
		title: string;
	};
	let id = 0;
	let posts: PostData[] = $state([]);
	const temesNames = ["catppuccin", "concord", "vox", "rose"];

	for (; id < 20; id++) {
		posts.push({ id: id, title: "Post " + id });
	}
</script>

<!-- <div class="container mx-auto"> -->
<div class="w-full bg-surface-300-700 flex gap-2 p-2 z-10">
	<Switch
		name="mode"
		controlActive="bg-surface-200"
		onCheckedChange={() => {
			document.documentElement.classList.toggle("dark");
		}}
	>
		{#snippet inactiveChild()}<MoonIcon size="14" />{/snippet}
		{#snippet activeChild()}<SunIcon size="14" />{/snippet}
	</Switch>
	<label
		for="idtheme"
		class="label"
	>
		<select
			id="idtheme"
			class="select"
			onchange={(el) => {
				const themeName = el.currentTarget.value;
				document.body.setAttribute("data-theme", themeName);
			}}
		>
			{#each temesNames as themeName}
				<option value={themeName}>{themeName}</option>
			{/each}
		</select>
	</label>
</div>
<div class="mx-auto max-w-md flex flex-col gap-2 p-1 customScroll">
	<MyCanvas />
	<Post
		id={1}
		src="/video.mp4"
	/>
	<Post
		id={2}
		src="/vite.svg"
	/>
	<Post
		id={3}
		src="/video2.mp4"
	/>

	<!-- {#each posts as post (post.id)}
		<button
			id="id{post.id.toString()}"
			style:height="{50 + +(Math.random() * 100).toFixed(0)}px"
			class="border-[1px] rounded-lg p-2 shrink-0 bg-primary-500/50 odd:bg-secondary-500/50"
			>{post.title}</button
		>
	{/each} -->
</div>

<!-- </div> -->

<style>
</style>
