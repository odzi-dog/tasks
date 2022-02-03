import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserAuthenticationService } from 'src/modules/Session/services';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class OptionalUserAuthGuard implements CanActivate {
  constructor(
    private readonly authService: UserAuthenticationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Getting HTTP context from GraphQL context
    const ctx = GqlExecutionContext.create(context).getContext();
    const { req } = ctx;

    // Validating user token from session object
    try {
      ctx.user = await this.authService.authenticate(req?.session?.token);
    } catch {};

    return true;
  };
}
