<template>
  <div class="bg-white shadow-md rounded text-sm overflow-hidden">
    <img
      class="w-full aspect-[16/9] object-cover"
      :src="country.flags.svg"
      :alt="country.flags.alt"
    />
    <div class="p-4">
      <div class="pb-4 font-semibold">{{ country.name.official }}</div>
      <div>
        Population:
        <span class="text-gray-500">{{ country.population }}</span>
      </div>
      <div>
        Region:
        <span class="text-gray-500">{{ country.region }}</span>
      </div>
      <div>
        Capital:
        <span class="text-gray-500">{{
          country.capital?.length > 0 ? country.capital.join(', ') : 'N/A'
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Country } from '@/interfaces/country'

const { country } = defineProps<{ country: Country }>()
</script>
