<script lang="ts">
	import { desktopDevices, mobileDevices } from '$lib/content/devices';
	import { UserStore } from '$lib/stores';

	function reload() {
		window.location.reload();
	}
</script>

<nav class="col">
	<div class="menu-btn col">
		<span class="row fcenter">
			<img class="yfill" src="/logo-light.svg" alt="FronPAD™" />
		</span>

		<div class="menu-wrapper scroll">
			<h1>Instructions</h1>
			<p>
				Here you can change the default settings to match your localhost. If you prefer a shorthand,
				use <strong class="nowrap">/[your-localhost-port]</strong> after the URL.
			</p>

			<p class="notice">
				Shorthand overrides the default settings and use "http://localhost:[port]".
			</p>

			<h-div style="margin: 30px 0;" />

			<div class="row jbetween xfill">
				<h2>URL defaults</h2>
				<a class="reload" href="/" target="_self" on:click={reload}>PREVIEW CHANGES</a>
			</div>

			<div class="input-wrapper col xfill">
				<label for="protocol">PROTOCOL</label>
				<input
					class="xfill"
					id="protocol"
					type="url"
					bind:value={$UserStore.protocol}
					placeholder="Ex. http"
				/>
			</div>

			<div class="input-wrapper col xfill">
				<label for="protocol">HOSTNAME</label>
				<input
					class="xfill"
					id="protocol"
					type="url"
					bind:value={$UserStore.host}
					placeholder="Ex. localhost"
				/>
			</div>

			<div class="input-wrapper col xfill">
				<label for="protocol">PORT</label>
				<input
					class="xfill"
					id="protocol"
					type="url"
					bind:value={$UserStore.port}
					placeholder="Ex. 3000"
				/>
			</div>

			<h2>Device defaults</h2>

			<div class="input-wrapper no-mobile col xfill">
				<label for="desktop">DESKTOP</label>
				<select class="xfill" id="desktop" bind:value={$UserStore.defaults.desktop}>
					{#each desktopDevices as device, i}
						<option value={i}>
							{device.name}({device.size.width}x{device.size.height})
						</option>
					{/each}
				</select>
			</div>

			<div class="input-wrapper col xfill">
				<label for="mobile">MOBILE</label>
				<select class="xfill" id="mobile" bind:value={$UserStore.defaults.mobile}>
					{#each mobileDevices as device, i}
						<option value={i}>
							{device.name}({device.size.width}x{device.size.height})
						</option>
					{/each}
				</select>
			</div>

			<h-div class="no-mobile" style="margin: 40px 0 -10px 0;" />

			<h2 class="no-mobile">Key shortcuts</h2>

			<p class="no-mobile">Press <kbd>Ctrl</kbd> + <kbd>Arrow left</kbd> to Desktop view</p>
			<p class="no-mobile">Press <kbd>Ctrl</kbd> + <kbd>Arrow Right</kbd> to Mobile view</p>
			<p class="no-mobile">Press <kbd>Ctrl</kbd> + <kbd>Arrow Up/Down</kbd> to Dual view</p>
		</div>
	</div>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		inset: 0 auto auto 0;
		z-index: 9;
	}

	.menu-btn {
		position: relative;
		width: 50px;
		padding: 10px;
		transition: opacity 200ms ease-in;

		span {
			cursor: pointer;
			height: 50px;
			padding: 15px;

			@media (max-width: 940px) {
				transform: rotate(-90deg) translate(-20%, -80%);
			}
		}

		.menu-wrapper {
			position: absolute;
			top: 0;
			left: -100%;
			width: 400px;
			max-width: 100vw;
			height: 100vh;
			background: rgba($pri, 0.9);
			backdrop-filter: blur(10px);
			color: $sec;
			padding: 30px;
			opacity: 0;
			pointer-events: none;
			transition: 200ms ease-in;
			z-index: 1;

			h1 {
				margin-bottom: 5px;
			}

			h2 {
				font-size: 18px;
				margin: 40px 0 15px 0;
				pointer-events: none;

				&:first-of-type {
					margin-top: 0;
				}
			}

			.reload {
				background: $link;
				color: $white;
				font-size: 10px;
				border-radius: 5px;
				padding: 5px 10px;
				transition: 200ms;

				&:hover {
					transform: scale(0.95);
				}
			}

			.input-wrapper {
				margin-bottom: 20px;

				label {
					font-size: 10px;
					font-weight: bold;
					color: $border;
					padding-left: 15px;
					margin-bottom: 5px;
				}

				input,
				select {
					background-color: rgba($pri, 0.6);
					color: $white;
					border: 1px solid $border;
					border-radius: 10px;
				}

				select {
					cursor: pointer;
					background-image: url('/arrow-down.svg');
					background-repeat: no-repeat;
					background-size: auto 40%;
					background-position: calc(100% - 10px) 55%;

					option {
						background: $black;
					}
				}
			}

			p {
				color: $sec;
				font-weight: lighter;
				font-size: 14px;
				margin-bottom: 20px;

				&:last-of-type {
					margin-bottom: 0;
				}

				kbd {
					background: $white;
					color: $pri;
					font-size: 12px;
					padding: 2px 5px;
					border-radius: 3px;
					box-shadow: 0 3px 0 0 $grey;
				}
			}

			@media (max-width: 940px) {
				.no-mobile {
					display: none;
				}
			}
		}

		&:hover {
			.menu-wrapper {
				left: 0;
				opacity: 1;
				pointer-events: all;
			}
		}
	}
</style>
