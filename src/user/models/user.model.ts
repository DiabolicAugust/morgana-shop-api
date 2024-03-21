import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Schema as MSchema } from "mongoose";
import { ProductBasket } from "../../product-basket/models/product-basket.model.js";
import { Wishlist } from "../../wishlist/models/wishlist.model.js";

export const enum Roles {
  Admin = "Admin",
  User = "User",
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: Roles.User })
  role: string;
  @Prop({ type: Types.ObjectId, ref: ProductBasket.name })
  basket_id: ProductBasket;

  createdAt: string;
  updatedAt: string;
  id: string;

  getWithoutPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const user = this as UserDocument;

      await this.model("Wishlist").deleteMany({ user_id: user.id });

      await this.model("ProductBasket").findOneAndDelete({
        _id: user.basket_id,
      });

      next();
    } catch (error) {
      next(error);
    }
  },
);

UserSchema.methods.getWithoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
