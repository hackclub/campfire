<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import '../app.css';
	import structure from '$lib/structure.json';
    import { onMount } from 'svelte';

	const { color, filter } = structure as { color: string; filter: string };

	onMount(() => {
		document.documentElement.style.setProperty('--primary', color);
		document.documentElement.style.setProperty('--filter', filter);
	});

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style global>
	@font-face {
		font-family: 'Ember & Fire';
		src: url('/fonts/Ember & Fire.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'DREAMPLANNER';
		src: url('/fonts/DREAMPLANNER.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	:global(html, body) {
		background-color: var(--primary);
	}
</style>