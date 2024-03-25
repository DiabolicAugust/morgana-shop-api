import { Module } from "@nestjs/common";
import { WishlistController } from "./wishlist.controller";
import { WishlistService } from "./wishlist.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Wishlist, WishlistSchema } from "./models/wishlist.model";
import { JwtService } from "../services/jwt-service";
import { Product, ProductSchema } from "src/product/models/product.model";

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, JwtService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Wishlist.name,
        schema: WishlistSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
})
export class WishlistModule {}
