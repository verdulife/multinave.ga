<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { devices } from '$lib/devices';

	const { port } = $page.params;

	const desktopFilter = devices.filter((device) => device.type === 'desktop');
	const tabletFilter = devices.filter((device) => device.type === 'tablet');
	const mobileFilter = devices.filter((device) => device.type === 'mobile');
	const desktopDevices = [...desktopFilter, ...tabletFilter];
	const mobileDevices = [...mobileFilter, ...tabletFilter];
	let desktopDeviceSelection = desktopDevices[0];
	let mobileDeviceSelection = mobileDevices[0];

	let viewBoth = true;
	let viewLeft = false;
	let viewRight = false;

	let desktopContainer: HTMLElement;
	let desktopFrame: HTMLIFrameElement;

	let mobileContainer: HTMLElement;
	let mobileFrame: HTMLIFrameElement;

	$: desktop = desktopDeviceSelection.size;
	$: mobile = mobileDeviceSelection.size;

	let desktopScale: number;
	let mobileScale: number;

	function scale(container: HTMLElement, { width, height }) {
		const containerRatio = container.clientWidth / container.clientHeight;
		const frameRatio = width / height;
		const ratio = containerRatio - frameRatio;
		const padding: number = height > width ? 270 : 150;

		if (height / ratio > container.clientHeight) {
			return (container.clientHeight - padding) / height;
		}

		return (container.clientWidth - padding) / width;
	}

	let update: Function = () => {};
	$: if (desktop || mobile) update();

	onMount(() => {
		update = () => {
			desktopFrame.style.cssText = `
				min-width: ${desktop.width}px;
				max-width: ${desktop.width}px;
				min-height: ${desktop.height}px;
				max-height: ${desktop.height}px;
    		transform: scale(${scale(desktopContainer, desktop)});
  		`;

			mobileFrame.style.cssText = `
				min-width: ${mobile.width}px;
				max-width: ${mobile.width}px;
				min-height: ${mobile.height}px;	
				max-height: ${mobile.height}px;
				transform: scale(${scale(mobileContainer, mobile)});
  		`;

			desktopScale = Math.floor(scale(desktopContainer, desktop) * 100) - 100;
			mobileScale = Math.floor(scale(mobileContainer, mobile) * 100) - 100;
		};

		update();

		function shortKeys(sk) {
			if (sk.ctrlKey && sk.key === 'ArrowLeft') {
				if (viewLeft) return;
				viewBoth = false;
				viewLeft = true;
				viewRight = false;
			}

			if (sk.ctrlKey && sk.key === 'ArrowRight') {
				if (viewRight) return;
				viewBoth = false;
				viewLeft = false;
				viewRight = true;
			}

			if (sk.ctrlKey && sk.key === ('ArrowUp' || 'ArrowDown')) {
				if (viewBoth) return;
				viewBoth = true;
				viewLeft = false;
				viewRight = false;
			}
		}

		window.addEventListener('keydown', shortKeys);
		window.addEventListener('keyup', update);
		window.addEventListener('resize', update);
	});
</script>

<svelte:head>
	<title>Multinavega 🚀</title>
</svelte:head>

<section class="row fill">
	{#if viewLeft || viewBoth}
		<div bind:this={desktopContainer} class="left col fcenter yfill" class:monoscreen={viewLeft}>
			<select bind:value={desktopDeviceSelection}>
				{#each desktopDevices as device}
					<option value={device}>{device.name} ({device.size.width}x{device.size.height})</option>
				{/each}
			</select>

			<iframe
				bind:this={desktopFrame}
				width={desktopDeviceSelection.size.width}
				height={desktopDeviceSelection.size.height}
				title="desktop"
				src="http://localhost:{port}"
				frameborder="0"
			/>

			<div class="scale">Scale {desktopScale}%</div>
		</div>
	{/if}

	{#if viewRight || viewBoth}
		<div bind:this={mobileContainer} class="right col fcenter yfill" class:monoscreen={viewRight}>
			<select bind:value={mobileDeviceSelection}>
				{#each mobileDevices as device}
					<option value={device}>{device.name} ({device.size.width}x{device.size.height})</option>
				{/each}
			</select>

			<iframe
				bind:this={mobileFrame}
				width={mobileDeviceSelection.size.width}
				height={mobileDeviceSelection.size.height}
				title="mobile"
				src="http://localhost:{port}"
				frameborder="0"
			/>

			<div class="scale">Scale {mobileScale}%</div>
		</div>
	{/if}
</section>

<style lang="scss">
	.left {
		position: relative;
		width: 65%;
		background: $black;
	}

	.right {
		position: relative;
		width: 35%;
		background: $black;
		box-shadow: inset 1px 0 0 0 #000;
	}

	.monoscreen {
		width: 100%;
	}

	select {
		cursor: pointer;
		position: absolute;
		inset: 0 auto auto auto;
		width: 250px;
		color: #000;
		font-weight: bold;
		text-align-last:center;
		border: 1px solid #000;
		border-top: none;
		border-radius: 0 0 10px 10px;
		padding: 10px 20px;
		z-index: 1;

		option {
			background: $black;
			color: $grey;
		}
	}

	iframe {
		--frame-with-desktop: 20px;
		--frame-with-mobile: calc(var(--frame-with-desktop) / 1.5);

		border-radius: 15px;

		&[title='desktop'] {
			box-shadow: 0 80px 80px -30px rgba(#000, 0.8), 0 0 0 var(--frame-with-desktop) #000,
				0 0 0 calc(var(--frame-with-desktop) + 5px) #111;
		}

		&[title='mobile'] {
			box-shadow: 0 60px 60px -30px rgba(#000, 0.8), 0 0 0 var(--frame-with-mobile) #000,
				0 0 0 calc(var(--frame-with-mobile) + 3px) #111;
		}
	}

	.scale {
		position: absolute;
		inset: auto auto 0 auto;
		width: 150px;
		color: #000;
		text-align: center;
		border: 1px solid #000;
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		padding: 10px 20px;
		z-index: 1;
	}
</style>
