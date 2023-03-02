import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Subscription } from 'rxjs';
import { AddTaskCommand, TaskItem, StatusType } from '../../services/TaskTrackerHttpClient';
import { TaskTrackerHttpClient } from 'src/app/services/TaskTrackerHttpClient';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.scss']
})
export class TaskTrackerComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private destroyed = new ReplaySubject<void>(1);
  errorMessage: any;

  tasks: TaskItem[] = [];
  task: TaskItem = {};

  displayedColumns: string[] = ['id', 'status', 'title', 'dateCreated', 'description'];
  dataSource = this.tasks;

  constructor(public httpClient: TaskTrackerHttpClient) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.subscription.add(this.httpClient.getTasks()
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }));
  }

  addTask() {
    let taskCommand: AddTaskCommand = {
      title: this.task.title,
      description: this.task.description,
      status: StatusType.InProgress
    };

    this.subscription.add(this.httpClient.addTask(taskCommand)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: () => {
          this.getTasks();
          this.task = {};
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }));
  }

  deleteTask() {
    let task: TaskItem = {};
    if (this.tasks.length > 0)
    {
        task = this.tasks[this.tasks.length - 1];
    }

    this.subscription.add(this.httpClient.deleteTask(task.id!)
      .pipe(takeUntil(this.destroyed))
      .subscribe({
        next: () => {
          this.getTasks();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }));
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    this.subscription.unsubscribe();
  }
}
