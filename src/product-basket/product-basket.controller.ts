import {
  Controller,
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
    console.log(productId);
    return this.basketService.addProduct(basketId, productId);
  }
}
