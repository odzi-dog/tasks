import { Injectable } from '@nestjs/common';
import { IUser } from '@shared/types';
import { firstValueFrom } from 'rxjs';

// Services
import { UsersService } from '@app/modules/User/services';

@Injectable()
export class UserAuthenticationService {
  constructor(
    private readonly UsersService: UsersService,
  ) {}

  // @authenticate
  // - Make a request to cloud.odzi.dog to authenticate
  // this user and identify him/she by his/her email
  public async authenticate(token: string): Promise<IUser> {
    return await firstValueFrom(this.UsersService.fetchOne({ token }), { defaultValue: null });
  };
};