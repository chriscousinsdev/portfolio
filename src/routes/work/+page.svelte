<script lang="ts">
	import { onMount } from "svelte";
	import TechnologyBanner from "$lib/components/TechnologyBanner.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import MovePageArrow from "$lib/components/MovePageArrow.svelte";

    // technology icons
    const mongodb = '/assets/technologies/mongodb.png'
    const typescript = '/assets/technologies/typescript.png'
    const nextjs = '/assets/technologies/nextjs.png'
    const discord = '/assets/technologies/discord.png'
    const mysql = '/assets/technologies/mysql.png'
    const csharp = '/assets/technologies/csharp.png'
    const unity = '/assets/technologies/unity.png'
    const blender = '/assets/technologies/blender.png'
    const python = '/assets/technologies/python.png'
	
	// project icons
	const watchdog = '/assets/projects/watchdog.png';
	const damageinc = '/assets/projects/damageinc.png';
	const discord_large = '/assets/projects/discord.png';
    const research_paper = '/assets/projects/researchpaper.png'

	let currentProject = 0;
	let isScrolling = false;
    let startPointerY = 0;
    let rotation = 0;

	const projects = [
		{ 
			title: "my current project", 
			year: "2024-", 
			image: { path: watchdog, size: 600 }, 
			link: "https://watchdog.gg", 
			description: "an alt detection system that utilizes 3rd party api's to scan players and detect ban evasion within Rust (the game)",
            technologyBanners: [
                { name: "MONGODB", logo: mongodb },
                { name: "TYPESCRIPT", logo: typescript },
                { name: "NEXTJS", logo: nextjs },
                { name: "DISCORD API", logo: discord },
            ]
		},
		{ 
			title: "voluntary work", 
			year: "2024-", 
			image: { path: damageinc, size: 500 }, 
			link: "https://dmginc.gg",
			description: "maintaining and developing new features for a full frontend, api and discord stack",
            technologyBanners: [
                { name: "MYSQL", logo: mysql },
                { name: "TYPESCRIPT", logo: typescript },
                { name: "NEXTJS", logo: nextjs },
            ]
		},
		{ 
			title: "research paper", 
			year: "2024", 
			image: { path: research_paper, size: 550 },
			description: "an investigation, solution and analysis of accessibility focused 3D pathfinding",
            technologyBanners: [
                { name: "C#", logo: csharp },
                { name: "UNITY", logo: unity },
                { name: "BLENDER", logo: blender },
            ]
		},
		{ 
			title: "discord bots", 
			year: "2022-", 
			image: { path: discord_large, size: 500 },
			description: "a number of utility bots for various purposes such as Rust admining, timers, notifications, and more",
            technologyBanners: [
                { name: "PYTHON", logo: python },
                { name: "TYPESCRIPT", logo: typescript },
                { name: "DISCORD API", logo: discord },
            ]
		},
	];

    $: label = projects[currentProject].year

	onMount(() => {
		window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("pointermove", handlePointerMove, { passive: false })
        window.addEventListener("pointerdown", handlePointerDown, { passive: false })
	});

    //Mouse wheel scrolling
	const handleWheel = (event: WheelEvent) => {
		if (isScrolling) return;
		event.preventDefault();

		if (event.deltaY > 0) {
			// scrolling down
			if (currentProject < projects.length - 1) currentProject++;
        } else {
			// scrolling up
			if (currentProject > 0) currentProject--;
		}
        rotation = currentProject === projects.length - 1 ? 180 : 0;
		isScrolling = true;
		setTimeout(() => {
			isScrolling = false;
		}, 400);
	}

    //Touch screen scrolling
    const handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType !== 'touch') return;
        startPointerY = event.clientY;
    }    
    const handlePointerMove = (event: PointerEvent) => {
        if (isScrolling || event.pointerType !== 'touch') return;
		event.preventDefault();

        const deltaY = event.clientY - startPointerY
		if (deltaY < 0) {
			// scrolling down
			if (currentProject < projects.length - 1) currentProject++;
		} else {
			// scrolling up
			if (currentProject > 0) currentProject--;
		}

		isScrolling = true;
		setTimeout(() => {
			isScrolling = false;
		}, 400);
    }

    //Arrow scrolling
    const handleArrowForwardClick = () => {
        if (isScrolling) return;
        isScrolling = true;
        //update visible section and arrow direction
        currentProject !== projects.length - 1 ? currentProject++ : currentProject = 0
        rotation = currentProject === projects.length - 1 ? 180 : 0;
        setTimeout(() => {
			isScrolling = false;
		}, 400);
    }
</script>

<div class="flex flex-col items-center justify-start h-svh pt-10">
    <MovePageArrow onClickHandler={handleArrowForwardClick} rotation={rotation} offset={50} label={label}/>
    <div class="relative w-full h-[600px] overflow-hidden">
        <div
            class="transition-transform duration-500"
            style={`transform: translateY(${-currentProject * 600}px)`}
        > 
                {#each projects as project, index} 
                <div class="h-[600px] flex items-center lg:justify-center flex-col lg:flex-row">
                    <div class="hidden lg:flex items-center justify-center space-x-2 opacity-100 translate-x-60">
                        <div class="relative">
                            <div class="w-4 h-4 rounded-full bg-offwhite"></div>
                                {#if index === 0 || index === projects.length - 1}
                                    <div class={`absolute ${index === 0 ? 'top-full' : 'bottom-full'} left-1/2 -translate-x-1/2 w-0.5 h-[310px] bg-offwhite`}></div>
                                {/if}
                                {#if index !== 0 && index !== projects.length - 1}
                                    <div class="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-[310px] bg-offwhite"></div>
                                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 w-0.5 h-[310px] bg-offwhite"></div>
                                {/if}
                        </div>
                        <div class={`text-offwhite font-bold text-xl w-32`}>{project.year}</div> 
                    </div>
                    <div class="h-[600px] flex items-center lg:justify-center transition-opacity duration-1000 {currentProject === index ? "opacity-100" : "opacity-0"} flex-col lg:flex-row lg:w-[1800px]">
                        <div class="flex flex-col items-center justify-end mb-6 lg:mb-0 lg:justify-center lg:w-[600px]">
                            <a href={project?.link ?? ''} target="_blank">
                                <img
                                    alt={`${project.title} logo`}
                                    src={project.image.path}
                                    width={project.image.size}
                                />
                            </a>
                        </div>
                        <div class="flex flex-col w-full justify-end px-5 space-y-4 lg:w-1/3">
                            <h3>{project.title}</h3>
                            <h6>{project.description}</h6>
                            <div class="flex gap-x-4 gap-y-3 flex-wrap w-full">
                                {#each project.technologyBanners as technologyBanner}
                                <TechnologyBanner
                                    name={technologyBanner.name}
                                    logo={technologyBanner.logo}
                                />
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
	</div>
	<Footer />
</div>