import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class BackendConnectionService {
  constructor(
    @Inject('BACKEND_CONNECTION')
    public client: ClientProxy,
  ) {}
};