import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./models/product.model";
import { Document, Model } from "mongoose";
import { CreateProductDto } from "./create-product.dto.js";

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
        "No product with this id",
        HttpStatus.BAD_REQUEST,
      );
    return product;
  }
}
