<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import { message } from '$lib/message';
	import Nav from '$lib/Nav.svelte';
	import Tour from '$lib/Tour.svelte';

	console.log(
		`%c\n\n${message}\n%cYour console.log() 👇\n`,
		'color: turquoise; font-size: 20px; font-weight: bold;',
		'font-size: 14px; font-weight: bold;'
	);
</script>

<svelte:head>
	<title>FrontPAD™ | Frontend Development</title>
</svelte:head>

<Nav />

<main>
	<slot />
</main>

<Tour />

<style lang="scss">
	:global {
		@import 'verdu/_reset.scss';
		@import 'verdu/verdu.scss';

		body {
			background: #000 !important;
		}

		main {
			background: #111;
		}
	}
</style>
