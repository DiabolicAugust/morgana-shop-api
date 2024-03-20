import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { ProductBasketModule } from "./product-basket/product-basket.module";
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {},
    }),

    MongooseModule.forRoot(process.env.MONGO_URL),

    ProductModule,

    UserModule,

    AuthModule,

    ProductBasketModule,

    WishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
