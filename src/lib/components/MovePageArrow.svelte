<script lang="ts">
    import arrow_forward from '$lib/assets/arrow_forward.png'

	let { onClickHandler, rotation, offset = 12, label }: { onClickHandler: () => void, rotation: number, offset?: number, label?: string } = $props();
</script>

<button onclick={onClickHandler} class="fixed -translate-x-1/2 left-1/2 bottom-10 flex flex-col items-center justify-center z-50" style="bottom: {offset}px">
    <span>{label}</span>
    <img 
        alt="a down arrow"src={arrow_forward}
        style="transform: rotate({rotation}deg); transition: transform 0.5s ease;" 
        class="aspect-square w-8"
     />
</button>