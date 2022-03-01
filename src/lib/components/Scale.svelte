<script lang="ts">
	import { desktopDevices, mobileDevices } from '$lib/content/devices';
	import { deviceSelection } from '$lib/stores';
	import { popScreen } from '$lib/scripts/popscreen';

	export let scaleValue: number;
	export let url: { device: string; protocol: string; host: string; port: string };

	const { device, protocol, host, port } = url;
	let deviceList = device === 'desktop' ? desktopDevices : mobileDevices;
	let selection = deviceList[$deviceSelection[device]];
</script>

<div class="scale row jbetween acenter">
	<p class="grow nowrap">Scale {scaleValue}%</p>

	<button
		class="col fcenter"
		title="Window view with no scaling"
		on:click={() => popScreen(window, selection, { protocol, host, port })}
	>
		<img src="/expand.svg" alt="Expand" />
	</button>
</div>

<style lang="scss">
	.scale {
		position: absolute;
		inset: auto auto 0 auto;
		width: 150px;
		height: 40px;
		background: rgba($pri, 0.6);
		border: 1px solid $border;
		border-bottom: none;
		border-radius: 10px 10px 0 0;
		z-index: 1;

		p {
			color: $grey;
			font-weight: bold;
			font-size: 14px;
			padding: 0 14px;
			pointer-events: none;
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

		@media (max-width: 940px) {
			p {
				text-align: center;
			}

			button {
				display: none;
			}
		}
	}
</style>
