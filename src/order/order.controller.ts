import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UseGuards,
	Headers,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { AdminGuard } from 'src/admin-auth/guards/admin.guard'
import { LanguageType } from 'src/config/interfaces'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
	constructor(private readonly OrderService: OrderService) {}

	@Post('/create')
	@HttpCode(200)
	async create(
		@Headers('language') language: LanguageType,
		@Body() dto: CreateOrderDto
	): Promise<void> {
		return this.OrderService.create(dto, language)
	}

	// Admin
	@Get('/confirmed')
	@UseGuards(new AdminGuard())
	async getAllConfirmed() {
		return this.OrderService.getAllConfirmed()
	}

	@Get('/not-confirmed')
	@UseGuards(new AdminGuard())
	async getAllNotConfirmed() {
		return this.OrderService.getAllNotConfirmed()
	}

	@Get('/:id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id') _id: Types.ObjectId) {
		return this.OrderService.getById(_id)
	}

	@Put('/confirm/:id')
	@HttpCode(200)
	@UseGuards(new AdminGuard())
	async update(@Param('id') _id: Types.ObjectId) {
		return this.OrderService.confirm(_id)
	}

	@Delete('/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async delete(@Param('id') _id: Types.ObjectId) {
		return this.OrderService.delete(_id)
	}
}
