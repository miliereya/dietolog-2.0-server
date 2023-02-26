export interface LanguagedString {
	ru: string
	ua: string
	en: string
}

export type LanguageType = 'ru' | 'ua' | 'en'

export interface EmailProps {
	theme: string
	text: string
}
