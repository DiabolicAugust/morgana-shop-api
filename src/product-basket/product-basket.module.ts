import { Module } from "@nestjs/common";
import { ProductBasketController } from "./product-basket.controller";
import { ProductBasketService } from "./product-basket.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ProductBasket,
  ProductBasketSchema,
} from "./models/product-basket.model.js";
import { ProductService } from "../product/product.service.js";
import { Product, ProductSchema } from "../product/models/product.model.js";
import { JwtService } from "../services/jwt-service";
import { PayloadAuthService } from "../services/payload-auth-service";

@Module({
  controllers: [ProductBasketController],
  providers: [
    ProductBasketService,
    ProductService,
    JwtService,
    PayloadAuthService,
  ],
  imports: [
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
export class ProductBasketModule {}
