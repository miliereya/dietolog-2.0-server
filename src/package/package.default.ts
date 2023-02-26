import { PackageModel } from './package.model'

export const defaultPackage: Omit<PackageModel, 'id' | '_id'> = {
	title: {
		ru: '',
		ua: '',
		en: '',
	},
	description: {
		ru: '',
		ua: '',
		en: '',
	},
	heading_1: {
		ru: '',
		ua: '',
		en: '',
	},
	heading_2: {
		ru: '',
		ua: '',
		en: '',
	},
	sub_heading_1: {
		ru: '',
		ua: '',
		en: '',
	},
	sub_heading_2: {
		ru: '',
		ua: '',
		en: '',
	},
	services: [],
}
