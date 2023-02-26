import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { CertificateController } from './certificate.controller'
import { CertificateModel } from './certificate.model'
import { CertificateService } from './certificate.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: CertificateModel,
				schemaOptions: {
					collection: 'certificates',
				},
			},
		]),
	],
	controllers: [CertificateController],
	providers: [CertificateService],
})
export class CertificateModule {}
