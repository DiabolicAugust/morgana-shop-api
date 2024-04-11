import { IsNotEmpty, IsString } from "class-validator";
import { Fields, Strings } from "../../data/strings";

export class CreateCategoryDto {
  @IsString({ message: Strings.fieldMustBeString(Fields.Title) })
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.Title) })
  title: string;
}
