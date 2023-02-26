import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AdminAuthService {
	async login(dto: LoginDto) {
		if (
			dto.login === process.env.ADMIN_LOGIN &&
			dto.password === process.env.ADMIN_PASSWORD
		)
			return process.env.ADMIN_HASH

		throw new UnauthorizedException('Invalid login or password')
	}
}
