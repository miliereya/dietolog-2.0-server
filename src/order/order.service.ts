import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { LanguageType } from 'src/config/interfaces'
import emailService from 'src/email/email.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { getOrderConfirmationText } from './order.data'
import { OrderModel } from './order.model'

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(OrderModel)
		private readonly OrderModel: ModelType<OrderModel>
	) {}

	async create(dto: CreateOrderDto, language: LanguageType) {
		let newOrder = new this.OrderModel(dto)
		await newOrder.save()
		const { theme, text } = getOrderConfirmationText(language, dto.name)
		emailService.confirmation(dto.email, theme, text)
		emailService.adminAlert('Заказ программы')
	}

	// Admin
	async getAllConfirmed() {
		return this.OrderModel.find({ isConfirmed: true }).exec()
	}

	async getAllNotConfirmed() {
		return this.OrderModel.find({ isConfirmed: false }).exec()
	}

	async getById(_id: Types.ObjectId) {
		return this.OrderModel.findById(_id).exec()
	}

	async confirm(_id: Types.ObjectId) {
		await this.OrderModel.findByIdAndUpdate(_id, {
			isConfirmed: true,
		}).exec()
	}

	async delete(_id: Types.ObjectId) {
		await this.OrderModel.findByIdAndDelete(_id)
	}
}
