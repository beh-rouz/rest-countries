export enum Region {
	Africa = 'Africa',
	Americas = 'Americas',
	Antarctic = 'Antarctic',
	Asia = 'Asia',
	Europe = 'Europe',
	Oceania = 'Oceania',
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
export interface Country {
	flags: Flags
	name: Name
	capital: string[]
	region: Region
	population: number
}
