import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { ProductBasketService } from "./product-basket.service";
import { ErrorsCatchingFilter } from "../services/filters/error-catching.filter";
import { AuthGuard } from "../guards/auth-guard";
import { UserPayload } from "src/user/dto/user-payload";

@Controller("product-basket")
export class ProductBasketController {
  constructor(private readonly basketService: ProductBasketService) {}

  @Patch(":basketId/addProduct/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async addProduct(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,

    @Request() req,
  ) {
    const payload: UserPayload = req.payload;
    return this.basketService.addProduct(basketId, productId, payload);
  }

  @Patch(":basketId/increaseProductCount/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async increaseProductCount(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,
    @Request() req,
  ) {
    const payload: UserPayload = req.payload;
    return this.basketService.increaseProductCount(
      basketId,
      productId,
      payload,
    );
  }

  @Patch(":basketId/decreaseProductCount/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async decreaseProductCount(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,

    @Request() req,
  ) {
    const payload: UserPayload = req.payload;
    return this.basketService.decreaseProductCount(
      basketId,
      productId,
      payload,
    );
  }

  @Delete(":basketId/deleteProduct/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async deleteProduct(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,

    @Request() req,
  ) {
    const payload: UserPayload = req.payload;
    return this.basketService.deleteProduct(basketId, productId, payload);
  }

  @Get(":basketId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async getBasket(@Param("basketId") basketId: string) {
    return this.basketService.getBasket(basketId);
  }
}
