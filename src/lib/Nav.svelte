<script lang="ts">
	import { desktopDevices, mobileDevices } from '$lib/devices';
	import { UserStore } from '$lib/stores';
</script>

<nav class="col">
	<div class="menu-btn col">
		<a href="/" target="_self">
			<span class="row fcenter">🍔</span>
		</a>

		<div class="menu-wrapper">
			<h2>URL defaults</h2>

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
				<label for="protocol">HOST</label>
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

			<div class="input-wrapper col xfill">
				<label for="desktop">DESKTOP</label>
				<select class="xfill" id="desktop" bind:value={$UserStore.defaults.desktop}>
					{#each desktopDevices as device, i}
						<option value={i}>{device.name}({device.size.width}x{device.size.height})</option>
					{/each}
				</select>
			</div>

			<div class="input-wrapper col xfill">
				<label for="mobile">MOBILE</label>
				<select class="xfill" id="mobile" bind:value={$UserStore.defaults.mobile}>
					{#each mobileDevices as device, i}
						<option value={i}>{device.name}({device.size.width}x{device.size.height})</option>
					{/each}
				</select>
			</div>

			<h2>Key shortcuts</h2>

			<p>Press <kbd>Ctrl</kbd> + <kbd>Arrow left</kbd> to Desktop view</p>
			<p>Press <kbd>Ctrl</kbd> + <kbd>Arrow Right</kbd> to Mobile view</p>
			<p>Press <kbd>Ctrl</kbd> + <kbd>Arrow Up/Down</kbd> to Dual view</p>
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
		padding: 20px;
		transition: 300ms ease-in;

		&:hover {
			width: 400px;
			background: rgba(#000, 0.9);

			.menu-wrapper {
				opacity: 1;
				pointer-events: all;
			}
		}

		span {
			cursor: pointer;
			width: 50px;
			height: 50px;
			background: #fff;
			font-size: 20px;
			border-radius: 10px;
		}
	}

	.menu-wrapper {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: calc(100vh - 70px);
		background: rgba(#000, 0.9);
		opacity: 0;
		padding: 0 30px;
		pointer-events: none;
		transition: 300ms ease-in;
		z-index: 1;

		h2 {
			color: $grey;
			font-size: 20px;
			margin: 40px 0 20px 0;

			&:first-of-type {
				margin-top: 20px;
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
				color: $white;
				border: 1px solid #222;
				border-radius: 10px;
			}

			select {
				cursor: pointer;

				option {
					background: $black;
				}
			}
		}

		p {
			color: $border;
			font-weight: lighter;
			font-size: 14px;
			margin-bottom: 20px;

			kbd {
				background: $white;
				color: $grey;
				padding: 2px 5px;
				border-radius: 3px;
				box-shadow: 0 2px 0 1px $grey;
			}
		}
	}
</style>
