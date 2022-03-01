<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { UserStore, deviceSelection } from '$lib/stores';
	import { scale } from '$lib/scripts/scale';
	import { desktopDevices, mobileDevices } from '$lib/content/devices';

	import Selector from '$lib/components/Selector.svelte';
	import Scale from '$lib/components/Scale.svelte';

	const portByURL = $page.params.port;
	const port = portByURL || $UserStore.port;
	let { protocol, host } = $UserStore;
	$: desktopSelection = desktopDevices[$deviceSelection.desktop];
	$: mobileSelection = mobileDevices[$deviceSelection.mobile];

	protocol = portByURL ? 'http' : protocol;
	host = portByURL ? 'localhost' : host;

	let viewBoth: boolean = false;
	let viewLeft: boolean = false;
	let viewRight: boolean = false;

	$: if (browser) viewBoth = true;

	let desktopContainer: HTMLElement;
	let desktopFrame: HTMLIFrameElement;

	let mobileContainer: HTMLElement;
	let mobileFrame: HTMLIFrameElement;

	let desktopScale: number;
	let mobileScale: number;

	let update: Function = () => {};

	$: if ($deviceSelection) update();
	$: if ($deviceSelection.desktop || $deviceSelection.mobile) update();

	onMount(() => {
		const isMobile = window.innerWidth <= 940;

		if (isMobile) {
			viewBoth = false;
			viewLeft = false;
			viewRight = true;
		}

		update = () => {
			const computedStyles = (device: string, container: HTMLElement, frame: HTMLIFrameElement) => `
					min-width: ${(device === 'desktop' ? desktopSelection : mobileSelection).size.width}px;
					max-width: ${(device === 'desktop' ? desktopSelection : mobileSelection).size.width}px;
					min-height: ${(device === 'desktop' ? desktopSelection : mobileSelection).size.height}px;
					max-height: ${(device === 'desktop' ? desktopSelection : mobileSelection).size.height}px;
					transform: scale(${scale(viewRight, container, frame)});
			`;

			if (desktopFrame !== null) {
				desktopFrame.style.cssText = computedStyles('desktop', desktopContainer, desktopFrame);
				desktopScale = Math.floor(scale(viewRight, desktopContainer, desktopFrame) * 100) - 100;
			}

			if (mobileFrame !== null) {
				mobileFrame.style.cssText = computedStyles('mobile', mobileContainer, mobileFrame);
				mobileScale = Math.floor(scale(viewRight, mobileContainer, mobileFrame) * 100) - 100;
			}
		};

		update();

		function shortKeys(e: KeyboardEvent) {
			if (e.ctrlKey && e.key === 'ArrowLeft') {
				if (viewLeft) return;
				viewBoth = false;
				viewLeft = true;
				viewRight = false;
			}

			if (e.ctrlKey && e.key === 'ArrowRight') {
				if (viewRight) return;
				viewBoth = false;
				viewLeft = false;
				viewRight = true;
			}

			if (e.ctrlKey && e.key === ('ArrowUp' || 'ArrowDown')) {
				if (viewBoth) return;
				viewBoth = true;
				viewLeft = false;
				viewRight = false;
			}
		}

		window.addEventListener('keydown', shortKeys);
		window.addEventListener('keyup', () => update());
		window.addEventListener('resize', () => update());
	});
</script>

<section class="row fill">
	{#if viewLeft || viewBoth}
		<div bind:this={desktopContainer} class="left col fcenter yfill" class:monoscreen={viewLeft}>
			<Selector from="desktop" />

			<iframe
				bind:this={desktopFrame}
				width={desktopSelection.size.width}
				height={desktopSelection.size.height}
				title="desktop"
				src="{protocol}://{host}{port ? ':' : ''}{port}"
				frameborder="0"
			/>

			<Scale scaleValue={desktopScale} url={{ device: 'desktop', protocol, host, port }} />
		</div>
	{/if}

	{#if viewRight || viewBoth}
		<div bind:this={mobileContainer} class="right col fcenter yfill" class:monoscreen={viewRight}>
			<Selector from="mobile" />

			<iframe
				bind:this={mobileFrame}
				width={mobileSelection.size.width}
				height={mobileSelection.size.height}
				title="mobile"
				src="{protocol}://{host}{port ? ':' : ''}{port}"
				frameborder="0"
			/>

			<Scale scaleValue={mobileScale} url={{ device: 'mobile', protocol, host, port }} />
		</div>
	{/if}

	{#if !viewBoth || !viewLeft || !viewRight}
		<div class="row fcenter fill">
			<img style="opacity: .3;" src="/loading.svg" alt="Loading" />
		</div>
	{/if}
</section>

<style lang="scss">
	.left {
		position: relative;
		width: 65%;
	}

	.right {
		position: relative;
		width: 35%;
		box-shadow: inset 1px 0 0 0 $pri;
	}

	.monoscreen {
		width: 100%;
	}

	iframe {
		--frame-with-desktop: 20px;
		--frame-with-mobile: calc(var(--frame-with-desktop) / 1.5);
		--shadow-color: rgba(0, 0, 0, 0.8);

		border-radius: 15px;

		&[title='desktop'] {
			box-shadow: 0 0 0 var(--frame-with-desktop) $pri,
				0 0 0 calc(var(--frame-with-desktop) + 5px) $black, 0 80px 80px -30px var(--shadow-color);
		}

		&[title='mobile'] {
			box-shadow: 0 0 0 var(--frame-with-mobile) $pri,
				0 0 0 calc(var(--frame-with-mobile) + 3px) $black, 0 60px 60px -30px var(--shadow-color);
		}

		&:focus {
			--shadow-color: rgba(45, 140, 240, 0.8);
		}
	}
</style>
