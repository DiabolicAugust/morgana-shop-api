import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "src/services/jwt-service";
import { LoginDto } from "./dto/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Roles, User, UserDocument } from "src/user/models/user.model";
import { Model } from "mongoose";
import { HashService } from "src/services/hash-service";
import { UserPayload } from "src/user/dto/user-payload";
import { RegistrationDto } from "./dto/registration.dto";
import { ProductBasketService } from "src/product-basket/product-basket.service";
import { WishlistService } from "src/wishlist/wishlist.service";
import { DefaultWishlist } from "src/wishlist/dto/create-wishlist.dto";
import { Models } from "src/data/strings";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly basketService: ProductBasketService,
    private readonly wishlistService: WishlistService,
    private readonly hashService: HashService,
  ) {}

  async login(dto: LoginDto) {
    const userCheck = await this.userModel
      .findOne({ email: dto.email })
      .populate("basket_id");

    console.log(userCheck);

    if (!userCheck)
      throw new HttpException(
        "There is no user by this email",
        HttpStatus.NOT_FOUND,
      );

    const isPasswordValid = await this.hashService.decryptPassword(
      userCheck.password,
      dto.password,
    );

    if (!isPasswordValid)
      throw new HttpException("Password is invalid!", HttpStatus.BAD_REQUEST);

    const payload: UserPayload = {
      email: userCheck.email,
      id: userCheck.id,
      role: userCheck.role == Roles.Admin ? Roles.Admin : Roles.User,
    };

    console.log(payload);

    const token = this.jwtService.signToken(payload);

    if (!userCheck.basket_id) {
      const basket = await this.basketService.createBasket(userCheck.id);

      userCheck.basket_id = basket;
      await userCheck.save();
    }

    return {
      user: userCheck.getWithoutPassword(),
      token: token,
    };
  }

  async registration(dto: RegistrationDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (user) {
      throw new HttpException(
        "The email is connected to another account!",
        HttpStatus.BAD_REQUEST,
      );
    }
    dto.password = await this.hashService.encryptPassword(dto.password);
    const createdUser = await this.userModel.create(dto);
    const basket = await this.basketService.createBasket(createdUser.id);
    await this.wishlistService.createWishlist(DefaultWishlist, createdUser.id);

    createdUser.basket_id = basket;
    await createdUser.save();

    return createdUser.getWithoutPassword();
  }
}
