import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductService } from "./product.service.js";
import { CreateProductDto } from "./create-product.dto.js";
import { ErrorsCatchingFilter } from "../services/filters/error-catching.filter.js";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  @UseFilters(new ErrorsCatchingFilter())
  @UsePipes(ValidationPipe)
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }

  @Get("getAll")
  @UseFilters(new ErrorsCatchingFilter())
  async getProducts() {
    return this.productService.getProducts();
  }
}
