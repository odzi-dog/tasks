import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices'
import { EBackendRequests, IFetchOneUserRequest, ICreateUserRequest } from '@shared/types';
import { UsersService } from '../services';
import { Types } from 'mongoose';
import { UserDocument } from '@app/models';
import { request, gql } from 'graphql-request';

// @controller UsersListener
// - FETCH_ONE_USER, CREATE_USER
@Controller()
export class UsersListener {
  constructor(
    private readonly UsersService: UsersService,
  ) {}
  
  // @event FETCH_ONE_USER
  @EventPattern(EBackendRequests.FETCH_ONE_USER)
  public async fetchOne(req: IFetchOneUserRequest) {
    // Determining payload type
    const payload: Partial<{ id: string | Types.ObjectId, email: string, token: string }> = {
      id: null,
      email: null,
      ...req,
    };
    
    // Fetching user email through user-Token
    if (payload.token != null) {
      const query = gql`
        query FetchToken($token: String!) {
          fetchToken(secret: $token) {
            profile {
              email
            }
          }
        }
      `;

      const response = await request(
        'https://api.cloud.odzi.dog/graphql',
        query,
        { token: payload.token },
      );

      payload.email = response?.fetchToken?.profile?.email;
    } else {
      // UserId
      if (payload.id != null) {
        payload.id = new Types.ObjectId(payload.id);
      };
    };

    // Fetching user by userId or email
    const user = (await this.UsersService.fetch({ $or: [ { _id: payload.id }, { email: payload.email } ] }))[0];

    // Checking if this user exists
    if (!user) {
      // Checking if we have user email
      if (payload.email == null) throw new HttpException('Could not create new user', HttpStatus.NOT_FOUND);
    
      // Creating new user
      return await this.UsersService.create({ email: payload.email });
    };

    return user;
  };

  // @event CREATE_USER
  @EventPattern(EBackendRequests.CREATE_USER)
  public async create(request: ICreateUserRequest) {
    // Creating new user
    return await this.UsersService.create(request);
  };
};