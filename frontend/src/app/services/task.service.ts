import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

export enum TaskStatus {
  InProgress = "in_progress",
  Completed = "completed",
  Canceled = "canceled"
}

export interface Task {
  id: number,
  title: string,
  description: string,
  status: TaskStatus,
  priority: number,
  deadline?: any,
  created_at?: any,
  updated_at?: any
}

@Injectable()
export class TaskService {

  constructor(private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/api/tasks');
  }

  createTask(task:Task): Observable<Task> {
    return this.http.post<Task>('api/tasks', task);
  }
}
