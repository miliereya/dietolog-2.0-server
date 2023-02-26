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
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { AdminGuard } from 'src/admin-auth/guards/admin.guard'
import { IdValidationPipe } from 'src/pipes/id-validation.pipe'
import { CreateReviewDto } from './dto/create-review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly ReviewService: ReviewService) {}

	@Get()
	async getAllApplied() {
		return this.ReviewService.getAllApplied()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('/create')
	async create(@Body() dto: CreateReviewDto) {
		return this.ReviewService.create(dto)
	}

	//Admin
	@Get('/not-applied')
	@UseGuards(new AdminGuard())
	async getById() {
		return await this.ReviewService.getAllNotApplied()
	}

	@Put('/apply/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async apply(@Param('id', IdValidationPipe) _id: Types.ObjectId) {
		return await this.ReviewService.apply(_id)
	}

	@Delete('/:id')
	@UseGuards(new AdminGuard())
	@HttpCode(200)
	async delete(@Param('id', IdValidationPipe) _id: Types.ObjectId) {
		return await this.ReviewService.delete(_id)
	}
}
