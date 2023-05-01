<template>
	<div v-if="country" class="flex">
		<div class="w-1/2 pr-8">
			<img
				:src="country.flags.svg"
				:alt="country.flags.alt"
				class="w-full aspect-[16/10] object-cover"
			/>
		</div>
		<div class="flex-auto p-8">
			<h1 class="text-3xl font-extrabold">{{ country.name.common }}</h1>
			<div class="text-gray-500">
				<div>
					<span class="font-semibold text-gray-800">Native Name: </span>
					<span v-for="(value, key) in country.name.nativeName" :key="key">
						{{ value.common }} ({{ key }})
					</span>
				</div>
				<div>
					<span class="font-semibold text-gray-800">Population: </span>
					<span>{{ formatPopulation }}</span>
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
	</div>
	<pre class="bg-gray-200 p-2 text-xs my-4">{{ country }}</pre>
</template>

<script lang="ts" setup>
import { Country } from '@/interfaces/country'

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
]

const { data: searchResult } = await useFetch<Country[]>(
	`https://restcountries.com/v3.1/name/${name}`,
	{ params: { fullText: 'true', fields } }
)

const country = searchResult.value ? searchResult.value[0] : null

const formatPopulation = computed(() =>
	new Intl.NumberFormat().format(country?.population || 0)
)
</script>
