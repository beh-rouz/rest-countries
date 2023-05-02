<template>
  <div class="mb-6 flex">
    <div class="relative w-1/3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a country..."
        class="py-3 pl-12 rounded border-none dark:bg-dark-blue-700 w-full shadow-md"
      />
      <MagnifyingGlassIcon class="w-6 h-6 absolute left-3 top-3" />
    </div>
    <div class="flex-auto"></div>
    <Menu v-model="selectedRegion" as="div" class="relative">
      <div>
        <MenuButton
          class="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white dark:text-white dark:bg-dark-blue-700 px-3 py-4 text-sm shadow-md"
        >
          Filter by region
          <ChevronDownIcon class="-mr-2 ml-4 h-5 w-5" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-dark-blue-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem
              v-for="region in regions"
              v-slot="{ active }"
              :key="region"
            >
              <a
                href="#"
                :class="[
                  active
                    ? 'bg-light-gray dark:bg-dark-blue-800'
                    : 'dark:text-white',
                  'flex px-4 py-2 text-sm items-center'
                ]"
                @click="selectedRegion = region"
              >
                {{ region }}
                <CheckIcon
                  v-if="region === selectedRegion"
                  class="w-4 h-4 ml-auto"
                />
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
  <div
    v-if="filteredCountries?.length > 0"
    class="py-8 grid grid-cols-4 gap-[74px]"
  >
    <CountryCard
      v-for="item in filteredCountries"
      :key="item.name.official"
      :country="item"
    />
  </div>
  <div v-if="filteredCountries?.length == 0" class="py-8 flex items-center">
    <ExclamationTriangleIcon class="w-7 h-7 text-gray-500 mr-2" />
    No country founded given your search query "{{ searchQuery }}" and region
    "{{ selectedRegion }}". Try something else.
  </div>
</template>

<script lang="ts" setup>
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/vue/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { matchSorter } from 'match-sorter'
import { Country } from '@/interfaces/country'

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const route = useRoute()
const router = useRouter()

const selectedRegion = ref(route.query.region ? route.query.region : regions[0])
const searchQuery = useDebouncedRef(
  (route.query.search ? route.query.search : '') as string,
  300
)

watch([searchQuery, selectedRegion], (currentValues) => {
  const [search, region] = currentValues
  router.push({
    path: '/',
    query: { search, region }
  })
})

const filteredCountries = computed(() => {
  const countriesInRegion =
    selectedRegion.value && selectedRegion.value !== 'All'
      ? countries.value!.filter(
          (country) => country.region === selectedRegion.value
        )
      : countries.value

  if (searchQuery.value)
    return matchSorter(countriesInRegion!, searchQuery.value, {
      keys: ['name.common']
    })

  return countriesInRegion
})

const { data: countries } = await useFetch<Country[]>(
  'https://restcountries.com/v3.1/all',
  {
    params: { fields: ['name', 'flags', 'population', 'region', 'capital'] }
  }
)
</script>
