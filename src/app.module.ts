import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config/dist'
import { TypegooseModule } from 'nestjs-typegoose/dist/typegoose.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getMongoDbConfig } from './config/mongo.config'
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { RecordsModule } from './record/record.module';
import { CertificateModule } from './certificate/certificate.module';
import { FileModule } from './file/file.module';
import { ReviewModule } from './review/review.module';
import { ProgramModule } from './program/program.module';
import { OrderModule } from './order/order.module';
import { ConsultHelpModule } from './consult-help/consult-help.module';
import { ConsultationModule } from './consultation/consultation.module';
import { PackageModule } from './package/package.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoDbConfig,
		}),
		AdminAuthModule,
		RecordsModule,
		CertificateModule,
		FileModule,
		ReviewModule,
		ProgramModule,
		OrderModule,
		ConsultHelpModule,
		ConsultationModule,
		PackageModule,
    
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
