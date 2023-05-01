export enum Region {
	Africa = 'Africa',
	Americas = 'Americas',
	Antarctic = 'Antarctic',
	Asia = 'Asia',
	Europe = 'Europe',
	Oceania = 'Oceania'
}
export interface Flags {
	png: string
	svg: string
	alt: string
}

export interface NativeName {
	official: string
	common: string
}

export interface Name {
	common: string
	official: string
	nativeName: Record<string, NativeName>
}

export interface Currency {
	name: string
	symbol: string
}

export interface Country {
	flags: Flags
	name: Name
	capital: string[]
	region: Region
	subregion: string
	tld: string[]
	currencies: Record<string, Currency>
	languages: Record<string, string>
	population: number
	borders: string[]
}
