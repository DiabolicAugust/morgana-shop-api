import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  isNumberString,
} from "class-validator";
import { Fields, Strings } from "../../data/strings.js";

export class CreateProductDto {
  @IsString({ message: Strings.fieldMustBeString(Fields.Title) })
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.Title) })
  title: string;

  @IsString({ message: Strings.fieldMustBeString(Fields.Description) })
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.Description) })
  description: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: Strings.fieldMustBeString(Fields.Price) },
  )
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.Price) })
  price: number;

  @IsNotEmpty({
    message: Strings.fieldCantBeEmpty(Fields.category),
  })
  category: string;

  @IsOptional()
  @IsBoolean({ message: Strings.fieldMustBeBoolean(Fields.isOnSale) })
  isOnSale: boolean;

  @IsOptional()
  @IsString({ message: Strings.fieldMustBeNumber(Fields.salePrice) })
  salePrice: number;

  @IsOptional()
  pictures: [string];

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: Strings.fieldMustBeString(Fields.quantity) },
  )
  quantity: number;
}
