import { Injectable } from '@angular/core';
import { User } from '../app/model/user'

@Injectable()
export class Globals {
  role: string = 'test';
  public user : User;
}