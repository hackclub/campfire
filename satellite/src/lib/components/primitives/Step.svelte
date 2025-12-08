<script lang="ts">
	let {
		stepNumber,
		imageSrc,
		imageAlt,
		isReversed = false,
		children
	}: {
		stepNumber: number;
		imageSrc: string;
		imageAlt: string;
		isReversed?: boolean;
		children: any;
	} = $props();
</script>

<div
	class="flex gap-16 items-center w-full flex-col-reverse {isReversed
		? 'md:flex-row-reverse'
		: 'md:flex-row'}"
>
	<div
		class="relative flex flex-col text-black flex-1 {isReversed
			? 'md:items-start'
			: 'md:items-end md:text-right'}"
	>
		<div class="absolute -inset-12 md:-inset-16 z-0 pointer-events-none overflow-visible">
			<img
				src="/compressed/ui/step-bg.webp"
				alt=""
				class="w-min h-full object-fill select-none translate-y-2 md:translate-y-0"
			/>
		</div>

		<p class="text-3xl font-bold mb-2 font-serif relative z-10">Step {stepNumber}</p>

		<p class="text-4xl leading-tight font-serif relative z-10 md:max-w-3/4">
			{@render children()}
		</p>
	</div>

	<img
		src={imageSrc}
		alt={imageAlt}
		class="rounded-lg object-cover w-full scale-120 md:scale-100 md:w-[509px] aspect-video shadow-[-8px_16px_0px_0px_rgba(0,0,0,0.25)] relative z-20"
	/>
</div>
