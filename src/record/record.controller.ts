import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
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
import { CreateRecordDto } from './dto/create-record.dto'
import { RecordService } from './record.service'

@Controller('records')
export class RecordController {
	constructor(private readonly RecordService: RecordService) {}

	@HttpCode(200)
	@Post('create')
	async create(
		@Headers('language') language: LanguageType,
		@Body() dto: CreateRecordDto
	) {
		return this.RecordService.create(dto, language)
	}

	//Admin
	@Get('confirmed')
	@UseGuards(new AdminGuard())
	async getAllConfirmed() {
		return this.RecordService.getAllConfirmed()
	}

	@Get('not-confirmed')
	@UseGuards(new AdminGuard())
	async getAllNotConfirmed() {
		return this.RecordService.getAllNotConfirmed()
	}

	@Get(':id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id', IdValidationPipe) _id: Types.ObjectId) {
		return this.RecordService.getById(_id)
	}

	@Put('toggle-confirmation/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async updateCountOpened(@Param('id') _id: Types.ObjectId) {
		return this.RecordService.toggleConfirmation(_id)
	}

	@UsePipes(new ValidationPipe())
	@Delete(':id')
	@HttpCode(200)
	@UseGuards(new AdminGuard())
	async delete(@Param('id', IdValidationPipe) _id: string) {
		return this.RecordService.delete(_id)
	}
}
