import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface ConsultHelpModel extends Base {}

export class ConsultHelpModel extends TimeStamps {
	@prop()
	name: string

	@prop()
	phone: string

	@prop()
	email: string

	@prop()
	description: string

	@prop({ default: false })
	isConfirmed: boolean
}
