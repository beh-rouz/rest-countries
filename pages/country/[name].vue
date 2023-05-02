<template>
  <div class="px-4 py-4 sm:px-0 sm:py-0">
    <div class="mb-16">
      <NuxtLink
        to="/"
        class="text-sm sm:text-base shadow-[0_0_4px_rgba(0,0,0,0.3)] dark:shadow-[0_0_4px_rgba(255,255,255,0.3)] px-4 py-1.5 rounded w-28 text-center flex items-center hover:bg-dark-gray dark:hover:bg-dark-blue-700"
      >
        <ArrowLongLeftIcon class="w-6 h-6 mr-2" />
        Back
      </NuxtLink>
    </div>
    <div v-if="country" class="flex flex-col sm:flex-row">
      <div class="w-full sm:w-1/2 sm:pr-8 flex-shrink-0">
        <img
          :src="country.flags.svg"
          :alt="country.flags.alt"
          class="w-full aspect-[16/10] object-cover"
        />
      </div>
      <div class="flex-auto sm:p-8 mt-12 sm:mt-0 text-sm sm:text-base">
        <h1 class="text-2xl sm:text-3xl font-extrabold mb-6">
          {{ country.name.common }}
        </h1>
        <div class="flex flex-col sm:flex-row">
          <div class="space-y-2 pr-4">
            <div>
              <span class="font-semibold"> Native Name: </span>
              <span
                v-for="(value, key, index) in country.name.nativeName"
                :key="key"
              >
                {{ value.common }} ({{ key }})
                {{
                  Object.keys(country.name.nativeName).length - 1 > index
                    ? '/ '
                    : ''
                }}
              </span>
            </div>
            <div>
              <span class="font-semibold"> Population: </span>
              <span>{{ formatNumber(country.population) }}</span>
            </div>
            <div>
              <span class="font-semibold"> Region: </span>
              <span>{{ country.region }}</span>
            </div>
            <div>
              <span class="font-semibold"> Sub Region: </span>
              <span>{{ country.subregion }}</span>
            </div>
            <div>
              <span class="font-semibold"> Capitial: </span>
              <span>{{
                country.capital ? country.capital.join(', ') : 'N/A'
              }}</span>
            </div>
          </div>
          <div class="space-y-2 mt-8 sm:mt-0 sm:ml-auto">
            <div>
              <span class="font-semibold text-gray-800 dark:text-gray-100"
                >Top Level Domain:
              </span>
              <span>{{ country.tld.join(', ') }}</span>
            </div>
            <div>
              <span class="font-semibold text-gray-800 dark:text-gray-100"
                >Currencies:
              </span>
              <span v-for="(value, key) in country.currencies" :key="key">
                {{ value.name }} ({{ value.symbol }})
              </span>
            </div>
            <div>
              <span class="font-semibold text-gray-800 dark:text-gray-100"
                >Languages:
              </span>
              <span>{{ Object.values(country.languages).join(', ') }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap gap-3 items-center mt-8">
          <span class="font-semibold flex-shrink-0 w-full sm:w-auto">
            Border Countries:
          </span>
          <NuxtLink
            v-for="item in borderCountries"
            :key="item.name.common"
            :to="item.name.common"
            class="shadow-[0_0_4px_rgba(0,0,0,0.3)] dark:shadow-[0_0_4px_rgba(255,255,255,0.3)] px-4 py-1.5 rounded min-w-[6rem] text-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:bg-dark-gray dark:hover:bg-dark-blue-700"
          >
            {{ item.name.common }}
          </NuxtLink>
          <span
            v-if="!borderCountries"
            class="text-gray-500 dark:text-gray-400"
          >
            N/A
          </span>
        </div>
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
