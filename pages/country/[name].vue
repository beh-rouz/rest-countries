<template>
  <div class="pb-16">
    <NuxtLink
      to="/"
      class="shadow-[0_0_4px_rgba(0,0,0,0.3)] px-4 py-1.5 rounded w-28 text-center flex items-center hover:bg-white"
    >
      <ArrowLongLeftIcon class="w-6 h-6 mr-2" />
      Back
    </NuxtLink>
  </div>
  <div v-if="country" class="flex">
    <div class="w-1/2 pr-8 flex-shrink-0">
      <img
        :src="country.flags.svg"
        :alt="country.flags.alt"
        class="w-full aspect-[16/10] object-cover"
      />
    </div>
    <div class="flex-auto p-8">
      <h1 class="text-3xl font-extrabold mb-6">{{ country.name.common }}</h1>
      <div class="flex text-gray-500">
        <div class="space-y-2">
          <div>
            <span class="font-semibold text-gray-800">Native Name: </span>
            <span v-for="(value, key) in country.name.nativeName" :key="key">
              {{ value.common }} ({{ key }})
            </span>
          </div>
          <div>
            <span class="font-semibold text-gray-800">Population: </span>
            <span>{{ formatNumber(country.population) }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-800">Region: </span>
            <span>{{ country.region }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-800">Sub Region: </span>
            <span>{{ country.subregion }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-800">Capitial: </span>
            <span>{{
              country.capital ? country.capital.join(', ') : 'N/A'
            }}</span>
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <span class="font-semibold text-gray-800">Top Level Domain: </span>
            <span>{{ country.tld.join(', ') }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-800">Currencies: </span>
            <span v-for="(value, key) in country.currencies" :key="key">
              {{ value.name }} ({{ value.symbol }})
            </span>
          </div>
          <div>
            <span class="font-semibold text-gray-800">Languages: </span>
            <span>{{ Object.values(country.languages).join(', ') }}</span>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap gap-3 items-center mt-8">
        <span class="font-semibold text-gray-800 flex-shrink-0">
          Border Countries:
        </span>
        <NuxtLink
          v-for="item in borderCountries"
          :key="item.name.common"
          :to="item.name.common"
          class="shadow-[0_0_4px_rgba(0,0,0,0.3)] px-4 py-1.5 rounded w-28 text-center text-sm text-gray-600 hover:bg-white"
        >
          {{ item.name.common }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/20/solid'
import { Country } from '@/interfaces/country'
import { formatNumber } from '@/utils/format-number'

const { name } = useRoute().params

const fields: Array<keyof Country> = [
  'name',
  'capital',
  'currencies',
  'flags',
  'languages',
  'population',
  'region',
  'subregion',
  'tld',
  'borders'
]

const { data: searchResult } = await useFetch<Country[]>(
  `https://restcountries.com/v3.1/name/${name}`,
  { params: { fullText: 'true', fields } }
)

const country = searchResult.value ? searchResult.value[0] : null

let borderCountries: Ref<Pick<Country, 'name'>[] | null>
if (country && country.borders?.length > 0) {
  borderCountries = await useFetch<Pick<Country, 'name'>[]>(
    'https://restcountries.com/v3.1/alpha',
    {
      params: { codes: country.borders, fields: 'name' }
    }
  ).data
}
</script>
