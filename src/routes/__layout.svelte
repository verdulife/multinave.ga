<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';
	import { message } from '$lib/content/message';
	import Nav from '$lib/components/Nav.svelte';
	import Tour from '$lib/components/Tour.svelte';
	import { inject } from '@vercel/analytics';

	inject();

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
			background: $pri;
		}

		main {
			background: #151515;
		}
	}
</style>
