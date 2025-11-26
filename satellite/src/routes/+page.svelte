<script lang="ts"> 
    import Navbar from "$lib/components/Navbar.svelte";
    import Landing from "$lib/components/Landing.svelte";
    import OrganizerNote from "$lib/components/OrganizerNote.svelte";

    import structure from "$lib/structure.json"

    const { city, color, blocks } = structure as {
        city: string;
        color: string;
        blocks: {
            type: string;
        }[];
    }
</script>

<div class="w-full h-screen overflow-hidden">
	<Navbar />
	<Landing {city} />
</div>
{#each blocks as block (block.type)}
	{#if block.type === "note"}
		<OrganizerNote />
	{/if}
{/each}