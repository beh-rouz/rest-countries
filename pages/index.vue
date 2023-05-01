<template>
	<div class="py-8 grid grid-cols-4 gap-[74px]">
		<CountryCard
			v-for="item in countries"
			:key="item.name.official"
			:country="item"
		/>
	</div>
</template>

<script lang="ts" setup>
import { Country } from '@/interfaces/country'

const { data: countries } = await useFetch<Country[]>(
	'https://restcountries.com/v3.1/all',
	{
		params: { fields: ['name', 'flags', 'population', 'region', 'capital'] },
	}
)
</script>
