import { UserObject } from '@app/objects';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services';

// @resolver Users
// - Fetch one or many users
@Resolver(of => UserObject)
export class UsersResolver {
  constructor(
    private readonly service: UsersService,
  ) {}
  
  // @query UserById
  @Query(returns => UserObject, {
    name: 'UserById',
    description: "Fetch user by their's system id"
  })
  public async fetchUserById(
    @Args('id') id: string
  ) {
    return this.service.fetchOne({ id });
  };
};