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
export class RequiredUserAuthGuard implements CanActivate {
  constructor(
    private readonly authService: UserAuthenticationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Getting HTTP context from GraphQL context
    const ctx = GqlExecutionContext.create(context).getContext();
    const { req } = ctx;

    // Validating user token from session object
    if (!req?.session?.token) throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);

    ctx.user = await this.authService.authenticate(req?.session?.token);
    
    if (!ctx.user) {
      throw new HttpException(
        'Invalid or missing Profile Token',
        HttpStatus.UNAUTHORIZED,
      );
    };
    
    return true;
  };
}
