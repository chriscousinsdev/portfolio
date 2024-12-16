<script lang="ts">
	let { name, logo }: { name: string, logo: string } = $props();
</script>

<div class="flex space-x-1">
    <img 
    alt="a down arrow" src={logo} 
    class={`aspect-auto h-6 w-auto text-sm`} 
    />
    <h4 class="text-base">{name}</h4>
</div>

