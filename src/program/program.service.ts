import { Injectable, NotFoundException } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { UpdateProgramDto } from './dto/update-program.dto'
import { defaultProgram } from './program.default'
import { ProgramModel } from './program.model'

@Injectable()
export class ProgramService {
	constructor(
		@InjectModel(ProgramModel)
		private readonly ProgramModel: ModelType<ProgramModel>
	) {}

	async getBySlug(slug: string) {
		let program = await this.ProgramModel.findOne({ slug })
		if (!program) throw new NotFoundException('Program not found')

		return program
	}

	async getAll() {
		return this.ProgramModel.find().exec()
	}

	// Admin
	async create() {
		let emptyProgram = await this.ProgramModel.findOne({ slug: '' })
		if (emptyProgram)
			throw new NotFoundException('Empty program already exists')

		let newProgram = new this.ProgramModel(defaultProgram)
		await newProgram.save()
	}

	async getById(_id: Types.ObjectId) {
		let program = await this.ProgramModel.findById(_id).exec()
		if (!program) throw new NotFoundException('Program not found')

		return program
	}

	async update(_id: Types.ObjectId, dto: UpdateProgramDto) {
		await this.ProgramModel.findByIdAndUpdate(_id, dto).exec()
	}

	async delete(_id: Types.ObjectId) {
		await this.ProgramModel.findByIdAndDelete(_id).exec() 
	}
}
