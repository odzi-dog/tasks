import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserObject } from '@app/objects'
import { IUser } from '@shared/types';

// Services
import { UserAuthenticationService } from '../services';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { RequiredUserAuthGuard } from '@app/helpers';

// @resolver UserAuthnetication
// - Resolver, that consists of basic authentication
// operations (such as login, logout, change account, etc.)
@Resolver(of => UserObject)
export class UserAuthenticationResolver {
  constructor(
    private readonly service: UserAuthenticationService,
  ) {}

  // @mutation login
  // - Authorize user using cloud.odzi.dog
  // account token.
  @Mutation(returns => UserObject, {
    name: 'Login',
    description: 'Log into tasks.odzi.dog account using odzi.dog account credentials (token)'
  })
  public async loginUser(
    @Args('token', { description: "User token, that is returned by odzi.dog api" }) token: string,
    @Context('req') req: Request,
  ): Promise<IUser> {
    // Trying to authenticate this user
    const user = await this.service.authenticate(token);

    // Saving session and returning UserObject
    req.session.token = token;
    return user;
  };

  // @mutation logout
  // - Just deletes {token} parameter
  // from session object.
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => Boolean, {
    name: 'Logout',
    description: 'Logs out of current account. Always returns true',
  })
  public async logout(
    @Context('req') req: Request,
  ) {
    req.session.token = null;
    return true;
  };
};