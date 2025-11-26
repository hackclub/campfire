<script lang="ts">
	import NavbarLink from './primitives/NavbarLink.svelte';

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<header
	class="relative h-[60px] md:h-[115px] bg-[rgba(255,255,255,0.2)] justify-end items-center content-center md:pr-16 hidden sm:flex"
>
    <div class="absolute top-0 left-0 w-1/3 md:z-40 pointer-events-none">
        <img 
          src="/backgrounds/corner-cloud.png" 
          alt=""
          class="w-full h-full object-cover select-none saturate-0 brightness-150 opacity-50"
        />
    </div>

	<nav
		class="flex gap-4 w-full justify-between px-8 md:px-0 text-2xl md:gap-12 items-center md:justify-end text-white md:text-5xl font-bold font-ember-and-fire"
	>
		<NavbarLink onclick={() => scrollToSection('steps')}>How to organize</NavbarLink>
		<!-- <NavbarLink onclick={() => scrollToSection('map')}>Map</NavbarLink> -->
		<!-- <NavbarLink onclick={() => scrollToSection('letter')}>Letter</NavbarLink> -->
		<NavbarLink onclick={() => scrollToSection('previous-events')}>Past events</NavbarLink>
		<NavbarLink onclick={() => scrollToSection('games-made')}>Games made</NavbarLink>
		<NavbarLink onclick={() => scrollToSection('faq')}>FAQ</NavbarLink>
	</nav>
</header>
