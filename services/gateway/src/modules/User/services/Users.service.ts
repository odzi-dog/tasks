import { BackendConnectionService } from '@app/modules/BackendConnection/services';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IUser, EBackendRequests, IFetchOneUserRequest, CreateUserDTO, ICreateUserRequest } from '@shared/types';

// @service Users
// - All user's related methods (create, update, fetchOne,
// fetchMany, etc.)
@Injectable()
export class UsersService {
  constructor(
    private readonly connection: BackendConnectionService,
  ) {}

  // @method fetchOne
  public fetchOne(request: IFetchOneUserRequest): Observable<IUser | null> {
    return this.connection.client.send(
      EBackendRequests.FETCH_ONE_USER,
      <IFetchOneUserRequest>{ ...request }
    );
  };

  // @method create
  public create(user: CreateUserDTO): Observable<IUser> {
    return this.connection.client.send(
      EBackendRequests.CREATE_USER,
      <ICreateUserRequest>{ ...user },
    );
  };
};