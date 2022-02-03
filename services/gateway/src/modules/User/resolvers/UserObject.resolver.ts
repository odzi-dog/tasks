import { UserObject } from '@app/objects';
import { Resolver } from '@nestjs/graphql';

// @resolver UserObject
// - Resolves all UserObject fields
@Resolver(of => UserObject)
export class UserObjectResolver {
  constructor() {}
};