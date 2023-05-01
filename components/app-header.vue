<template>
	<header class="py-6 bg-white dark:bg-neutral-800 shadow-md">
		<div class="container mx-auto flex items-center">
			<h1 class="font-extrabold text-2xl">Where in the world?</h1>
			<div class="flex-auto"></div>
			<button
				class="appearance-none flex px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-700"
				@click="toggleColorMode()"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
					/>
				</svg>
				Dark Mode
			</button>
		</div>
	</header>
</template>

<script lang="ts" setup>
const colorMode = useColorMode()
console.log(colorMode.preference)

function toggleColorMode() {
	colorMode.value === 'light'
		? (colorMode.preference = 'dark')
		: (colorMode.preference = 'light')
}
</script>
