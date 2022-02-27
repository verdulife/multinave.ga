<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { desktopDevices, mobileDevices } from '$lib/devices';
	import { UserStore } from '$lib/stores';

	const port = $page.params.port || $UserStore.port;
	const { protocol, host, defaults } = $UserStore;

	let desktopDeviceSelection = desktopDevices[defaults.desktop];
	let mobileDeviceSelection = mobileDevices[defaults.mobile];

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

	function scale(container: HTMLElement, frame: HTMLIFrameElement): number {
		const { clientWidth: containerWidth, clientHeight: containerHeight } = container;
		const { clientWidth: frameWidth, clientHeight: frameHeight } = frame;

		const containerRatio = containerWidth / containerHeight;
		const frameRatio = frameWidth / frameHeight;
		const ratio = containerRatio - frameRatio;
		const padding: number = frameWidth > frameHeight ? 150 : 270;

		if (viewRight) {
			return (containerHeight - padding) / frameHeight;
		}

		if (frameHeight / ratio > containerHeight) {
			return (containerHeight - padding) / frameHeight;
		}

		return (containerWidth - padding) / frameWidth;
	}

	function rotateDevice(device) {
		if (device === 'desktop') {
			const { width, height } = desktopDeviceSelection.size;

			desktopDeviceSelection.size = {
				width: height,
				height: width
			};
		} else {
			const { width, height } = mobileDeviceSelection.size;

			mobileDeviceSelection.size = {
				width: height,
				height: width
			};
		}
	}

	let update: Function = () => {};
	$: if (desktop || mobile) update();
	$: if (desktopDeviceSelection || mobileDeviceSelection) update();

	onMount(() => {
		update = () => {
			if (desktopFrame !== null) {
				desktopFrame.style.cssText = `
					min-width: ${desktop.width}px;
					max-width: ${desktop.width}px;
					min-height: ${desktop.height}px;
					max-height: ${desktop.height}px;
					transform: scale(${scale(desktopContainer, desktopFrame)});
				`;

				desktopScale = Math.floor(scale(desktopContainer, desktopFrame) * 100) - 100;
			}

			if (mobileFrame !== null) {
				mobileFrame.style.cssText = `
					min-width: ${mobile.width}px;
					max-width: ${mobile.width}px;
					min-height: ${mobile.height}px;	
					max-height: ${mobile.height}px;
					transform: scale(${scale(mobileContainer, mobileFrame)});
  			`;

				mobileScale = Math.floor(scale(mobileContainer, mobileFrame) * 100) - 100;
			}
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
				src="{protocol}://{host}{port ? ':' : ''}{port}"
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

			<button class="rotate" on:click={() => rotateDevice('mobile')}>
				<img src="/rotate.svg" alt="Rotate" />
			</button>

			<iframe
				bind:this={mobileFrame}
				width={mobileDeviceSelection.size.width}
				height={mobileDeviceSelection.size.height}
				title="mobile"
				src="{protocol}://{host}{port ? ':' : ''}{port}"
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
		background: #111;
	}

	.right {
		position: relative;
		width: 35%;
		background: #111;
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
		background: rgba(#000, 0.6);
		color: $border;
		font-weight: bold;
		text-align-last: center;
		border: 1px solid #000;
		border-top: none;
		border-radius: 0 0 10px 10px;
		padding: 10px 20px;
		z-index: 1;

		option {
			background: $black;
			color: $border;
		}
	}

	.rotate {
		position: absolute;
		top: 5px;
		right: calc(50% - 160px);
		width: 30px;
		height: 30px;
		padding: 2px;
		z-index: 1;

		img {
			width: 100%;
			height: 100%;
		}
	}

	iframe {
		--frame-with-desktop: 20px;
		--frame-with-mobile: calc(var(--frame-with-desktop) / 1.5);
		--shadow-color: rgba(0, 0, 0, 0.8);

		border-radius: 15px;

		&[title='desktop'] {
			box-shadow: 0 0 0 var(--frame-with-desktop) #000,
				0 0 0 calc(var(--frame-with-desktop) + 5px) #222, 0 80px 80px -30px var(--shadow-color);
		}

		&[title='mobile'] {
			box-shadow: 0 0 0 var(--frame-with-mobile) #000,
				0 0 0 calc(var(--frame-with-mobile) + 3px) #222, 0 60px 60px -30px var(--shadow-color);
		}

		&:focus {
			--shadow-color: rgba(45, 140, 240, 0.8);
		}
	}

	.scale {
		position: absolute;
		inset: auto auto 0 auto;
		width: 150px;
		background: rgba(#000, 0.6);
		color: $grey;
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		border: 1px solid #000;
		border-radius: 10px 10px 0 0;
		padding: 7px 14px;
		pointer-events: none;
		z-index: 1;
	}
</style>
