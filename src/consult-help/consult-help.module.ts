import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConsultHelpController } from './consult-help.controller';
import { ConsultHelpModel } from './consult-help.model';
import { ConsultHelpService } from './consult-help.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ConsultHelpModel,
				schemaOptions: {
					collection: 'consult-help-records',
				},
			},
		]),
	],
	controllers: [ConsultHelpController],
	providers: [ConsultHelpService],
})
export class ConsultHelpModule {}
