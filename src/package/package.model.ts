import { prop } from '@typegoose/typegoose'
import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { LanguagedString } from 'src/config/interfaces'
import { IPackageService } from './package.interface'

export interface PackageModel extends Base {}

export class PackageModel {
	@prop()
	title: LanguagedString

	@prop()
	description: LanguagedString

	@prop()
	heading_1: LanguagedString

	@prop()
	heading_2: LanguagedString

	@prop()
	sub_heading_1: LanguagedString

	@prop()
	sub_heading_2: LanguagedString

	@prop()
	services: IPackageService[]
}
