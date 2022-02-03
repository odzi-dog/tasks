import { RequiredUserAuthGuard } from '@app/helpers';
import { FilterTaskSessionInput } from '@app/inputs';
import { TasksService } from '@app/modules/Tasks/services';
import { TaskSessionObject } from '@app/objects';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser, CLIENT_CONNECTION_UPDATE_EVENT, EClientUpdateType } from '@shared/types';
import { firstValueFrom } from 'rxjs';
import { TaskSessionService } from '../services';

@Resolver()
export class TaskSessionsResolver {
  constructor(
    private readonly service: TaskSessionService,
    private readonly tasksService: TasksService,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  // @query TaskSessions
  @UseGuards(RequiredUserAuthGuard)
  @Query(returns => [TaskSessionObject], {
    name: 'TaskSessions',
    description: 'Fetches all task sessions. Can filter them'
  })
  public async queryTaskSessions(
    @Context('user') user: IUser,
    @Args('taskId') taskId: string,
    @Args('filter', { nullable: true }) filter?: FilterTaskSessionInput,
  ) {
    // Fetching this task
    const task = await firstValueFrom(this.tasksService.fetchOne(taskId));

    // Checking if this user can modify it
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (task?.ownerId)
      if (String(task?.ownerId) != String(user._id)) throw new HttpException("This task doesn't belong to this user", HttpStatus.UNAUTHORIZED);
  
    // Fetching all sessions
    return await firstValueFrom(this.service.fetchTaskSession(taskId, filter));
  };

  // @mutation StartSession
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => TaskSessionObject, {
    name: 'StartTaskSession',
    description: "Starts new session and sets it's startDate to now (utc unix)"
  })
  public async startSession(
    @Context('user') user: IUser,
    @Args('taskId') taskId: string,
  ) {
    // Fetching this task
    const task = await firstValueFrom(this.tasksService.fetchOne(taskId));

    // Checking if this user can modify it
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (task?.ownerId)
      if (String(task?.ownerId) != String(user._id)) throw new HttpException("This task doesn't belong to this user", HttpStatus.UNAUTHORIZED);

    // Starting this task
    const response = await firstValueFrom(this.service.startSession(taskId));
    
    // Triggering event emitter
    this.eventEmitter.emit(CLIENT_CONNECTION_UPDATE_EVENT, {
      uid: String(user._id),
      type: EClientUpdateType.TASK,
      payload: {
        ...await firstValueFrom(this.tasksService.fetchOne(task._id)),
        ...{ sessions: await firstValueFrom(this.service.fetchTaskSession(task._id)) },
      }
    });

    return response;
  };

  // @mutation endSession
  @UseGuards(RequiredUserAuthGuard)
  @Mutation(returns => TaskSessionObject, {
    name: 'EndTaskSession',
    description: "End's this session"
  })
  public async endTaskSession(
    @Context('user') user: IUser,
    @Args('sessionId') sessionId: string,
  ) {
    // Fetching this session
    const session = await firstValueFrom(this.service.fetchOne(sessionId));
    if (!session) throw new HttpException('Session not found', HttpStatus.NOT_FOUND);
    if (session.endDate) throw new HttpException('This session is already ended', HttpStatus.BAD_REQUEST);

    // Fetching this session's task
    const task = await firstValueFrom(this.tasksService.fetchOne(session.taskId));

    // Checking if this user can modify it
    // +todo remove task.ownerId check
    // - Older tasks doesn't have ownerId properties.
    if (task?.ownerId)
      if (String(task?.ownerId) != String(user._id)) throw new HttpException("This task doesn't belong to this user", HttpStatus.UNAUTHORIZED);
      
    // Ending this task
    const response = await firstValueFrom(this.service.endSession(sessionId));    
  
    // Event emitter updater
    this.eventEmitter.emit(CLIENT_CONNECTION_UPDATE_EVENT, {
      uid: String(user._id),
      type: EClientUpdateType.TASK,
      payload: {
        ...await firstValueFrom(this.tasksService.fetchOne(task._id)),
        ...{ sessions: await firstValueFrom(this.service.fetchTaskSession(task._id)) },
      },
    });

    return response;
  };
};