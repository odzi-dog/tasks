import { CollectionsService } from '@app/modules/Collections/services';
import { UsersService } from '@app/modules/User/services';
import { TaskObject, TaskSessionObject } from '@app/objects';
import { ParentUnion } from '@app/unions';
import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ITask, EParentType } from '@shared/types';
import { TasksService } from '../services';
import { firstValueFrom } from 'rxjs';
import { TaskSessionService } from '@app/modules/TaskSession/services';
import { FilterTaskSessionInput } from '@app/inputs';

@Resolver(of => TaskObject)
export class TaskObjectResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly collectionsService: CollectionsService,
    private readonly tasksService: TasksService,
    
    private readonly sessionsService: TaskSessionService,
  ) {}

  // Resolve parent field
  @ResolveField('parent', returns => ParentUnion)
  public async resolveParentField(
    @Parent() { parent: { type, id } }: ITask,
  ) {
    if (type == EParentType.USER) {
      // Getting user
      return await firstValueFrom(this.usersService.fetchOne({
        id,
      }));
    } else if (type == EParentType.COLLECTION) {
      // Getting collection
      return await firstValueFrom(this.collectionsService.fetchById(id));
    } else if (type == EParentType.TASK) {
      // Getting task
      return await firstValueFrom(this.tasksService.fetchOne(id));
    };
  };

  // Resolve sessions field
  @ResolveField('sessions', returns => [TaskSessionObject])
  public async resolveSessionsField(
    @Parent() task: ITask,
    @Args('filter', { nullable: true }) filter?: FilterTaskSessionInput
   ) {
    return await firstValueFrom(this.sessionsService.fetchTaskSession(task._id, filter));
  };
};