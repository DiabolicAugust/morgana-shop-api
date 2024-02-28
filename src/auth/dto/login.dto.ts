import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Fields, Strings } from "src/data/strings";

export class LoginDto {
  @IsNotEmpty({
    message: Strings.fieldCantBeEmpty(Fields.Email),
  })
  @IsString({
    message: Strings.fieldMustBeString(Fields.Email),
  })
  @IsEmail({}, { message: Strings.incorrectEmailFormat })
  email: string;

  @IsNotEmpty({
    message: Strings.fieldCantBeEmpty(Fields.Password),
  })
  @IsString({
    message: Strings.fieldMustBeString(Fields.Password),
  })
  password: string;
}
