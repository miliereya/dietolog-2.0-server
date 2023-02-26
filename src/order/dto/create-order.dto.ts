import { IsArray, IsString } from 'class-validator'

export class CreateOrderDto {
	@IsString()
	program_title: string

	@IsArray()
	params: { title: string; value: string }[]

	@IsString()
	name: string

	@IsString()
	phone: string

	@IsString()
	email: string
}
