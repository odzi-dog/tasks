import { RequiredUserAuthGuard } from '@app/helpers';
import { UserObject } from '@app/objects';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context } from '@nestjs/graphql';
import { IUser } from '@shared/types';

// @resolver CurrentUser
// - Everything related to currently logged in user
@Resolver()
export class CurrentUserResolver {
  // @query FetchMe
  // - Return information about currently logged
  // in user (can be null)
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => UserObject, { nullable: true, name: 'Me' })
  public fetchMe(
    @Context('user') user: IUser
  ) {
    return user;
  };
};