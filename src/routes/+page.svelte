<svelte:head>
    <title>chriscousinsdev</title> 
</svelte:head>

<script lang="ts">
    import computer from '$lib/assets/computer.png'
    import bio from '$lib/assets/bio.png'
    import books from '$lib/assets/books.png'
	import { onMount } from 'svelte';
    import MovePageArrow from '$lib/components/MovePageArrow.svelte';

    import linkedin from '$lib/assets/linkedin.png'
    import email from '$lib/assets/mail.png'
    import github from '$lib/assets/github.png'
    import cv from '$lib/assets/cv.png'
    
    import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

    const words = ["developer", "student", "tutor"]
    const TYPING_SPEED = 110;
    const DELETING_SPEED = 50;
    const FINISHED_DELAY = 4000;
    const START_DELAY = 300;

    let sectionContainer: HTMLDivElement;
    let linksContainer: HTMLDivElement;
    let sections: NodeListOf<HTMLElement>;
    let currentSection = $page.state.links ? 2 : 0;
    let rotation = $page.state.links ? 180 : 0;
    let isScrolling = false;
    let startPointerY = 0;

    onMount(() => {
        sections = sectionContainer.querySelectorAll("section");
        window.addEventListener("wheel", handleWheel, { passive: false })
        window.addEventListener("pointermove", handlePointerMove, { passive: false })
        window.addEventListener("pointerdown", handlePointerDown, { passive: false })
        typeWords()
    })
    
    afterNavigate(() => {
        // check links state and scroll to section if true
        if ($page.state.links) {
            linksContainer.scrollIntoView({ behavior: 'smooth' });
            rotation = 180;
            currentSection = 2;
        }
    })

    const handleArrowForwardClick = () => {
        if (isScrolling) return;
        isScrolling = true;
        //update visible section and arrow direction
        currentSection !== 2 ? currentSection++ : currentSection = 0
        rotation = currentSection === 2 ? 180 : 0;
        scrollToSection()
    }

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        if (isScrolling) return;
        isScrolling = true;
        
        if (event.deltaY > 0) {
            //scrolling down
            if (currentSection < sections.length - 1) currentSection++;
        } else {
            //scrolling up
            if (currentSection > 0) currentSection--;
        }

        rotation = currentSection === 2 ? 180 : 0;
        scrollToSection()
    } 

    const handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType !== 'touch') return;
        startPointerY = event.clientY;
    }
    
    const handlePointerMove = (event: PointerEvent) => {
        event.preventDefault();
        if (isScrolling || event.pointerType !== 'touch') return;
        isScrolling = true;
        const deltaY = event.clientY - startPointerY
        if (deltaY < 0) {
            //scrolling down
            if (currentSection < sections.length - 1) currentSection++;
        } else {
            //scrolling up
            if (currentSection > 0) currentSection--;
        }
        rotation = currentSection === 2 ? 180 : 0;
        scrollToSection()
    }

    const scrollToSection = () => {
        const selectedSection = sections.item(currentSection)
        if (!selectedSection) return

        let offset = 0;
        if (currentSection === 0) offset = 88

        //scroll to the relevant section using navbar offset
        const rect = selectedSection.getBoundingClientRect();
        const scrollPosition = window.scrollY + rect.top - offset;

        window.scrollTo({ top: scrollPosition, behavior: "smooth" });

        //debounce multiple scrolls
        setTimeout(() => {
            isScrolling = false;
        }, 500)
    }

    let typedText: HTMLHeadingElement;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeWords = () => {
        const currentWord = words[wordIndex] + '.';
        if (!isDeleting) {
            charIndex++;
            if (charIndex === currentWord.length) {
                setTimeout(() => {
                    isDeleting = true;
                    typeWords();
                }, FINISHED_DELAY);
                return;
            }
        } else {
            if (charIndex >= 0) charIndex--;
            else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(() => {
                    typeWords()
                }, START_DELAY)
                return;
            }
        }

        const partialText = currentWord.slice(0, charIndex + 1);
        if (!typedText) return;
        if (partialText.endsWith('.')) {
            typedText.innerHTML = partialText.slice(0, -1) + `<span class="text-cyanblue">.</span>`;
        } else {
            typedText.textContent = partialText;
        }

        let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;
        setTimeout(typeWords, delay);
    }
