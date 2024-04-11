import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MSchema } from "mongoose";
import { HydratedDocument } from "mongoose";
import { Category } from "src/category/models/category.model";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  title: string;

  @Prop({ type: MSchema.Types.ObjectId, ref: Category.name })
  category: Category;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  isOnSale: boolean;

  @Prop()
  salePrice: number;

  @Prop()
  pictures: [string];

  @Prop()
  quantity: number;

  createdAt: string;
  updatedAt: string;
  id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
