import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;

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
