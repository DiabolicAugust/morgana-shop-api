import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { ProductBasketService } from "./product-basket.service";
import { ErrorsCatchingFilter } from "../services/filters/error-catching.filter";
import { AuthGuard } from "../guards/auth-guard";

@Controller("product-basket")
export class ProductBasketController {
  constructor(private readonly basketService: ProductBasketService) {}

  @Patch(":basketId/addProduct/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async addProduct(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,
  ) {
    return this.basketService.addProduct(basketId, productId);
  }

  @Patch(":basketId/increaseProductCount/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async increaseProductCount(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,
  ) {
    return this.basketService.increaseProductCount(basketId, productId);
  }

  @Patch(":basketId/decreaseProductCount/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async decreaseProductCount(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,
  ) {
    return this.basketService.decreaseProductCount(basketId, productId);
  }

  @Delete(":basketId/deleteProduct/:productId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async deleteProduct(
    @Param("basketId") basketId: string,
    @Param("productId") productId: string,
  ) {
    return this.basketService.deleteProduct(basketId, productId);
  }

  @Get(":basketId")
  @UseFilters(new ErrorsCatchingFilter())
  @UseGuards(AuthGuard)
  async getBasket(@Param("basketId") basketId: string) {
    return this.basketService.getBasket(basketId);
  }
}
