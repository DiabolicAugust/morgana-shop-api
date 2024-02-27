import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  title: string;

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
  count: number;

  createdAt: string;
  updatedAt: string;
  id: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
