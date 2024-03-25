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
import { UserPayload } from "src/user/dto/user-payload";
import { PayloadAuthService } from "src/services/payload-auth-service";

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private readonly wishlistModel: Model<WishlistDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly payloadService: PayloadAuthService,
  ) {}
  async createWishlist(dto: CreateWishlistDto, user_id: string) {
    const wishlist = await this.wishlistModel.create({
      user_id: user_id,
      ...dto,
    });
    await wishlist.save();
    return wishlist;
  }

  async updateWishlist(
    dto: CreateWishlistDto,
    id: string,
    payload: UserPayload,
  ) {
    const wishlist = await this.wishlistModel.findById(id);

    this.payloadService.authenticateUserPermission(
      payload,
      wishlist.user_id.toString(),
    );

    await wishlist.updateOne(dto, { new: true });

    if (!wishlist) {
      throw new HttpException(
        Strings.objectNotFoundById(Models.Wishlist, id),
        HttpStatus.BAD_REQUEST,
      );
    }

    return wishlist;
  }

  async addProduct(
    productId: string,
    wishlistId: string,
    payload: UserPayload,
  ) {
    const product = await this.productModel.findById(productId);
    if (!product)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Product, productId),
        HttpStatus.BAD_REQUEST,
      );

    const wishlist = await this.getWishlist(wishlistId);

    this.payloadService.authenticateUserPermission(
      payload,
      wishlist.user_id.toString(),
    );

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

  async deleteProduct(productId: string, wishlistId: string) {
    const product = await this.productModel.findById(productId);
    if (!product)
      throw new HttpException(
        Strings.objectNotFoundById(Models.Product, productId),
        HttpStatus.BAD_REQUEST,
      );
    const wishlist = await this.getWishlist(wishlistId);

    const productIndex = wishlist.products.findIndex(
      (val) => val.id.toString() === productId.toString(),
    );
    if (productIndex < -1) {
      throw new HttpException(
        Strings.yourModelDoesntContainObject(Models.Wishlist, Models.Product),
        HttpStatus.BAD_REQUEST,
      );
    }

    wishlist.products.splice(productIndex, 1);

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
