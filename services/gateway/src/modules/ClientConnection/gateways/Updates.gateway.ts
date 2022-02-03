import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UpdatesClientsService } from '../services';
import { Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

// sheesh
import { IInitializeRequest, CLIENT_CONNECTION_UPDATE_EVENT, IUpdatePayload } from '@shared/types';

@WebSocketGateway({ 
  cors: {
    origin: '*',
  }
})
export class UpdatesGateway {
  constructor(
    private readonly clientsService: UpdatesClientsService,
  ) {}
  
  // initialize event
  @SubscribeMessage('initialize')
  async handleInitializeEvent(
    client: Socket,
    data: IInitializeRequest,
  ) {
    // Adding this client to clients service
    if (data.uid)
      this.clientsService.add(client, data.uid);
  };

  // Listening to application-scoped events
  @OnEvent(CLIENT_CONNECTION_UPDATE_EVENT)
  public async handleEvent(payload: IUpdatePayload) {
    console.log('application-scope event');
    
    // Fetching all clients of this user
    const clients = this.clientsService.clients.filter((client) => {
      return client.uid == payload.uid;
    });

    console.log('clients:');
    console.log(clients);

    // Sending update event to each client
    clients.forEach((client) => {
      console.log('emit');
      client.socket.emit('update', payload);
    });
  };
};