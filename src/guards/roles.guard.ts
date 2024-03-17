import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ProductBasketService } from "../product-basket/product-basket.service";
import { UserPayload } from "../user/dto/user-payload";
import { AuthorizationService } from "src/interfaces/auth.interface";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private basketService: ProductBasketService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const decodedToken: UserPayload = request.payload;

    // Use the authorization service to perform the authorization check
    // const isAuthorized = this.basketService.meow();
    // console.log(isAuthorized);

    if (!true) {
      return false;
    }

    return true;
  }
  catch(err) {
    return false;
  }
}
