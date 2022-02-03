// Importing modules
import { client } from '$lib/modules/Gateway/module';
import type { IMappedTask } from '$lib/types';

// Queries && Mutations
import { EndSessionMutation, StartSessionMutation } from '../queries';
import type { IStartSessionMutationResponse } from '../queries';

// Task instance class
export class TaskInstance {
  constructor(
    private task: IMappedTask
  ) {}

  // startSession
  async startSession() {
    // Mutating
    const response = await client.mutate(StartSessionMutation, {
      variables: {
        taskId: String(this.task._id),
      },
    });

    console.log('mutation response:');
    console.log(response);
  };

  // endSession
  async endSession() {
    // Mutating
    this.task.sessions.running.forEach((session) => {
      client.mutate(EndSessionMutation, {
        variables: {
          sessionId: String(session._id)
        },
      });
    });
  };

  // pin

  // unpin

  // update
  update(task: IMappedTask) {
    this.task = task;
  };
};

// Our service class
class Service  {
  // createForTask
  createForTask(task: IMappedTask) {
    return new TaskInstance(task);
  };
};

// Exporting our service
export const TaskInstanceService = new Service();