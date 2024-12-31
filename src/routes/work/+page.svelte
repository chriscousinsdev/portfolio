<script lang="ts">
    import { onMount } from "svelte";
    import TechnologyBanner from "$lib/components/TechnologyBanner.svelte";
	import Footer from "$lib/components/Footer.svelte";
    
    // technology icons
    import mongodb from '$lib/assets/technologies/mongodb.png'
    import typescript from '$lib/assets/technologies/typescript.png'
    import nextjs from '$lib/assets/technologies/nextjs.png'
    import discord from '$lib/assets/technologies/discord.png'
    import mysql from '$lib/assets/technologies/mysql.png'
    import csharp from '$lib/assets/technologies/csharp.png'
    import unity from '$lib/assets/technologies/unity.png'
    import blender from '$lib/assets/technologies/blender.png'
    import python from '$lib/assets/technologies/python.png'
    
    // project icons
    import watchdog from '$lib/assets/projects/watchdog.png'
    import damageinc from '$lib/assets/projects/damageinc.png'
    import discord_large from '$lib/assets/projects/discord.png'
 
    let currentProject = $state(0);
	let isScrolling = false;
    let direction: 1 | -1 = $state(-1);

	const projects = [
        { title: "watchdog", year: "2024-", image: { path: watchdog, size: 150, left: -50 }, link: "https://watchdog.gg" },
        { title: "damageinc", year: "2024-", image: { path: damageinc, size: 100, left: -100 }, link: "https://dmginc.gg" },
        { title: "researchpaper", year: "2024", image: { path: discord_large, size: 60, left: -65 } },
        { title: "discord", year: "2022-", image: { path: discord_large, size: 60, left: -65 } },
    ];

	const projectSpacing = 215;

	onMount(() => {
		window.addEventListener("wheel", handleWheel, { passive: false });
	});

	const handleWheel = (event: WheelEvent) => {
        const window = event.target;
		if (isScrolling || !window) return;
		event.preventDefault();
		if (event.deltaY > 0) {
            direction = -1
            // scroll down
			if (currentProject < 3) currentProject++;
		} else {
            // scroll up
            direction = 1
			if (currentProject > 0) currentProject--;
		}
        isScrolling = true;
		scrollToSection();
	};

	const scrollToSection = () => {
		setTimeout(() => {
            isScrolling = false;
		}, 400);
	};
</script>

<div class="flex flex-col items-center pt-5 space-y-40 h-screen">
    <h1>my work</h1>
    <div class="grid grid-cols-[1.4fr_1fr] h-screen">
        <div class="relative h-screen overflow-y-hidden">
            <div 
                class="transition-transform duration-500" style="transform: translateY({-(currentProject * projectSpacing)}px)"
            >
                {#each projects as project, i}
                <div 
                    class={`flex items-center w-full transition-all duration-500 ease-in-out ${i <= currentProject ? '' : '-mb-20'}`}
                    style="height: {projectSpacing}px;"
                >
                    <div 
                        class="relative flex flex-col items-center mr-6 h-full"
                    >
                        <div class="w-4 h-4 rounded-full bg-offwhite translate-y-[6.25rem]"></div>
                        {#if i < projects.length - 1}
                            <div class={`w-[2px] bg-offwhite translate-y-[6.25rem] transition-opacity ${i < currentProject ? 'opacity-0' : 'opacity-100'} ${i < currentProject ? '' : 'h-[200px]'}`}></div>
                        {/if}
                    </div>

                    <div 
                        class={`mr-32 text-offwhite font-bold transition duration-500 w-20 ${i === currentProject ? '' : i === currentProject + 1 ? 'opacity-80' : 'opacity-30'}`}
                        style="transform: scale({i === currentProject ? 1.5 : 1}) translateX({i === currentProject ? 10 : 0}px);" 
                    >
                        {project.year}
                    </div>
                    <div class={`flex items-center w-full ${i === currentProject ? '' : i === currentProject + 1 ? 'opacity-80' : 'opacity-30'}`}>
                        <a href={project?.link ?? ''} target="_blank">
                            <img 
                                alt={`${project.title} logo`}
                                src={project.image.path} 
                                class="transition-transform duration-500"
                                style="transform: scale({i === currentProject ? 1.5 : 1}) translateX({i === currentProject ? '10px' : `${project.image.left}px`}); height: {project.image.size}px; " 
                            />
                        </a>
                    </div>
                </div>
                {/each}
            </div>
        </div>

        {#if currentProject === 0}
        <div 
            class={`w-[33vw] col-start-2 col-end-2 row-start-1 row-end-1 h-[215px] flex items-center ${direction === -1 ? 'animate-flyInUp' : 'animate-flyInDown'}`}
        >
            <div class="space-y-4">
                <h3>my current project</h3>
                <h6>an alt detection system that utilizes 3rd party api's to scan players and detect ban evasion within Rust (the game)</h6>
                <div class="flex space-x-4">
                    <TechnologyBanner name={"MONGODB"} logo={mongodb}/>
                    <TechnologyBanner name={"TYPESCRIPT"} logo={typescript}/>
                    <TechnologyBanner name={"NEXTJS"} logo={nextjs}/>
                    <TechnologyBanner name={"DISCORD API"} logo={discord}/>
                </div>
            </div>
        </div>
        {/if}
        {#if currentProject === 1}
        <div 
            class={`w-[33vw] col-start-2 col-end-2 row-start-1 row-end-1 h-[215px] flex items-center ${direction === -1 ? 'animate-flyInUp' : 'animate-flyInDown'}`}
        >
            <div class="space-y-4">
                <h3>voluntary work</h3>
                <h6>maintaining and developing new features for a full frontend, api and discord stack</h6>
                <div class="flex space-x-4">
                    <TechnologyBanner name={"MYSQL"} logo={mysql}/>
                    <TechnologyBanner name={"TYPESCRIPT"} logo={typescript}/>
                    <TechnologyBanner name={"NEXTJS"} logo={nextjs}/>
                </div>
            </div>
        </div>
        {/if}
        {#if currentProject === 2}
        <div 
            class={`w-[33vw] col-start-2 col-end-2 row-start-1 row-end-1 h-[215px] flex items-center ${direction === -1 ? 'animate-flyInUp' : 'animate-flyInDown'}`}
        >
            <div class="space-y-4">
                <h3>research paper</h3>
                <h6>an investigation, solution and analysis of accessibility focused 3D pathfinding</h6>
                <div class="flex space-x-4">
                    <TechnologyBanner name={"C#"} logo={csharp}/>
                    <TechnologyBanner name={"UNITY"} logo={unity}/>
                    <TechnologyBanner name={"BLENDER"} logo={blender}/>
                </div>
            </div>
        </div>
        {/if} 
        {#if currentProject === 3}
        <div 
            class={`w-[33vw] col-start-2 col-end-2 row-start-1 row-end-1 h-[215px] flex items-center ${direction === -1 ? 'animate-flyInUp' : 'animate-flyInDown'}`}
        >
            <div class="space-y-4">
                <h3>discord bots</h3>
                <h6>a number of utility bots for various purposes such as Rust admining, timers, notifications, and more</h6>
                <div class="flex space-x-4">
                    <TechnologyBanner name={"PYTHON"} logo={python}/>
                    <TechnologyBanner name={"TYPESCRIPT"} logo={typescript}/>
                    <TechnologyBanner name={"DISCORD API"} logo={discord}/>
                </div>
            </div>
        </div>
        {/if}
    </div>
    <Footer />
</div>