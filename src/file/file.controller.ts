import { Controller, Post, ValidationPipe } from '@nestjs/common'
import {
	Delete,
	HttpCode,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from '@nestjs/common/decorators'
import { FileInterceptor } from '@nestjs/platform-express'
import { AdminGuard } from 'src/admin-auth/guards/admin.guard'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(private readonly FileService: FileService) {}

	@UsePipes(new ValidationPipe())
	@Post('upload')
	@HttpCode(200)
	@UseGuards(new AdminGuard())
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder: string
	) {
		return this.FileService.saveFile(file, folder)
	}

	@Delete('delete')
	@HttpCode(200)
	@UseGuards(new AdminGuard())
	async deleteFile(@Query('path') path: string) {
		return this.FileService.deleteFile(path)
	}
}
