import { Test, TestingModule } from "@nestjs/testing";
import { ProductBasketService } from "./product-basket.service";

describe("ProductBasketService", () => {
  let service: ProductBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductBasketService],
    }).compile();

    service = module.get<ProductBasketService>(ProductBasketService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
