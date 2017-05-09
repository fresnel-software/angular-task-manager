import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Task } from './task';


@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  getTasks() {
    return this.http.get('app/tasks/mock.json')
          .map(response => <Task[]>response.json().data);
  }

  //... other methods.

}
