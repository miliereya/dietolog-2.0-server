import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface RecordModel extends Base {}

export class RecordModel extends TimeStamps {
	@prop()
	name: string

	@prop()
	phone: string

	@prop()
	email: string

	@prop({ default: false })
	isConfirmed: boolean
}
