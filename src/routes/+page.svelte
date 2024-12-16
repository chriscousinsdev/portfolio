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

    let sectionContainer: HTMLDivElement;
    let linksContainer: HTMLDivElement;
    let sections: NodeListOf<HTMLElement>;
    let currentSection = $page.state.links ? 2 : 0;
    let rotation = $page.state.links ? 180 : 0;
    let isScrolling = false;

    onMount(() => {
        sections = sectionContainer.querySelectorAll("section");
        window.addEventListener("wheel", handleWheel, { passive: false })
        typeWords()
    })
    
    afterNavigate(() => {
        if ($page.state.links) {
            linksContainer.scrollIntoView({ behavior: 'smooth' });
            rotation = 180;
            currentSection = 2;
        }
    })

    const handleArrowForwardClick = () => {
        if (isScrolling) return;
        isScrolling = true;
        if (currentSection !== 2) currentSection++
        else currentSection = 0
        rotation = currentSection === 2 ? 180 : 0;
        scrollToSection()
    }

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        if (isScrolling) return;
        
        if (event.deltaY > 0) {
            if (currentSection < sections.length - 1) currentSection++;
        } else {
            if (currentSection > 0) currentSection--;
        }
        rotation = currentSection === 2 ? 180 : 0;
        isScrolling = true;
        scrollToSection()
    }

    const scrollToSection = () => {
        const selectedSection = sections.item(currentSection)
        if (!selectedSection) return

        let offset = 0;
        if (currentSection === 0) offset = 88

        const rect = selectedSection.getBoundingClientRect();
        const scrollPosition = window.scrollY + rect.top - offset;

        window.scrollTo({ top: scrollPosition, behavior: "smooth" });

        setTimeout(() => {
            isScrolling = false;
        }, 500)
    }

    const words = ["developer", "student", "tutor"]
    let typedText: HTMLHeadingElement;

    const TYPING_SPEED = 110;
    const DELETING_SPEED = 50;
    const FINISHED_DELAY = 4000;
    const START_DELAY = 300;

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

<div class="flex flex-col min-h-screen z-0 scroll-smooth scrollbar-hidden relative" bind:this={sectionContainer}>
    <MovePageArrow currentSection={currentSection} onClickHandler={handleArrowForwardClick} rotation={rotation}/>
    <section class="h-screen flex justify-center items-center translate-y-[-88px] space-x-8 relative z-0 pointer-events-none">
        <div class="bg-tv aspect-square w-72 blur-[100px] absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
        <img alt="a large computer" src={computer} class="w-[575px] relative z-10"/>
        <div class="flex flex-col space-y-4 mt-[-24px]">
            <h1>chriscousinsdev</h1>
            <div class="flex items-center">
                <h2 bind:this={typedText} class="h-16">developer.</h2>
                <span class="w-[1ch] animate-blink text-6xl">|</span>
            </div>
        </div>
    </section>
    <section class="grid grid-cols-[1.1fr_1fr] grid-rows-2 h-screen pb-10 pt-10">
        <div class="flex items-center justify-end">
            <img alt="a block of code" src={bio} class="w-[700px]"/>
        </div>
        <div class="flex flex-col justify-center space-y-2">
            <h3>about me</h3>
            <h5>some of my skills & interests</h5>
        </div>
        <div class="flex items-center justify-end">
            <img alt="a stack of books" src={books} class="w-[700px] pr-[200px] pl-[200px]"/>
        </div>
        <div class="flex flex-col justify-center space-y-2">
            <h3>my work</h3>
            <h5>current and past projects</h5>
        </div>
    </section>
    <section class="grid grid-cols-[1.1fr_1fr] h-[50vh]">
        <div class="grid grid-cols-[1.3fr_1fr] gap-6 gap-y-40 items-center">
            <div class="flex flex-col space-y-4 items-end">
                <img alt="linkedin icon" src={linkedin} class="w-9 aspect-square"/>
                <img alt="mail icon" src={email} class="w-9 aspect-square"/>
                <img alt="github icon" src={github} class="w-9 aspect-square"/>
                <img alt="cv icon" src={cv} class="w-9 aspect-square"/>
            </div>
            <div class="flex flex-col space-y-4">
                <h4><a href="https://www.linkedin.com/in/chriscousinsdev/" target="_blank">linkedin</a></h4>
                <h4><a href="mailto:chriscousinsdev@gmail.com" target="_blank">email</a></h4>
                <h4><a href="https://github.com/chriscousinsdev" target="_blank">github</a></h4>
                <h4><a href="mailto:chriscousinsdev@gmail.com" target="_blank">cv (on request)</a></h4>
            </div>
        </div>
        <div class="flex flex-col justify-center space-y-2 -mt-3" id="links" bind:this={linksContainer}>
            <h3>my links</h3>
            <h5>feel free to reach out</h5>
        </div>
    </section>
</div>