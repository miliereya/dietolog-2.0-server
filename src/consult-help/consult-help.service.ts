import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { LanguageType } from 'src/config/interfaces'
import emailService from 'src/email/email.service'
import { getConsultHelpConfirmationText } from './consult-help.data'
import { ConsultHelpModel } from './consult-help.model'
import { CreateConsultHelpDto } from './dto/create-consult-help.dto'

@Injectable()
export class ConsultHelpService {
	constructor(
		@InjectModel(ConsultHelpModel)
		private readonly ConsultHelpModel: ModelType<ConsultHelpModel>
	) {}

	async create(dto: CreateConsultHelpDto, language: LanguageType) {
		const newConsultHelp = new this.ConsultHelpModel(dto)
		await newConsultHelp.save()
		const { theme, text } = getConsultHelpConfirmationText(language)
		emailService.confirmation(dto.email, theme, text)
		emailService.adminAlert('Заказ на помощь в выборе консультации')
	}

	// Admin
	async getById(_id: Types.ObjectId) {
		let consultHelp = await this.ConsultHelpModel.findById(_id).exec()
		if (!consultHelp)
			throw new NotFoundException('Help consult consultHelp not found')

		return consultHelp
	}

	async getAllConfirmed() {
		return this.ConsultHelpModel.find({ isConfirmed: true })
			.sort({ date: -1 })
			.exec()
	}

	async getAllNotConfirmed() {
		return this.ConsultHelpModel.find({ isConfirmed: false })
			.sort({ date: -1 })
			.exec()
	}

	async toggleConfirmation(_id: Types.ObjectId) {
		const consultHelp = await this.ConsultHelpModel.findById(_id)
		if (!consultHelp) throw new NotFoundException('Record not found')

		consultHelp.isConfirmed = !consultHelp.isConfirmed
		await consultHelp.save()
	}

	async delete(_id: string) {
		const consultHelp = await this.ConsultHelpModel.findById(_id)
		if (!consultHelp) throw new NotFoundException('Record not found')

		await consultHelp.deleteOne()
	}
}
