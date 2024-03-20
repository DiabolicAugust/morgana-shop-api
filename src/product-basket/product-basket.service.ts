import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  ProductBasket,
  ProductBasketDocument,
  ProductBasketPopulateOptionsProducts,
} from "./models/product-basket.model.js";
import { Document, Model } from "mongoose";
import { ProductService } from "../product/product.service.js";
import { Models, Strings } from "../data/strings.js";

@Injectable()
export class ProductBasketService {
  constructor(
    @InjectModel(ProductBasket.name)
    private readonly basketModel: Model<ProductBasketDocument>,
    private readonly productService: ProductService,
  ) {}

  async addProduct(basketId: string, productId: string) {
    const basket = await this.basketModel
      .findById(basketId)
      .populate(ProductBasketPopulateOptionsProducts);

    if (!basket) {
      throw new HttpException(
        Strings.objectNotFoundById(Models.ProductBasket, basketId),
        HttpStatus.BAD_REQUEST,
      );
    }

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
          Strings.objectNotFoundById(Models.Product, productId),
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    basket.markModified("products");
    await basket.save();
    return basket;
  }

  async increaseProductCount(basketId: string, productId: string) {
    const basket = await this.basketModel.findById(basketId);
    if (!basket)
      throw new HttpException(
        Strings.objectNotFoundById(Models.ProductBasket, basketId),
        HttpStatus.BAD_REQUEST,
      );

    const productIndex = basket.products.findIndex(
      (p) => p.productId.id.toString() === productId.toString(),
    );

    if (productIndex > -1) {
      basket.products[productIndex].count += 1;
    } else {
      return this.addProduct(basketId, productId);
    }

    basket.markModified("products");
    await basket.save();
    return basket;
  }

  async deleteProduct(basketId: string, prodId: string) {
    const basket = await this.basketModel
      .findById(basketId)
      .populate(ProductBasketPopulateOptionsProducts);
    const productIndex = basket.products.findIndex(
      (p) => p.productId.id.toString() === prodId.toString(),
    );

    if (productIndex > -1) {
      basket.products.splice(productIndex, 1);
      await basket.save();
      return basket;
    } else {
      throw new HttpException(
        Strings.basketDoesntContainProduct(prodId),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async decreaseProductCount(basketId: string, productId: string) {
    const basket = await this.basketModel
      .findById(basketId)
      .populate(ProductBasketPopulateOptionsProducts);

    if (!basket)
      throw new HttpException(
        Strings.objectNotFoundById(Models.ProductBasket, basketId),
        HttpStatus.BAD_REQUEST,
      );

    const productIndex = basket.products.findIndex(
      (p) => p.productId.id.toString() === productId.toString(),
    );

    if (productIndex > -1) {
      if (basket.products[productIndex].count == 1) {
        return this.deleteProduct(basketId, productId);
      } else {
        basket.products[productIndex].count -= 1;
      }
    } else {
      throw new HttpException(
        Strings.basketDoesntContainProduct(productId),
        HttpStatus.BAD_REQUEST,
      );
    }

    basket.markModified("products");
    await basket.save();
    return basket;
  }

  async getBasket(id: string) {
    const basket = await this.basketModel.findById(id);
    if (!basket)
      throw new HttpException(
        Strings.objectNotFoundById(Models.ProductBasket, id),
        HttpStatus.BAD_REQUEST,
      );
    return basket.populate(ProductBasketPopulateOptionsProducts);
  }

  async createBasket(user_id: string): Promise<ProductBasket> {
    const basket = await this.basketModel.create({
      user_id: user_id,
    });
    if (!basket) {
      throw new HttpException(
        Strings.somthingWentWrong,
        HttpStatus.BAD_GATEWAY,
      );
    }
    return basket.save();
  }
}
