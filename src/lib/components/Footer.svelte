<script lang="ts">
    import linkedin from '$lib/assets/linkedin.png'
    import email from '$lib/assets/mail.png'
    import github from '$lib/assets/github.png'

    const footerItems = [
        { name: "linkedin", logo: linkedin },
        { name: "email", logo: email },
        { name: "github", logo: github },
    ]
</script>

<div class="flex space-x-16 absolute bottom-4 left-1/2 -translate-x-1/2">
    {#each footerItems as footerItem}
    <div class="flex items-center space-x-1">
        <img 
        alt={`${footerItem.name} logo`} src={footerItem.logo} 
        class={`aspect-auto h-4 w-auto`} 
        />
        <span class="font-bold text-sm">{footerItem.name}</span>
    </div>
    {/each}
</div>


