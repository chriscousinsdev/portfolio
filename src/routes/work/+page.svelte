<script lang="ts">
    import TechnologyBanner from "$lib/components/TechnologyBanner.svelte";

    import mongodb from '$lib/assets/technologies/mongodb.png'
    import typescript from '$lib/assets/technologies/typescript.png'
    import nextjs from '$lib/assets/technologies/nextjs.png'
    import discord from '$lib/assets/technologies/discord.png'

    let currentProject = 0;
</script>

<div class="flex flex-col items-center pt-5 space-y-40">
    <h1>my work</h1>
    <div class="grid grid-cols-[1fr_1fr]">
        {#if currentProject === 0}
        <div>WATCHDOG</div>
        <div class="w-[33vw] space-y-4">
            <h3>my current project</h3>
            <h6>an alt detection system that utilizes 3rd party api's to scan players and detect ban evasion within Rust (the game)</h6>
            <div class="flex">
                <TechnologyBanner name={"MONGODB"} logo={mongodb}/>
                <TechnologyBanner name={"TYPESCRIPT"} logo={typescript}/>
                <TechnologyBanner name={"NEXTJS"} logo={nextjs}/>
                <TechnologyBanner name={"DISCORD API"} logo={discord}/>
            </div>
        </div>
        {/if}
        {#if currentProject === 1}
        <div>DAMAGE INC</div>
        <div class="w-[33vw] space-y-4">
            <h3>voluntary work</h3>
            <h6>an alt detection system that utilizes 3rd party api's to scan players and detect ban evasion within Rust (the game)</h6>
            <div class="flex">
                <TechnologyBanner name={"MONGODB"} logo={books}/>
                <TechnologyBanner name={"TYPESCRIPT"} logo={books}/>
                <TechnologyBanner name={"NEXTJS"} logo={books}/>
                <TechnologyBanner name={"DISCORD API"} logo={books}/>
            </div>
        </div>
        {/if}
        {#if currentProject === 2}
        <div>RESEARCH PAPER</div>
        <div class="w-[33vw] space-y-4">
            <h3>my current project</h3>
            <h6>an alt detection system that utilizes 3rd party api's to scan players and detect ban evasion within Rust (the game)</h6>
            <div class="flex">
                <TechnologyBanner name={"MONGODB"} logo={books}/>
                <TechnologyBanner name={"TYPESCRIPT"} logo={books}/>
                <TechnologyBanner name={"NEXTJS"} logo={books}/>
                <TechnologyBanner name={"DISCORD API"} logo={books}/>
            </div>
        </div>
        {/if} 
        {#if currentProject === 3}
        <div>DISCORD BOTS</div>
        <div class="w-[33vw] space-y-4">
            <h3>my current project</h3>
            <h6>an alt detection system that utilizes 3rd party api's to scan players and detect ban evasion within Rust (the game)</h6>
            <div class="flex">
                <TechnologyBanner name={"MONGODB"} logo={books}/>
                <TechnologyBanner name={"TYPESCRIPT"} logo={books}/>
                <TechnologyBanner name={"NEXTJS"} logo={books}/>
                <TechnologyBanner name={"DISCORD API"} logo={books}/>
            </div>
        </div>
        {/if}
    </div>
</div>