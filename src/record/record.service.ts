import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { LanguageType } from 'src/config/interfaces'
import emailService from 'src/email/email.service'
import { CreateRecordDto } from './dto/create-record.dto'
import { getRecordConfirmationText } from './record.data'
import { RecordModel } from './record.model'

@Injectable()
export class RecordService {
	constructor(
		@InjectModel(RecordModel)
		private readonly RecordModel: ModelType<RecordModel>
	) {}

	async create(dto: CreateRecordDto, language: LanguageType) {
		const newRecord = new this.RecordModel(dto)
		await newRecord.save()
		const { theme, text } = getRecordConfirmationText(language)
		emailService.confirmation(dto.email, theme, text)
		emailService.adminAlert('Записать на консультацию')
	}

	// Admin
	async getById(_id: Types.ObjectId) {
		let record = await this.RecordModel.findById(_id).exec()
		if (!record) throw new NotFoundException('Record not found')

		return record
	}

	async getAllConfirmed() {
		return this.RecordModel.find({ isConfirmed: true })
			.sort({ date: -1 })
			.exec()
	}

	async getAllNotConfirmed() {
		return this.RecordModel.find({ isConfirmed: false })
			.sort({ date: -1 })
			.exec()
	}

	async toggleConfirmation(_id: Types.ObjectId) {
		const record = await this.RecordModel.findById(_id)
		if (!record) throw new NotFoundException('Record not found')

		record.isConfirmed = !record.isConfirmed
		await record.save()
	}

	async delete(_id: string) {
		const record = await this.RecordModel.findById(_id)
		if (!record) throw new NotFoundException('Record not found')

		await record.deleteOne()
	}
}
