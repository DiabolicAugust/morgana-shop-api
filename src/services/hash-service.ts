import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }

  async decryptPassword(userPassword: string, clientPassword: string) {
    const isPasswordValid = bcrypt.compare(clientPassword, userPassword);
    if (!isPasswordValid)
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    return isPasswordValid;
  }
}
