import { IsString } from 'class-validator'

export class CreateConsultHelpDto {
	@IsString()
	name: string

	@IsString()
	phone: string

	@IsString()
	email: string

	@IsString()
	description: string
}
