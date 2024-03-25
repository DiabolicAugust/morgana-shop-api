import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { WishlistService } from "./wishlist.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { AuthGuard } from "src/guards/auth-guard";
import { UserPayload } from "src/user/dto/user-payload";
import { ErrorsCatchingFilter } from "src/services/filters/error-catching.filter";

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
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard)
  @UseFilters(new ErrorsCatchingFilter())
  async create(
    @Body() dto: CreateWishlistDto,
    @Param("id") id: string,
    @Request() req,
  ) {
    const payload: UserPayload = req.payload;
    return this.wishlistService.updateWishlist(dto, id, payload);
  }

  @Patch(":wishlistId/add/:productId")
  @UseGuards(AuthGuard)
  @UseFilters(new ErrorsCatchingFilter())
  async addProduct(
    @Param("wishlistId") wishlistId: string,
    @Param("productId") productId: string,
    @Request() req,
  ) {
    const payload: UserPayload = req.payload;
    return this.wishlistService.addProduct(productId, wishlistId, payload);
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
