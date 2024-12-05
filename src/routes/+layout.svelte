<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex justify-center font-bold space-x-32 mt-8 mb-8">
	<a href="/">home</a>
	<a href="/work">my work</a>
	<a href="/">my links</a>
</nav>

{@render children()}
