<template>
	<NuxtLink
		class="block bg-white shadow-md rounded overflow-hidden"
		:to="'country/' + country.name.common"
	>
		<img
			class="w-full aspect-[16/10] object-cover"
			:src="country.flags.svg"
			:alt="country.flags.alt"
		/>
		<div class="p-4">
			<div class="pb-4 font-semibold">{{ country.name.common }}</div>
			<div>
				Population:
				<span class="text-gray-500">{{
					formatNumber(country.population)
				}}</span>
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
	</NuxtLink>
</template>

<script lang="ts" setup>
import { Country } from '@/interfaces/country'
import { formatNumber } from '@/utils/format-number'

const { country } = defineProps<{ country: Country }>()
</script>
