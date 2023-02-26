import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { AdminAuthService } from './admin-auth.service'
import { LoginDto } from './dto/login.dto'
import { AdminGuard } from './guards/admin.guard'

@Controller('admin-auth')
export class AdminAuthController {
	constructor(private readonly AdminAuthService: AdminAuthService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async login(@Body() dto: LoginDto) {
		return this.AdminAuthService.login(dto)
	}

	// Simple guard check
	@UseGuards(new AdminGuard())
	@Get('/check')
	@HttpCode(200)
	async check() {
		return
	}
}
