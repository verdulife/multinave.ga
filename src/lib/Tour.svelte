<script lang="ts">
	import { UserStore } from '$lib/stores';
	import { fade, fly } from 'svelte/transition';

	let first_visit = false;

	setTimeout(() => {
		first_visit = $UserStore.first_visit;
	}, 1000);

	function endTour() {
		$UserStore.first_visit = false;
		first_visit = false;
	}
</script>

{#if first_visit}
	<div class="outer" transition:fade />

	<div class="modal col acenter" transition:fly={{ y: 50 }}>
		<h1>
			Welcome to
			<img src="/logo-dark.svg" alt="FrontPAD™" />
		</h1>

		<p>
			To start have a look to the default settings, hovering the top left corner logotype. There,
			you can change the protocol, hostname and port to match your localhost (or any website with no
			restrictions).
		</p>

		<span>
			If you prefer a shorthand, use <strong>/[your-localhost-port]</strong> after the URL.
		</span>

		<button class="pri semi" on:click={endTour}>Happy coding!</button>
	</div>
{/if}

<style lang="scss">
	.outer,
	.modal {
		position: fixed;
		z-index: 999;
	}

	.outer {
		cursor: pointer;
		inset: 0;
		background: rgba(#000, 0.5);
		backdrop-filter: blur(5px);
	}

	.modal {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		text-align: center;
		border-radius: 10px;
		box-shadow: 0 80px 80px -30px rgba(#000, 0.8);
		padding: 60px 40px;

		h1 {
			font-size: 40px;
			margin-bottom: 20px;
		}

		img {
			width: 200px;
			margin-bottom: -3px;
		}

		p {
			font-size: 20px;
			margin-bottom: 20px;
		}

		span {
			background: rgba($pri, 0.1);
			border: 1px solid rgba($pri, 0.2);
			border-radius: 5px;
			padding: 12px 32px;
			margin-bottom: 40px;
		}

		button {
			min-width: 200px;
			color: $white;
		}
	}
</style>
