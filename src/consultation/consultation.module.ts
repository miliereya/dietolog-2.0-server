import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConsultationController } from './consultation.controller';
import { ConsultationModel } from './consultation.model';
import { ConsultationService } from './consultation.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ConsultationModel,
				schemaOptions: {
					collection: 'programs',
				},
			},
		]),
	],
	controllers: [ConsultationController],
	providers: [ConsultationService],
})
export class ConsultationModule {}
