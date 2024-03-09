import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service.js";
import { CreateProductDto } from "./create-product.dto.js";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  @UsePipes(ValidationPipe)
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }
}
