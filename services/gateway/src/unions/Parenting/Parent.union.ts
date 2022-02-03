// Importing modules
import { CollectionObject, TaskObject, UserObject } from '@app/objects';
import { createUnionType } from '@nestjs/graphql';
import { ICollection, ITask, IUser } from '@shared/types';

// Exporting union type
export const ParentUnion = createUnionType({
  name: 'Parent',
  types: () => [UserObject, CollectionObject, TaskObject],
  description: 'Union, that consists of all posible parent object for particular entity',
  
  // Resolver
  resolveType: (value: ITask | ICollection | IUser) => {
    console.log(value);
    if (value.__model == 'user') {
      console.log('return 1');
      return UserObject; 
    } else if (value.__model == 'collection') {
      console.log('return 2');
      return CollectionObject;
    } else if (value.__model == 'task') {
      console.log('return 3');
      return TaskObject;
    };
  },
});