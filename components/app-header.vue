<template>
  <header class="py-5 bg-white dark:bg-dark-blue-700 shadow-md">
    <div class="container mx-auto flex items-center sm:px-0 px-4">
      <h1 class="font-extrabold text-base sm:text-2xl">Where in the world?</h1>
      <div class="flex-auto"></div>
      <button
        class="appearance-none flex items-center font-semibold px-3 py-2 rounded text-sm sm:text-base -mr-2 sm:mr-0 hover:bg-light-gray dark:hover:bg-dark-blue-800"
        @click="toggleColorMode()"
      >
        <MoonIcon class="w-4 h-4 sm:w-6 sm:h-6 mr-2" />
        Dark Mode
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { MoonIcon } from '@heroicons/vue/24/outline'

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.value === 'light'
    ? (colorMode.preference = 'dark')
    : (colorMode.preference = 'light')
}
</script>
