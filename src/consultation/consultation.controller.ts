import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UseGuards
} from '@nestjs/common'
import { Types } from 'mongoose'
import { AdminGuard } from 'src/admin-auth/guards/admin.guard'
import { ConsultationService } from './consultation.service'
import { UpdateConsultationDto } from './dto/update-consultation.dto'

@Controller('consultations')
export class ConsultationController {
	constructor(private readonly ConsultationService: ConsultationService) {}

	@Get()
	async getAll() {
		return this.ConsultationService.getAll()
	}

	// Admin
	@Get(':id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id') _id: Types.ObjectId) {
		return this.ConsultationService.getById(_id)
	}

	@Post('/create')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async create() {
		return this.ConsultationService.create()
	}

	@Put(':id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async update(
		@Param('id') _id: Types.ObjectId,
		@Body() dto: UpdateConsultationDto
	) {
		return this.ConsultationService.update(_id, dto)
	}

	@Delete(':id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async delete(@Param('id') _id: Types.ObjectId) {
		return this.ConsultationService.delete(_id)
	}
}
