import { LanguagedString } from "src/config/interfaces"

interface IProgramOption {
	answer: LanguagedString
	answer_short: LanguagedString
}

export interface IProgramRadio {
	title: LanguagedString
	title_short: LanguagedString
	options: IProgramOption[]
}
