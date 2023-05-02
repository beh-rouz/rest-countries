<template>
  <NuxtLink
    class="block bg-white dark:bg-dark-blue-700 shadow-md rounded overflow-hidden"
    :to="'country/' + country.name.common"
  >
    <img
      class="w-full aspect-[16/10] object-cover"
      :src="country.flags.svg"
      :alt="country.flags.alt"
    />
    <div class="p-6 text-sm space-y-1">
      <div class="pb-3 text-base font-extrabold">{{ country.name.common }}</div>
      <div>
        <span class="font-semibold">Population: </span>
        <span>
          {{ formatNumber(country.population) }}
        </span>
      </div>
      <div>
        <span class="font-semibold">Region: </span>
        <span>
          {{ country.region }}
        </span>
      </div>
      <div>
        <span class="font-semibold">Capital: </span>
        <span>{{
          country.capital?.length > 0 ? country.capital.join(', ') : 'N/A'
        }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { Country } from '@/interfaces/country'
import { formatNumber } from '@/utils/format-number'

const { country } = defineProps<{ country: Country }>()
</script>
