import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AdminHash } from 'src/config/constants'

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		if (request.headers.hash !== AdminHash)
			throw new ForbiddenException('You have no rights')

		return request
	}
}
