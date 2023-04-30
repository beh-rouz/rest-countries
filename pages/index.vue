<template>
    <div class="py-8 grid grid-cols-4 gap-8">
        <div class="bg-white shadow-md rounded text-sm overflow-hidden" 
            v-for="country in countries" :key="country.name.official">
            <img class="w-full aspect-[16/9] object-cover" :src="country.flags.svg" :alt="country.flags.alt">
            <div class="p-4">
                <div class="pb-4 font-semibold">{{  country.name.official }}</div>
                <div>
                    Population:
                    <span class="text-gray-600">{{ country.population }}</span>
                </div>
                <div>
                    Region:
                    <span class="text-gray-600">{{ country.region }}</span>
                </div>
                <div>
                    Capital:
                    <span class="text-gray-600">{{ country.capital?.length > 0 ? country.capital.join(', ') : 'N/A' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { Country } from '~/interfaces/country';

    const { data: countries } = await useFetch<Country[]>('https://restcountries.com/v3.1/all', { 
        params: { fields: ['name' ,'flags', 'population', 'region', 'capital'] }
    });
</script>