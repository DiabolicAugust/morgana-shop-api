import { Body, Controller, Param, Patch } from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Patch("update/:id")
  //   @UseGuards(AuthGuard)
  async create(@Body() dto: CreateWishlistDto, @Param("id") id: string) {
    return this.wishlistService.updateWishlist(dto, id);
  }
}
