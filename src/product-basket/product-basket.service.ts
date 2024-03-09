import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ProductBasket,
  ProductBasketDocument,
} from "./models/product-basket.model.js";
import { Model } from "mongoose";
import { ProductService } from "../product/product.service.js";

@Injectable()
export class ProductBasketService {
  constructor(
    @InjectModel(ProductBasket.name)
    private readonly basketModel: Model<ProductBasketDocument>,
    private readonly productService: ProductService,
  ) {}

  async addProduct(basketId: string, productId: string) {
    const basket = await this.basketModel.findById(basketId);
    const productIndex = basket.products.findIndex(
      (p) => p.productId.toString() === productId.toString(),
    );
    if (productIndex > -1) {
      basket.products[productIndex].count += 1;
    } else {
      const product = await this.productService.getProduct(productId);
      if (product) {
        basket.products.push({ productId: product, count: 1 });
      } else {
        throw new HttpException(
          "No product with this id",
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    basket.markModified("products");
    await basket.save();
  }
}
