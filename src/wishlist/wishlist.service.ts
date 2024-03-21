import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  Wishlist,
  WishlistDocument,
  WishlistPopulateConfig,
} from "./models/wishlist.model";
import { Model } from "mongoose";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { Models, Strings } from "src/data/strings";
import { Product, ProductDocument } from "src/product/models/product.model";

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private readonly wishlistModel: Model<WishlistDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async createWishlist(dto: CreateWishlistDto, user_id: string) {
    const wishlist = await this.wishlistModel.create({
      user_id: user_id,
      ...dto,
    });
    await wishlist.save();
    return wishlist;
  }

  async updateWishlist(dto: CreateWishlistDto, id: string) {
    const wishlist = await this.wishlistModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!wishlist) {
      throw new HttpException(
        Strings.objectNotFoundById(Models.Wishlist, id),
        HttpStatus.BAD_REQUEST,
      );
    }

    return wishlist;
  }

  async addProduct(productId: string, wishlistId: string) {
    const product = await this.productModel.findById(productId);
    if (!product)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Product, productId),
        HttpStatus.BAD_REQUEST,
      );

    const wishlist = await this.getWishlist(wishlistId);

    const productIds = wishlist.products.map((product) => product.toString());
    if (
      productIds.includes(productId) ||
      productIds.includes(product.toString())
    ) {
      throw new HttpException(
        Strings.yourModelContainsObject(Models.Wishlist, Models.Product),
        HttpStatus.BAD_REQUEST,
      );
    }

    wishlist.products.push(product);

    await wishlist.save();
    return wishlist.populate("products");
  }

  async getWishlist(id: string) {
    const wishlist = await this.wishlistModel.findById(id);
    if (!wishlist)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Wishlist, id),
        HttpStatus.BAD_REQUEST,
      );

    return wishlist.populate("products");
  }

  async getWishlistsByUserId(userId: string) {
    const wishlists = await this.wishlistModel
      .find({ user_id: userId })
      .populate(WishlistPopulateConfig);

    return wishlists;
  }
}