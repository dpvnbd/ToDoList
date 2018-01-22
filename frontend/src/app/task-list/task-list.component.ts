import {Component, OnInit} from '@angular/core';
import {TaskService, Task} from "../services/task.service";
import {AlertService} from "../services/alert.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TaskEditComponent} from "../task-edit/task-edit.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public tasks: Task[];

  constructor(private taskService: TaskService,
              private alertService: AlertService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  private loadTasks() {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
      },
      err => {
        console.error(err)
        this.alertService.error(err.message);
      })
  }

  openCreate() {
    const modalRef = this.modalService.open(TaskEditComponent);
    modalRef.componentInstance.task = {};

    modalRef.result.then((task) => {
      this.taskService.createTask(task).subscribe(
        task => {
          this.tasks.push(task);
        },
        err => {
          this.alertService.error(err.message);
        })
    }, (reason) => {
    });
  }
}
