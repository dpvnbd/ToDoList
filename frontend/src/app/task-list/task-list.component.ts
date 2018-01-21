import {Component, OnInit} from '@angular/core';
import {TaskService, Task} from "../services/task.service";
import {AlertService} from "../services/alert.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public tasks:Task[];

  constructor(private taskService: TaskService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks;
        console.log("finished request")
        console.log(tasks)
      },
      err => {
        console.error(err)
        this.alertService.error(err.message);
      })
  }
}
