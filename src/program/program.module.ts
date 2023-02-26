import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ProgramController } from './program.controller'
import { ProgramModel } from './program.model'
import { ProgramService } from './program.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProgramModel,
				schemaOptions: {
					collection: 'programs',
				},
			},
		]),
	],
	controllers: [ProgramController],
	providers: [ProgramService],
})
export class ProgramModule {}
