<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center items-center font-bold mt-8 mb-8 z-20 space-x-32 text-center">
	<a href="/">home</a>
	<a href="/work">my work</a>
	<a href="/">my links</a>
</nav>

{@render children()}
