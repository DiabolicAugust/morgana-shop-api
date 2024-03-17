import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ProductBasket,
  ProductBasketDocument,
} from "./models/product-basket.model.js";
import { Document, Model } from "mongoose";
import { ProductService } from "../product/product.service.js";
import { AuthorizationService } from "src/interfaces/auth.interface.js";

@Injectable()
export class ProductBasketService {
  constructor(
    @InjectModel(ProductBasket.name)
    private readonly basketModel: Model<ProductBasketDocument>,
    private readonly productService: ProductService,
  ) {}

  async addProduct(basketId: string, productId: string) {
    const basket = await this.basketModel.findById(basketId).populate({
      path: "products",
      populate: {
        path: "productId",
        model: "Product",
      },
    });
    const productIndex = basket.products.findIndex(
      (p) => p.productId.id.toString() === productId.toString(),
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
    return basket;
  }

  async createBasket(user_id: string): Promise<ProductBasket> {
    const basket = await this.basketModel.create({
      user_id: user_id,
    });
    if (!basket) {
      throw new HttpException("Something went wrong", HttpStatus.BAD_GATEWAY);
    }
    return basket.save();
  }
}
