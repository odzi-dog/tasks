import { TaskSessionDocument } from '@app/models';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { FilterTaskServiceDTO } from '@shared/types';
import * as moment from 'moment';

@Injectable()
export class TaskSessionService {
  constructor(
    @InjectModel('TaskSession')
    private readonly taskSessionModel: Model<TaskSessionDocument>,
  ) {}
  
  // @method _fetch
  private async _fetch(query: FilterQuery<TaskSessionDocument>) {
    return await this.taskSessionModel.find(query);
  };

  // @method fetchOne
  public async fetchOne(id: Types.ObjectId) {
    return (await this._fetch({ _id: id }))[0];
  };

  // @method fetchMany
  // +todo

  // @method fetchTaskSessions
  public async fetchTaskSessions(
    taskId: Types.ObjectId,
    filter?: FilterTaskServiceDTO,
  ) {
    // Fetching all sessions, that assigned
    // to this task
    let sessions = await this._fetch({ taskId: taskId });

    // uuugh
    if (!filter) filter = {};
    if (!filter?.startDate) filter.startDate = (+new Date()/1000);

    // Filtering
    // - start date
    if (filter?.startDate) {
      // Parsing filter's start date
      const filterDate = moment.unix(filter.startDate);
      const day = {
        start: filterDate.hours(0).minutes(0).clone(),
        end: filterDate.hours(23).minutes(59).clone(),
      };

      // Looping through all sessions and
      // checking their start date
      sessions = sessions.filter((session) => {
        // Parsing start date
        const startDate = moment.unix(session.startDate);
        const endDate = session.endDate ? moment.unix(session.endDate) : null;

        // 
        //      Tomorrow          Today
        // |                |                |
        // -----------------------------------
        // Time ->
        // 
        // 1. Return all tasks, which startDate's bigger than Today's 00:00 timestamp 
        // Else:
        // 2. Return all tasks, that doesn't have endDate;
        // Else:
        // 3. Return all tasks, which endDate's bigger than Today's 00:00 timestamp
        // 

        if (startDate.isAfter(day.start)) {
          return true;
        } else {
          if (!endDate) {
            return true;
          } else {
            if (endDate.isAfter(day.start)) {
              return true;
            };
          };
        };
      });
    };

    return sessions;
  };

  // @method search
  // +todo

  // @method startSession
  public async startSession(taskId: Types.ObjectId) {
    // Getting current time
    const date = moment.utc().unix();
    
    // Creating new session
    const session = new this.taskSessionModel({
      taskId: taskId,
      startDate: date
    });

    // Saving and returning
    return await session.save();
  };

  // @method endSession
  public async endSession(sessionId: Types.ObjectId) {
    // Getting current time
    const date = moment.utc().unix();

    // Fetching this session
    const session = (await this._fetch({ _id: sessionId }))[0];
    if (!session) throw new HttpException('Session not found', HttpStatus.NOT_FOUND);

    // Updating it's endDate information
    if (!session.endDate) {
      session.endDate = date;

      // Updating
      await session.updateOne(session);
    };

    return session;
  };
};