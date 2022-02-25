<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const { port } = $page.params;
	let desktopContainer: HTMLElement;
	let mobileContainer: HTMLElement;
	let desktopFrame: HTMLIFrameElement;
	let mobileFrame: HTMLIFrameElement;
	const desktop_w: number = 1512;
	const desktop_h: number = 982;
	const mobile_w: number = 375;
	const mobile_h: number = 667;

	function scale(container: HTMLElement, size: number) {
		if (container.clientWidth >= size) return 1;

		const padding: number = 40;
		return (container.clientWidth - padding) / size;
	}

	onMount(() => {
		function update() {
			desktopFrame.style.cssText = `
    	width: ${desktop_w}px;
    	min-width: ${desktop_w}px;
    	max-width: ${desktop_w}px;
    	height: ${desktop_h}px;
    	min-height: ${desktop_h}px;
    	max-height: ${desktop_h}px;
    	transform: scale(${scale(desktopContainer, desktop_w)});
  	`;

			mobileFrame.style.cssText = `
    	width: ${mobile_w}px;
    	min-width: ${mobile_w}px;
    	max-width: ${mobile_w}px;
    	height: ${mobile_h}px;
    	min-height: ${mobile_h}px;	
    	max-height: ${mobile_h}px;
    	transform: scale(${scale(mobileContainer, mobile_w)});
  	`;
		}

		window.addEventListener('resize', update);
		update();
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
			src="http://localhost:{port}"
			frameborder="0"
		/>
	</div>
	<div bind:this={mobileContainer} class="right col fcenter yfill">
		<iframe bind:this={mobileFrame} title="mobile" src="http://localhost:{port}" frameborder="0" />
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
		box-shadow: inset 1px 0 0 0 #000;
	}

	iframe {
		width: calc(100% - 40px);
		height: calc((100% - 40px) / 1.5397);
		border: 10px solid #000;
		border-radius: 20px;
		box-shadow: 0 40px 50px -40px rgba(#000, 0.8);
	}
</style>
