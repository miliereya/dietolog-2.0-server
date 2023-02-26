import { prop } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export interface OrderModel extends Base {}

export class OrderModel extends TimeStamps {
	@prop()
	program_title: string

	@prop()
	params: { title: string; value: string }[]

	@prop()
	name: string

	@prop()
	phone: string

	@prop()
	email: string

	@prop({ default: false })
	isConfirmed: boolean
}
