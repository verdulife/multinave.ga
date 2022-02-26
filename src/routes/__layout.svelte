<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import Nav from '$lib/Nav.svelte';
	import { message } from '$lib/message';

	console.log(
		`%c\n\n${message}\n%cYour console.log() 👇\n`,
		'color: turquoise; font-size: 20px; font-weight: bold;',
		'font-size: 14px; font-weight: bold;'
	);
</script>

<Nav />

<main>
	<slot />
</main>

<style lang="scss">
	:global {
		@import 'verdu/_reset.scss';
		@import 'verdu/verdu.scss';
	}
</style>
