import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/models';
import { CreateUserDTO } from '@shared/types';
import { Model, FilterQuery } from 'mongoose';

// @service Users
// - Basic (and advanced) CRUD operations on
// User model
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  // @method fetch
  public async fetch(query: FilterQuery<UserDocument>) {
    const users = await this.userModel.find(query);
    return users.map((user) => {
      user.__model = "user";
      return user;
    });
  };

  // @method create
  public async create(payload: CreateUserDTO) {
    const user = new this.userModel(payload);

    // Saving and returning
    return user.save();
  };
};