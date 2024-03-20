import { Test, TestingModule } from '@nestjs/testing';
import { ProductBasketController } from './product-basket.controller';

describe('ProductBasketController', () => {
  let controller: ProductBasketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductBasketController],
    }).compile();

    controller = module.get<ProductBasketController>(ProductBasketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
