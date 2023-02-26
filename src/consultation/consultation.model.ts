import { prop } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { LanguagedString } from 'src/config/interfaces'

export interface ConsultationModel extends Base {}

export class ConsultationModel {
	@prop()
	title: LanguagedString

	@prop()
	type: LanguagedString

	@prop()
	options: LanguagedString[]

    @prop()
    price: string
}
