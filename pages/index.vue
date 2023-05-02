<template>
  <div class="mb-6 flex">
    <div class="relative w-1/3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a country..."
        class="py-3 pl-12 rounded border-none dark:bg-neutral-800 w-full shadow-md focus:ring-2 focus:ring-blue-800"
      />
      <MagnifyingGlassIcon
        class="w-6 h-6 absolute left-3 top-3 text-neutral-500"
      />
    </div>
    <div class="flex-auto"></div>
    <Menu as="div" class="relative">
      <div>
        <MenuButton
          class="inline-flex w-44 justify-center gap-x-1.5 rounded-md bg-white dark:text-white dark:bg-neutral-800 px-3 py-4 text-sm shadow-md hover:bg-gray-50"
        >
          Filter by region
          <ChevronDownIcon
            class="-mr-2 ml-4 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
          class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-for="item in menuItems" v-slot="{ active }" :key="item">
              <a
                href="#"
                :class="[
                  active
                    ? 'bg-neutral-100 dark:bg-neutral-700'
                    : 'text-neutral-700 dark:text-white',
                  'block px-4 py-2 text-sm'
                ]"
              >
                {{ item }}
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
  <div class="py-8 grid grid-cols-4 gap-[74px]">
    <CountryCard
      v-for="item in filteredCountries"
      :key="item.name.official"
      :country="item"
    />
  </div>
</template>

<script lang="ts" setup>
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { matchSorter } from 'match-sorter'
import { Country } from '@/interfaces/country'

const searchQuery = useDebouncedRef('', 300)
const menuItems = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

const filteredCountries = computed(() => {
  return matchSorter(countries.value!, searchQuery.value, {
    keys: ['name.common']
  })
})

const { data: countries } = await useFetch<Country[]>(
  'https://restcountries.com/v3.1/all',
  {
    params: { fields: ['name', 'flags', 'population', 'region', 'capital'] }
  }
)
</script>