</script>

<div class="flex flex-col min-h-screen z-0 scroll-smooth scrollbar-hidden relative touch-pinch-zoom" bind:this={sectionContainer}>
    <MovePageArrow onClickHandler={handleArrowForwardClick} rotation={rotation}/>
    <!-- first section, fullpage, landing -->
    <section class="h-screen flex flex-col lg:flex-row justify-center items-center translate-y-[-88px] lg:space-x-8 relative z-0 pointer-events-none">
        <div class="bg-tv aspect-square w-32 lg:w-72 blur-[100px] absolute top-1/2 left-1/2 lg:left-1/4 -translate-x-1/2 -translate-y-1/2 lg:-mt-6 lg:ml-6"></div>
        <img alt="a large computer" src={computer} class="w-[300px] lg:w-[575px] relative z-10"/>
        <div class="flex flex-col space-y-4 mt-[-24px]">
            <h1>chriscousinsdev</h1>
            <div class="flex items-end justify-center lg:items-center lg:justify-start">
                <h2 bind:this={typedText} class="h-8 lg:h-16">developer.</h2>
                <span class="w-[1ch] animate-blink text-xl lg:text-5xl">|</span>
            </div>
        </div>
    </section>
    <!-- second section, fullpage, about me and my work subsections -->
    <section class="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] grid-rows-[1fr_1fr_1fr_1fr] lg:grid-rows-2 h-svh lg:h-screen pb-10 pt-6 lg:pt-10 lg:space-x-16">
        <div class="flex flex-col justify-center space-y-2 order-0 lg:order-1 items-center lg:items-end">
            <h3>about me</h3>
            <h5>some of my skills & interests</h5>
        </div>
        <div class="flex items-center justify-center lg:justify-start order-1 lg:order-0">
            <img alt="a block of code" src={bio} class="w-[365px] lg:w-[700px]"/>
        </div>
        <div class="order-2 flex flex-col justify-center items-center lg:items-end space-y-2">
            <h3>my work</h3>
            <h5>current and past projects</h5>
        </div>
        <div class="order-3 lg:order-2 flex items-center justify-center lg:justify-start">
            <img alt="a stack of books" src={books} class="w-[200px] lg:w-[300px]"/>
        </div>
    </section>
    <!-- third section, halfpage, links subsection -->
    <section class="grid grid-cols-1 grid-rows-[0.4fr_1fr] lg:grid-rows-1 lg:grid-cols-[0.9fr_1.1fr] h-[50svh] lg:h-[50vh]">
        <div class="grid grid-cols-[0.3fr_0.4fr] lg:grid-cols-[0.2fr_1fr] gap-6 gap-y-40 items-center order-1 lg:order-0 -mt-10">
            <div class="flex flex-col space-y-4 items-end">
                <img alt="linkedin icon" src={linkedin} class="h-7 aspect-square"/>
                <img alt="mail icon" src={email} class="h-7 aspect-square"/>
                <img alt="github icon" src={github} class="h-7 aspect-square"/>
                <img alt="cv icon" src={cv} class="h-7 aspect-square"/>
            </div>
            <div class="flex flex-col space-y-4 order-0 lg:order-1">
                <h4><a href="https://www.linkedin.com/in/chriscousinsdev/" target="_blank">linkedin</a></h4>
                <h4><a href="mailto:chriscousinsdev@gmail.com" target="_blank">email</a></h4>
                <h4><a href="https://github.com/chriscousinsdev" target="_blank">github</a></h4>
                <h4><a href="mailto:chriscousinsdev@gmail.com" target="_blank">cv (on request)</a></h4>
            </div>
        </div>
        <div class="flex flex-col justify-center space-y-2 -mt-3 items-center lg:items-end" id="links" bind:this={linksContainer}>
            <h3>my links</h3>
            <h5>feel free to reach out</h5>
        </div>
    </section>
</div>