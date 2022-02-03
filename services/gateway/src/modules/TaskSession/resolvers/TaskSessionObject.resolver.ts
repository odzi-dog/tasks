import { TasksService } from '@app/modules/Tasks/services';
import { TaskObject, TaskSessionObject } from '@app/objects';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ITaskSession } from '@shared/types';
import { firstValueFrom } from 'rxjs';

@Resolver(of => TaskSessionObject)
export class TaskSessionObjectResolver {
  constructor(
    private readonly taskService: TasksService,
  ) {}

  // resolve task field
  @ResolveField('task', returns => TaskObject)
  public async resolveTaskField(
    @Parent() session: ITaskSession
  ) {
    return await firstValueFrom(this.taskService.fetchOne(session._id));
  };
};