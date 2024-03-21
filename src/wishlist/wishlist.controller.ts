import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { AuthGuard } from "src/guards/auth-guard";

@Controller("wishlist")
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  async createWishlist(@Body() dto: CreateWishlistDto, @Request() req) {
    const user_id = req.payload.id;
    return this.wishlistService.createWishlist(dto, user_id);
  }

  @Patch(":id/update")
  //   @UseGuards(AuthGuard)
  async create(@Body() dto: CreateWishlistDto, @Param("id") id: string) {
    return this.wishlistService.updateWishlist(dto, id);
  }

  @Patch(":wishlistId/add/:productId")
  //   @UseGuards(AuthGuard)
  async addProduct(
    @Param("wishlistId") wishlistId: string,
    @Param("productId") productId: string,
  ) {
    return this.wishlistService.addProduct(productId, wishlistId);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.wishlistService.getWishlist(id);
  }

  @Get("/getByUser/:id")
  async getByUser(@Param("id") id: string) {
    return this.wishlistService.getWishlistsByUserId(id);
  }
}
