<script lang="ts">
    import { goto } from "$app/navigation";

	const { 
		city = 'Shelburne',
		rsvpUrl = 'https://forms.hackclub.com/rsvp'
	} = $props()

	let email = $state('');
	let emailRef: HTMLInputElement;
	let scrollY = $state(0);

	function openWithEmail(url: string) {
		const emailValue = email || '';
		window.open(`${url}?email=${encodeURIComponent(emailValue)}`, '_blank');
	}
</script>

<svelte:window bind:scrollY />

<section
	class="relative h-full flex items-end pb-32 2xl:pb-48 px-6 md:px-16 md:px-24 2xl:px-32 bg-center bg-cover"
>
	<div class="absolute top-0 left-0 w-full h-full pointer-events-none">
		<img src="/backgrounds/sky-shine.webp" alt="" class="w-full h-full object-cover select-none saturate-0 brightness-125 opacity-15" />
	</div>

	<div
		class="absolute bottom-[32px] right-[40px] md:right-[140px] w-full h-full pointer-events-none"
		style="transform: translateY({-scrollY / 12}px)"
	>
		<!-- fishy on the right. His name is frederick. -->
		<div class="absolute top-[128px] md:top-[96px] right-[-50px] md:right-[100px] w-1/3 md:w-1/6">
			<img
				src="/characters/fish-2.png"
				alt="Fish named Frederick"
				class="w-full h-full object-cover select-none saturate-0 brightness-125 opacity-30"
			/>
		</div>

		<!-- fishy on the left. His name is gubson -->
		<div class="absolute top-[96px] md:top-[60px] right-[-10px] md:right-[300px] w-1/3 md:w-1/6">
			<img
				src="/characters/fish-1.png"
				alt="Fish named Gubson"
				class="w-full h-full object-cover select-none saturate-0 brightness-125 opacity-30"
			/>
		</div>
	</div>

	<div
		class="absolute bottom-0 md:bottom-[160px] flex items-end md:block left-0 w-full h-full md:animate-cloud-float-right pointer-events-none"
	>
		<img
			src="/backgrounds/bottom-cloud.webp"
			alt=""
			class="select-none saturate-0 brightness-150 opacity-40"
			style="transform: translateY({-scrollY / 5}px)"
		/>
	</div>

	<div
		class="flex flex-col md:flex-row justify-between items-center w-full gap-8 pb-16 z-10 h-full pt-16 md:pt-0 md:h-auto"
	>
		<div class="flex flex-col gap-4 w-full md:w-[648px]">
			<div class="mb-6">
				<div class="flex items-center gap-2 mb-4">
					<a
						href="https://hackclub.com"
						class="transition-transform hover:scale-105 active:scale-95"
					>
						<img
							src="/decorative/hack-club-flag.png"
							alt="Hack Club"
							class="w-[151px] h-[53px] object-cover transform rotate-[-4.8deg] select-none"
						/>
					</a>
				</div>

				<div class="transform md:rotate-[-2.97deg] w-min">
					<h1
						class="text-[#fcf5ed] text-[80px] md:text-[120px] 2xl:text-[150px] font-normal leading-24 font-dream-planner"
						style="text-shadow: 5px 8px 0px rgba(0,0,0,0.25)"
					>
						CAMPFIRE
					</h1>
					<h2
						class="text-[#fcf5ed] text-[32px] md:text-[48px] 2xl:text-[48px] text-right font-normal leading-none mb-4 font-dream-planner"
						style="text-shadow: 5px 5px 0px rgba(0,0,0,0.25)"
					>
						{city.toUpperCase()}
					</h2>
				</div>

				<div class="pl-2 md:pl-4">
					<p
						class="text-white text-4xl font-bold mb-2 font-ember-and-fire"
						style="text-shadow: 0px 4px 4px rgba(0,0,0,0.25)"
					>
						Game jam for high schoolers in {city}
					</p>
					<p
						class="text-white text-4xl font-bold font-ember-and-fire"
						style="text-shadow: 0px 4px 4px rgba(0,0,0,0.25)"
					>
						Feb 7-8, 2026
					</p>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col md:flex-row items-center gap-4">
					<div
						class="bg-[#f9e2ca] border-4 border-[#d5a16c] rounded-[20px] px-4 md:px-8 py-4 flex items-center gap-3 md:gap-6 w-full transform md:rotate-[-1.2deg] shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
					>
						<img src="/icons/email.svg" alt="" class="w-6 h-5 flex-shrink-0 select-none" />
						<input
							bind:this={emailRef}
							bind:value={email}
							type="email"
							class="text-[#854d16] text-2xl md:text-4xl font-bold truncate bg-transparent border-none outline-none flex-1 cursor-text font-ember-and-fire"
							placeholder="you@hackclub.com"
						/>
					</div>

					<button
						class="bg-[#fca147] border-[5px] border-[rgba(0,0,0,0.2)] rounded-[20px] px-8 md:px-14 py-4 hover:scale-105 transition-transform w-full md:w-auto transform md:rotate-[1.5deg] shadow-[0_8px_20px_rgba(0,0,0,0.25)] cursor-pointer active:scale-95"
						type="button"
						onclick={() => openWithEmail(rsvpUrl)}
					>
						<p class="text-[#8d3f34] text-3xl md:text-5xl font-normal font-dream-planner">
							RSVP!
						</p>
					</button>
				</div>

				<div
					class="font-ember-and-fire text-white text-4xl pl-2 -translate-y-1 md:rotate-[-1.2deg]"
					style="text-shadow: 0px 4px 4px rgba(0,0,0,0.25)"
				>
					Not in {city}? <a
						class="underline inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 bg-transparent border-none text-white font-ember-and-fire text-4xl p-0"

						style="text-shadow: 0px 4px 4px rgba(0,0,0,0.25)"
						href="https://campfire.hackclub.com"
					>
						Find a campfire near you.
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<div class="absolute bottom-0 left-0 w-full pointer-events-none">
	<img
		src="/backgrounds/landing-grass.png"
		alt=""
		class="w-full h-full object-cover select-none saturate-0 brightness-300 opacity-25"
		style="transform: translateY({scrollY / 10}px)"
	/>
</div>
