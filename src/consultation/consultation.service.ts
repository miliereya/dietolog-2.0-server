import { Injectable, NotFoundException, Type } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { defaultConsultation } from './consultation.default'
import { ConsultationModel } from './consultation.model'
import { UpdateConsultationDto } from './dto/update-consultation.dto'

@Injectable()
export class ConsultationService {
	constructor(
		@InjectModel(ConsultationModel)
		private readonly ConsultationModel: ModelType<ConsultationModel>
	) {}

	async getAll() {
		return this.ConsultationModel.find().exec()
	}

	// Admin
	async getById(_id: Types.ObjectId) {
		let consultation = await this.ConsultationModel.findById(_id)
		if (!consultation) throw new NotFoundException('Consultation not found')

		return consultation
	}

	async create() {
		let consultation = new this.ConsultationModel(defaultConsultation)
		await consultation.save()
	}

	async update(_id: Types.ObjectId, dto: UpdateConsultationDto) {
		await this.ConsultationModel.findByIdAndUpdate(_id, dto).exec()
	}

	async delete(_id: Types.ObjectId) {
		await this.ConsultationModel.findByIdAndDelete(_id)
	}
}

