import { prop } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { LanguagedString } from 'src/config/interfaces'
import { IProgramRadio } from './program.interface'

export interface ProgramModel extends Base {}

export class ProgramModel {
	@prop()
	title: LanguagedString

	@prop({ unique: true })
	slug: string

	@prop()
	price: number

	@prop()
	photo: string

	@prop()
	photo_small: string

	@prop()
	description: LanguagedString

	@prop()
	description_short: LanguagedString

	@prop()
	included: LanguagedString[]

	@prop()
	radios: IProgramRadio[]
}
