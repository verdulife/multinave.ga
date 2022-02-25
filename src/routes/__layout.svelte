<script lang="ts">
	import "verdu/fonts/circular.css";
	import "verdu/fonts/operator.css";
</script>

<main>
	<slot />
</main>

<style lang="scss">
	:global {
		@import "verdu/_reset.scss";
		@import "verdu/verdu.scss";
	}
</style>
