<script lang="ts">
	let count: number = $state(0);
	const increment = () => {
		count += 1;
	};
</script>

<button
	onclick={increment}
	class="btn preset-outlined-primary-500 flex-grow"
>
	count is {count}
</button>
