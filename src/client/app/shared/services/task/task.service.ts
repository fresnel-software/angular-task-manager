import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TaskInterface} from '../../index';
import {Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class TaskService {

  API_V1_TASK = '/api/v1/task';

  constructor(private http: Http) {
  }

  get(): Observable<Array<TaskInterface>> {
    // return this.http.get('/assets/mockTasks.json')
    return this.http.get(`${this.API_V1_TASK}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  post(task: TaskInterface): Observable<TaskInterface> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(`${this.API_V1_TASK}`, JSON.stringify(task), options)
      .map((res: Response) =>res.json())
      .catch(this.handleError);
  }

  put(task: TaskInterface): Observable<void> {
    console.info('PUT', task);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    var url = `${this.API_V1_TASK}/${task.id}`;

    return this.http.put(url, JSON.stringify(task), options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  del(task: TaskInterface): Observable<void> {
    console.info('DEL', task);
    var url = `${this.API_V1_TASK}/${task.id}`;

    return this.http.delete(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

