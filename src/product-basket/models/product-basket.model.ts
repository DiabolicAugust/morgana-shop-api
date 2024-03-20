import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema, Types } from "mongoose";
import { User } from "../../user/models/user.model.js";
import { Product } from "../../product/models/product.model.js";

export type ProductBasketDocument = HydratedDocument<ProductBasket>;

@Schema({ timestamps: true })
export class ProductBasket {
  @Prop({ type: MSchema.Types.ObjectId, ref: "User" })
  user_id: User;

  @Prop([
    {
      productId: { type: MSchema.Types.ObjectId, ref: Product.name },
      count: Number,
    },
  ])
  products: { productId: Product; count: number }[];

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: String })
  id: string;
}

export const ProductBasketSchema = SchemaFactory.createForClass(ProductBasket);

export const ProductBasketPopulateOptionsProducts = {
  path: "products",
  populate: {
    path: "productId",
    model: "Product",
  },
};
