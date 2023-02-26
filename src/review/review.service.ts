import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { CreateReviewDto } from './dto/create-review.dto'
import { ReviewModel } from './review.model'

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly ReviewModel: ModelType<ReviewModel>
	) {}

	async create(dto: CreateReviewDto) {
		let newReview = new this.ReviewModel(dto)
		await newReview.save()
	}

	async getAllApplied() {
		return this.ReviewModel.find({ isApplied: true }).exec()
	}

	// Admin
	async getAllNotApplied() {
		return this.ReviewModel.find({ isApplied: false }).exec()
	}

	async apply(_id: Types.ObjectId) {
		await this.ReviewModel.findByIdAndUpdate(_id, { isApplied: true })
	}

	async delete(_id: Types.ObjectId) {
		await this.ReviewModel.findByIdAndDelete(_id).exec()
	}
}
