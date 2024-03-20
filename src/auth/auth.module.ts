import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "src/services/jwt-service";
import { UserService } from "src/user/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/models/user.model";
import { HashService } from "src/services/hash-service";
import { ProductBasketService } from "src/product-basket/product-basket.service";
import {
  ProductBasket,
  ProductBasketSchema,
} from "src/product-basket/models/product-basket.model";
import { ProductService } from "src/product/product.service";
import { Product, ProductSchema } from "src/product/models/product.model";

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    HashService,
    ProductBasketService,
    ProductService,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: ProductBasket.name,
        schema: ProductBasketSchema,
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
export class AuthModule {}
