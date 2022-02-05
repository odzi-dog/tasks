// Importing modules
import { client } from '$lib/modules/GraphQLClient/module';
import type { IMappedTask } from '$lib/types';

// Queries && Mutations
import { EndSessionMutation, StartSessionMutation } from '../queries';

// Task instance class
export class TaskInstance {
  constructor(
    private task: IMappedTask
  ) {}

  // startSession
  async startSession() {
    // Mutating
    return await client.request(StartSessionMutation, {
      taskId: String(this.task._id),
    });
  };

  // endSession
  endSession() {
    return new Promise(async (resolve) => {
      // Mutating
      for (const session of this.task.sessions.running) {
        await client.request(EndSessionMutation, {
          sessionId: String(session._id)
        });
      };

      resolve(null);
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