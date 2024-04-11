import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./models/category.model";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Models, Strings } from "../data/strings";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreateCategoryDto) {
    return this.categoryModel.create(dto);
  }

  async get(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Category, id),
        HttpStatus.BAD_REQUEST,
      );
    return category;
  }

  async getAll() {
    return this.categoryModel.find();
  }

  async update(dto: CreateCategoryDto, id: string) {
    const category = await this.categoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!category)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Category, id),
        HttpStatus.BAD_REQUEST,
      );
    return category;
  }
}
