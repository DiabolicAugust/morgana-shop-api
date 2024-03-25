import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MSchema } from "mongoose";
import { HydratedDocument } from "mongoose";
import { Models, Strings } from "../../data/strings";
import { Product } from "../../product/models/product.model";
import { User } from "../../user/models/user.model";

export type WishlistDocument = HydratedDocument<Wishlist>;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ type: MSchema.Types.ObjectId, ref: Models.User, required: true })
  user_id: User;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [MSchema.Types.ObjectId], ref: Models.Product, default: [] })
  products: [Product];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);

export const WishlistPopulateConfig = {
  path: "products",
  model: Models.Product,
};
