import { IsObject, IsString } from 'class-validator'
import { LanguagedString } from 'src/config/interfaces'

export class updateCertificateDto {
	title: LanguagedString

	@IsString()
	link: string

	@IsString()
	preview: string
}
