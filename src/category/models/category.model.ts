import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    unique: true,
  })
  title: string;

  picture: string;

  // id:string
  // createdAt:string
  // updatedAt:string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
