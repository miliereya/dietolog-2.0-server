import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { defaultCertificate } from './certificate.default'
import { CertificateModel } from './certificate.model'
import { updateCertificateDto } from './dto/update-certificate.dto'

@Injectable()
export class CertificateService {
	constructor(
		@InjectModel(CertificateModel)
		private readonly CertificateModel: ModelType<CertificateModel>
	) {}

	async getAll() {
		return this.CertificateModel.find().exec()
	}

	// Admin
	async getById(_id: Types.ObjectId) {
		let certificate = await this.CertificateModel.findById(_id).exec()

		if (!certificate) throw new NotFoundException('Certificate not found')

		return certificate
	}

	async create() {
		let emptyCertificate = await this.CertificateModel.findOne({ link: '' })
		if (emptyCertificate)
			throw new BadRequestException('Empty program already exists')

		let newCertificate = new this.CertificateModel(defaultCertificate)
		await newCertificate.save()
	}

	async update(_id: Types.ObjectId, dto: updateCertificateDto) {
		return this.CertificateModel.findByIdAndUpdate(_id, dto, {
			new: true,
		}).exec()
	}

	async delete(_id: Types.ObjectId) {
		await this.CertificateModel.findByIdAndDelete(_id).exec()
	}
}
