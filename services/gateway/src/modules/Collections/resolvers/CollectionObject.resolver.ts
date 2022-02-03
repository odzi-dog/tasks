import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CollectionObject, TaskObject } from '@app/objects';
import { ICollection } from '@shared/types';
import { TasksService } from '@app/modules/Tasks/services';
import { firstValueFrom } from 'rxjs';

@Resolver(of => CollectionObject)
export class CollectionObjectResolver {
  constructor(
    private readonly tasksService: TasksService,
  ) {}
  
  // @resolve tasks field
  @ResolveField('tasks', returns => [TaskObject])
  public async resolveTasksField(
    @Parent() document: ICollection
  ) {
    return await firstValueFrom(this.tasksService.fetchCollectionTasks(document._id), { defaultValue: [] });
  };
};