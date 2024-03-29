import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./models/user.model";
import { Model } from "mongoose";
import { HashService } from "src/services/hash-service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly hashService: HashService,
  ) {}

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser)
      throw new HttpException(
        "No user found with this id",
        HttpStatus.BAD_REQUEST,
      );

    return deletedUser.getWithoutPassword();
  }
  async updateUser(dto: UpdateUserDto, id: string) {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
    if (!user) {
      throw new HttpException(
        "No user found by this id",
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.getWithoutPassword();
  }
  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new HttpException(
        "No user found by this id",
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.getWithoutPassword();
  }
}
