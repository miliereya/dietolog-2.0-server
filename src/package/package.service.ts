import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdatePackageDto } from './dto/update-package.dto'
import { defaultPackage } from './package.default'
import { PackageModel } from './package.model'

@Injectable()
export class PackageService {
	constructor(
		@InjectModel(PackageModel)
		private readonly PackageModel: ModelType<PackageModel>
	) {}

	async getAll() {
		return this.PackageModel.find().exec()
	}

	// Admin
	async getById(_id: Types.ObjectId) {
		let _package = await this.PackageModel.findById(_id)
		if (!_package) throw new NotFoundException('Package not found')

		return _package
	}

	async create() {
		let empty_package = await this.PackageModel.findOne({
			title: {
				ru: '',
				ua: '',
				en: '',
			},
		})
		if (empty_package)
			throw new BadRequestException('Empty package already exists')

		let _package = new this.PackageModel(defaultPackage)
		await _package.save()
	}

	async update(_id: Types.ObjectId, dto: UpdatePackageDto) {
		await this.PackageModel.findByIdAndUpdate(_id, dto).exec()
	}

	async delete(_id: Types.ObjectId) {
		await this.PackageModel.findByIdAndDelete(_id)
	}
}
