<script lang="ts">
	import Counter from "./Counter.svelte";
	import { Switch, AppBar, Avatar, TagsInput } from "@skeletonlabs/skeleton-svelte";
	let ch = $state<boolean>(true);
	let selected = $state()
</script>
{#snippet headline()}
	Какой-то текст вверху страницы
{/snippet}
{#snippet lead()}
	<p class="h1">data</p>
{/snippet}
{#snippet trail()}
	<Avatar name="Стас" src="/vite.svg"/>
{/snippet}
<AppBar {headline} {lead} {trail} toolbarClasses="flex w-full items-center"  background="">
	<p class="h2">Мой веб-интерфейс</p>
</AppBar>
<main class="container flex flex-col gap-2 mx-auto p-2 max-w-2xl">
	<h1 class="text-3xl">Vite + Svelte</h1>
	<div class="flex flex-row gap-2">
		<Counter />
		<Counter />
		<input
			type="text"
			placeholder="Type here"
			class="input preset-outlined-primary-500 pl-2"
		/>
		<div class="flex items-center justify-center">{ch}</div>
		<Switch
			name="example"
			bind:checked={ch}
		/>
	</div>
	<div
		class="card preset-filled-primary-100-900 border-[1px] border-surface-200-800 divide-surface-200-800 block max-w-md divide-y overflow-hidden mx-auto w-9/12"
	>
		<header>
			<img
				class="w-11/12 mx-auto"
				src="/vite.svg"
				alt=""
			/>
		</header>
		<article class="space-y-4 p-4">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor error
			iusto adipisci amet optio itaque qui ipsa eligendi aliquam aliquid nemo
		</article>
		<footer class="flex items-stretch justify-between gap-4 p-4">
			<input
				disabled={!ch}
				type="text"
				class="input preset-filled-primary-50-950 pl-2"
			/>
			<button disabled={!ch} class="preset-tonal-primary btn-icon" class:animate-spin={ch}
			class:border-2={ch}
			class:hidden={!ch}
			>📧</button>
		</footer>
	</div>
	<div class="flex gap-2">
		<select class="select w-fit px-2" bind:value={selected}>
			<option value="a">a</option>
			<option value="b">b</option>
			<option value="c">c</option>
		</select>
		<p class="w-fit preset-filled-primary-50-950 rounded-md px-2">{selected}</p>
	</div>
</main>

<style>
</style>
