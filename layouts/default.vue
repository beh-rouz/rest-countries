<template>
  <header class="py-4 bg-white shadow">
    <div class="container mx-auto flex items-center">
      <div class="font-semibold">Where in the world?</div>
      <div class="flex-auto"></div>
      <div>dark mode toggle</div>
    </div>
  </header>

  <!-- page content -->
  <div class="container mx-auto">
    <slot />
  </div>
</template>
