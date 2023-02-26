import { IsString } from "class-validator";

export class CreateRecordDto {
	@IsString()
	name: string

	@IsString()
	phone: string

	@IsString()
	email: string
}