<script lang="ts">
	import { desktopDevices, mobileDevices } from '$lib/content/devices';
	import { deviceSelection } from '$lib/stores';

	export let from: string;

	let deviceList = from === 'desktop' ? desktopDevices : mobileDevices;

	function rotateDevice() {
		alert('Coming soon!');
		/* console.log(readMobileSelection);

		const { width, height } = readMobileSelection.size;

		readMobileSelection.size = {
			width: height,
			height: width
		}; */
	}
</script>

<div class="sizes row jbetween acenter">
	<select class="grow" bind:value={$deviceSelection[from]}>
		{#each deviceList as device, i}
			<option value={i}>{device.name} ({device.size.width}x{device.size.height})</option>
		{/each}
	</select>

	{#if from === 'mobile'}
		<button class="col fcenter" on:click={rotateDevice}>
			<img src="/rotate.svg" alt="Rotate" />
		</button>
	{/if}
</div>

<style lang="scss">
	.sizes {
		position: absolute;
		inset: 0 auto auto auto;
		height: 40px;
		background: rgba($pri, 0.6);
		border: 1px solid $border;
		border-top: none;
		border-radius: 0 0 10px 10px;
		z-index: 1;

		select {
			cursor: pointer;
			background: url('/arrow-down.svg') no-repeat;
			background-size: auto 15px;
			background-position: calc(100% - 13px) center;
			color: $sec;
			font-weight: bold;
			padding: 10px 40px 10px 20px;

			option {
				background: $black;
				color: $sec;
			}
		}

		button {
			cursor: pointer;
			width: 40px;
			height: 100%;
			box-shadow: -1px 0 0 $border;
			padding: 0;

			&:hover {
				transform: none;

				img {
					transform: scale(0.95);
				}
			}

			img {
				width: 15px;
				transition: 200ms;
			}
		}
	}
</style>
