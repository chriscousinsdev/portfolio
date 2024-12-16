<script lang="ts">
	import { goto } from '$app/navigation';
	import '../app.css';
	let { children } = $props();

	const handleLinksClick = (event: MouseEvent) => {
		event.preventDefault();
		goto('/', { state: { links: true }})
	}
</script>

<nav class="flex justify-center items-center font-bold mt-8 mb-8 z-20 space-x-32 text-center">
	<a href="/">home</a>
	<a href="/work">my work</a>
	<a href="/" onclick={handleLinksClick}>my links</a>
</nav>

{@render children()}
