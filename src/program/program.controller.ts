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
import { UpdateProgramDto } from './dto/update-program.dto'
import { ProgramService } from './program.service'

@Controller('programs')
export class ProgramController {
	constructor(private readonly ProgramService: ProgramService) {}

	@Get()
	async getAll() {
		return this.ProgramService.getAll()
	}

	@Get('/by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.ProgramService.getBySlug(slug)
	}

	// Admin
	@Get('/:id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id') _id: Types.ObjectId) {
		return this.ProgramService.getById(_id)
	}

	@Post('/create')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async create() {
		return this.ProgramService.create()
	}

	@Put('/:id')
	@UseGuards(new AdminGuard())
	async update(
		@Param('id') _id: Types.ObjectId,
		@Body() dto: UpdateProgramDto
	) {
		return this.ProgramService.update(_id, dto)
	}

	@Delete('/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async delete(@Param('id') _id: Types.ObjectId) {
		return this.ProgramService.delete(_id)
	}
}
