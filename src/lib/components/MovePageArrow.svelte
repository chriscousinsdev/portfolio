<script lang="ts">
    import arrow_forward from '$lib/assets/arrow_forward.png'

	let { onClickHandler, rotation }: { currentSection: number, onClickHandler: () => void, rotation: number } = $props();
</script>

<button class="fixed ml-[-26px] left-1/2 bottom-3" onclick={onClickHandler}>
    <img 
    alt="a down arrow"src={arrow_forward} 
    style={`transform: rotate(${rotation}deg); transition: transform 0.5s ease;`}
    class={`aspect-square w-8 `} 
    />
</button>
