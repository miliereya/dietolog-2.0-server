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
import { UpdatePackageDto } from './dto/update-package.dto'
import { PackageService } from './package.service'

@Controller('packages')
export class PackageController {
	constructor(private readonly PackageService: PackageService) {}

	@Get()
	async getAll() {
		return this.PackageService.getAll()
	}

	// Admin
	@Get(':id')
	@UseGuards(new AdminGuard())
	async getById(@Param('id') _id: Types.ObjectId) {
		return this.PackageService.getById(_id)
	}

	@Post('/create')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async create() {
		return this.PackageService.create()
	}

	@Put(':id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async update(
		@Param('id') _id: Types.ObjectId,
		@Body() dto: UpdatePackageDto
	) {
		return this.PackageService.update(_id, dto)
	}

	@Delete(':id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async delete(@Param('id') _id: Types.ObjectId) {
		return this.PackageService.delete(_id)
	}
}
