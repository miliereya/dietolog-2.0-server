import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { PackageController } from './package.controller'
import { PackageModel } from './package.model'
import { PackageService } from './package.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: PackageModel,
				schemaOptions: {
					collection: 'packages',
				},
			},
		]),
	],
	controllers: [PackageController],
	providers: [PackageService],
})
export class PackageModule {}
