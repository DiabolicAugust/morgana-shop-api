import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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

  createdAt: string;
  updatedAt: string;
  id: string;

  getWithoutPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.getWithoutPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};
