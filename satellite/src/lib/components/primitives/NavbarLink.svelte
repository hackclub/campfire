<script lang="ts">
	let { children, onclick } = $props();
</script>

<button class="navbar-link" {onclick}>
	<span class="link-text">
		{@render children()}
	</span>
</button>

<style>
	.navbar-link {
		position: relative;
		cursor: pointer;
		transition: transform 0.2s;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		background: none;
		border: none;
		color: inherit;
		font: inherit;
	}

	.navbar-link:hover {
		transform: scale(1.1);
	}

	.navbar-link:active {
		transform: scale(0.95);
	}

	.link-text {
		position: relative;
	}
</style>