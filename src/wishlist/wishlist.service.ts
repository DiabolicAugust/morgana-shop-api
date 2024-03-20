import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Wishlist, WishlistDocument } from "./models/wishlist.model";
import { Model } from "mongoose";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name)
    private readonly wishlistModel: Model<WishlistDocument>,
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
      throw new HttpException("Loh", HttpStatus.BAD_REQUEST);
    }

    return wishlist;
  }
}
