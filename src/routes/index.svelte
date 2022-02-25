<script lang="ts">
	import { message } from '$lib/utils';
	import { onMount } from 'svelte';
	console.log(message);

	let desktopContainer: HTMLElement;
	let mobileContainer: HTMLElement;
	let desktopFrame: HTMLElement;
	let mobileFrame: HTMLElement;
	const desktop_w: number = 1512;
	const desktop_h: number = 982;
	const mobile_w: number = 375;
	const mobile_h: number = 667;

	function scale(container: HTMLElement, size: number) {
		if (container.clientWidth >= size) return 1;

		const padding: number = 100;
		return (container.clientWidth - padding) / size;
	}

	onMount(() => {
		desktopFrame.style.cssText = `
    	width: ${desktop_w}px;
    	height: ${desktop_h}px;
    	transform: scale(${scale(desktopContainer, desktop_w)});
  	`;

		mobileFrame.style.cssText = `
    	width: ${mobile_w}px;
    	height: ${mobile_h}px;
    	transform: scale(${scale(mobileContainer, mobile_w)});
  	`;
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="row fill">
	<div bind:this={desktopContainer} class="left col fcenter yfill">
		<iframe
			bind:this={desktopFrame}
			title="desktop"
			src="https://www.gaplogic.com"
			frameborder="0"
		/>
	</div>
	<div bind:this={mobileContainer} class="right col fcenter yfill">
		<iframe bind:this={mobileFrame} title="mobile" src="https://www.gaplogic.com" frameborder="0" />
	</div>
</section>

<style lang="scss">
	.left {
		width: 65%;
		background: $black;
	}

	.right {
		width: 35%;
		background: $black;
	}

	iframe {
		border: 10px solid #000;
		border-radius: 20px;
		box-shadow: 0 40px 50px -40px rgba(#000, 0.8);
	}
</style>
