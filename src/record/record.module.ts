import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { RecordController } from './record.controller'
import { RecordModel } from './record.model'
import { RecordService } from './record.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: RecordModel,
				schemaOptions: {
					collection: 'records',
				},
			},
		]),
	],
	controllers: [RecordController],
	providers: [RecordService],
})
export class RecordsModule {}
