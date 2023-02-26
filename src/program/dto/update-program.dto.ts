import { IsArray, IsNumber, IsObject, IsString } from 'class-validator'
import { LanguagedString } from 'src/config/interfaces'
import { IProgramRadio } from '../program.interface'

export class UpdateProgramDto {
	@IsObject()
	title: LanguagedString

	@IsString()
	slug: string

	@IsNumber()
	price: number

	@IsString()
	photo: string

	@IsString()
	photo_small: string

	@IsObject()
	description: LanguagedString

	@IsObject()
	description_short: LanguagedString

	@IsArray()
	included: LanguagedString[]

	@IsArray()
	radios: IProgramRadio[]
}
