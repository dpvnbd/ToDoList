import {Component, OnInit} from '@angular/core';
import {TaskService, Task, TaskStatus} from "../services/task.service";
import {AlertService} from "../services/alert.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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


  onCheckboxClick(task: Task) {
    const prevStatus = task.status;
    if (task.status === TaskStatus.Completed) {
      task.status = TaskStatus.InProgress;
    } else {
      task.status = TaskStatus.Completed;
    }

    this.taskService.updateTask({id: task.id, status: task.status}).subscribe(
      data => {
      },
      err => {
        this.alertService.error("An error occurred while updating the task: " + err.message);
        task.status = prevStatus;
      }
    )
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
          this.alertService.error('An error occurred while creating a task: ' + err.message);
        })
    }, (reason) => {
    });
  }

  openEdit(task: Task) {
    const modalRef = this.modalService.open(TaskEditComponent);
    modalRef.componentInstance.task = Object.assign({}, task);

    modalRef.result.then((modalTask) => {
      console.log(modalTask);
      this.taskService.updateTask(modalTask).subscribe(
        () => {
          const index = this.tasks.indexOf(task);
          if (index != -1) {
            this.tasks[index] = modalTask;
          }
        },
        err => {
          this.alertService.error("An error occurred while updating the task: " + err.message);
        })
    }, (reason) => {
    });
  }

  openDelete(content, task: Task) {
    this.modalService.open(content).result.then(
      (result) => {
        this.taskService.deleteTask(task).subscribe(
          ()=>{
            const index = this.tasks.indexOf(task);
            this.tasks.splice(index, 1);
          },
          err=>{
            this.alertService.error("An error occurred while deleting the task: " + err.message);
          }
        )
      }, (reason) => {
      });
  }
}
