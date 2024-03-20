import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Fields, Strings } from "src/data/strings";

export class UpdateUserDto {
  @IsNotEmpty({ message: Strings.fieldCantBeEmpty(Fields.Username) })
  @IsString({ message: Strings.fieldMustBeString(Fields.Username) })
  username: string;
}
