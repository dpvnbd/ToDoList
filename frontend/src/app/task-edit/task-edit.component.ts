import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbDateStruct, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Task, TaskStatus} from '../services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task;
  date: NgbDateStruct;
  time: NgbTimeStruct;
  isCompleted: boolean;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  submit() {

    this.task.deadline = new Date();

    if(this.date){
      this.task.deadline.setFullYear(this.date.year, this.date.month - 1, this.date.day);
    }
    if(this.time){
      this.task.deadline.setHours(this.time.hour, this.time.minute);
    }

    this.task.status = this.isCompleted ? TaskStatus.Completed : TaskStatus.InProgress;
    console.log(this.task);
    this.activeModal.close(this.task);
  }
}
