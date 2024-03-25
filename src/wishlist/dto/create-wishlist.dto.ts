import { IsNotEmpty } from "class-validator";
import { Fields, Strings } from "src/data/strings";

export class CreateWishlistDto {
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.Title) })
  title: string;
}

export const DefaultWishlist: CreateWishlistDto = {
  title: "Default",
};
