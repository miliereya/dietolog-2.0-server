import { ProgramModel } from './program.model'

export const defaultProgram: Omit<ProgramModel, 'id' | '_id'> = {
	title: {
		ru: '',
		ua: '',
		en: '',
	},
	slug: '',
	price: 0,
	photo: '',
	photo_small: '',
	description: {
		ru: '',
		ua: '',
		en: '',
	},
	description_short: {
		ru: '',
		ua: '',
		en: '',
	},
	included: [],
	radios: [],
}
