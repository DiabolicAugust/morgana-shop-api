import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { AuthGuard } from "src/guards/auth-guard";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Patch("update/:id")
  //   @UseGuards(AuthGuard)
  async create(@Body() dto: CreateWishlistDto, @Param("id") id: string) {
    return this.wishlistService.updateWishlist(dto, id);
  }
}
