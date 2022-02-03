import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

// Exporting IRawClient interface
export interface IRawClient {
  id: string,
  socket: Socket,
  uid: string,
};

@Injectable()
export class UpdatesClientsService {
  // clients array
  public clients: Array<IRawClient> = [];

  // method add
  public async add(client: Socket, uid: string) {
    if (!this.clients.find((x) => x.id == client.id)) {
      this.clients.push({
        id: client.id,
        socket: client,
        uid: uid,
      });
    };
  };

  // method remove
  public async remove(id: string) {
    this.clients = this.clients.filter((x) => x.id != id);
  };
};