import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./models/product.model";
import { Document, Model } from "mongoose";
import { CreateProductDto } from "./create-product.dto.js";
import { Models, Strings } from "src/data/strings";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async addProduct(dto: CreateProductDto) {
    return await this.productModel.create(dto);
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (!product)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Product, id),
        HttpStatus.BAD_REQUEST,
      );
    return product;
  }

  async getProducts() {
    return this.productModel.find();
  }

  async deleteProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Product, id),
        HttpStatus.BAD_REQUEST,
      );

    return product;
  }

  async update(id: string, dto: CreateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!product)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Product, id),
        HttpStatus.BAD_REQUEST,
      );

    return product;
  }
}
