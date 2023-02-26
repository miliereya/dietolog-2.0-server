import { ConsultationModel } from './consultation.model'

export const defaultConsultation: Omit<ConsultationModel, 'id' | '_id'> = {
	title: {
		ru: '',
		ua: '',
		en: '',
	},
	options: [],
	price: '',
	type: {
		ru: '',
		ua: '',
		en: '',
	},
}
