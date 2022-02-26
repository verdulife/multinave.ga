<script lang="ts">
  function soon() {
    alert("⚠️ Coming Soon ⚠️\n\nHere you can change the default behaviors and much more.\n\nTIP: Try using CTRL + ARROW's...");
  }
</script>

<nav class="row fcenter" on:click="{soon}">🚀</nav>

<style lang="scss">
	nav {
		cursor: pointer;
		position: fixed;
		inset: 10px auto auto 10px;
		width: 50px;
		height: 50px;
		background: #000;
		font-size: 20px;
		border-radius: 10px;
		z-index: 9;
		transition: 200ms;

		&:hover {
			opacity: 0.6;
		}
	}
</style>
