import { IsArray, IsObject } from "class-validator"
import { LanguagedString } from "src/config/interfaces"
import { IPackageService } from "../package.interface"

export class UpdatePackageDto {
	@IsObject()
	title: LanguagedString

	@IsObject()
	description: LanguagedString

	@IsObject()
	heading_1: LanguagedString

	@IsObject()
	heading_2: LanguagedString

	@IsObject()
	sub_heading_1: LanguagedString

	@IsObject()
	sub_heading_2: LanguagedString

	@IsArray()
	services: IPackageService[]
}