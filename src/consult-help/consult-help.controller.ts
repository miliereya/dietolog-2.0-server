import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	HttpCode,
	Param,
	Post,
	Put,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { AdminGuard } from 'src/admin-auth/guards/admin.guard'
import { LanguageType } from 'src/config/interfaces'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { ConsultHelpService } from './consult-help.service'
import { CreateConsultHelpDto } from './dto/create-consult-help.dto'

@Controller('consult-help')
export class ConsultHelpController {
	constructor(private readonly ConsultHelpService: ConsultHelpService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('create')
	async create(
		@Headers('language') language: LanguageType,
		@Body() dto: CreateConsultHelpDto
	) {
		return this.ConsultHelpService.create(dto, language)
	}

	//Admin
	@Get('confirmed')
	@UseGuards(new AdminGuard())
	async getAllConfirmed() {
		return this.ConsultHelpService.getAllConfirmed()
	}

	@Get('not-confirmed')
	@UseGuards(new AdminGuard())
	async getAllNotConfirmed() {
		return this.ConsultHelpService.getAllNotConfirmed()
	}

	@Get(':id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id', IdValidationPipe) _id: Types.ObjectId) {
		return this.ConsultHelpService.getById(_id)
	}

	@Put('toggle-confirmation/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async updateCountOpened(@Param('id') _id: Types.ObjectId) {
		return this.ConsultHelpService.toggleConfirmation(_id)
	}

	@Delete(':id')
	@HttpCode(200)
	@UseGuards(new AdminGuard())
	async delete(@Param('id', IdValidationPipe) _id: string): Promise<void> {
		return this.ConsultHelpService.delete(_id)
	}
}
