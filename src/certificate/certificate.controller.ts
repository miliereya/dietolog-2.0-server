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
} from '@nestjs/common'
import { Types } from 'mongoose'
import { AdminGuard } from 'src/admin-auth/guards/admin.guard'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { CertificateService } from './certificate.service'
import { updateCertificateDto } from './dto/update-certificate.dto'

@Controller('certificates')
export class CertificateController {
	constructor(private readonly CertificateService: CertificateService) {}

	@Get()
	async getAll() {
		return await this.CertificateService.getAll()
	}

	//Admin
	@Get('/:id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id') _id: Types.ObjectId) {
		return await this.CertificateService.getById(_id)
	}

	@Post('/create')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async create() {
		return await this.CertificateService.create()
	}

	@Put('/:id')
	@UseGuards(new AdminGuard())
	async update(
		@Param('id', IdValidationPipe) _id: Types.ObjectId,
		@Body() dto: updateCertificateDto
	) {
		return await this.CertificateService.update(_id, dto)
	}

	@Delete('/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async delete(@Param('id', IdValidationPipe) _id: Types.ObjectId) {
		return await this.CertificateService.delete(_id)
	}
}
