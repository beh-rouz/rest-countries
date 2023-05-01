<template>
  <div class="mb-6">
    <div class="relative">
      <input
        type="text"
        placeholder="Search for a country..."
        class="py-3 pl-12 rounded border-none dark:bg-neutral-800 w-1/3 shadow-md focus:ring-2 focus:ring-blue-800"
      />
      <MagnifyingGlassIcon
        class="w-6 h-6 absolute left-3 top-3 text-neutral-500"
      />
    </div>
  </div>
  <div class="py-8 grid grid-cols-4 gap-[74px]">
    <CountryCard
      v-for="item in countries"
      :key="item.name.official"
      :country="item"
    />
  </div>
</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Country } from '@/interfaces/country'

const { data: countries } = await useFetch<Country[]>(
  'https://restcountries.com/v3.1/all',
  {
    params: { fields: ['name', 'flags', 'population', 'region', 'capital'] }
  }
)
</script>
