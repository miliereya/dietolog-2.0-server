import { IsArray, IsObject, IsString } from 'class-validator'
import { LanguagedString } from 'src/config/interfaces'

export class UpdateConsultationDto {
	@IsObject()
	title: LanguagedString

	@IsObject()
	type: LanguagedString

	@IsArray()
	options: LanguagedString[]

	@IsString()
	price: string
}
