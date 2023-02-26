import { prop } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { LanguagedString } from 'src/config/interfaces'

export interface CertificateModel extends Base {}

export class CertificateModel {
	@prop()
	title: LanguagedString

	@prop({ unique: true })
	link: string

	@prop({ unique: true })
	preview: string
}
