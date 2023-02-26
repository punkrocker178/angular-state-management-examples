import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { CheckList } from '../models/checklist.interface';
import { Task } from '../models/task.interface';
import { ChecklistService } from '../services/checklist.service';

@Component({
  selector: 'app-c',
  template: `
  <h2>C Component</h2>
  <div *ngFor="let task of (tasks$ | async);let i = index">
      <span style="margin-right:4px">{{task.id}} - {{task.name}}</span>
      <button (click)="deleteTask(i)">delete</button>
    </div>
    <input type="text" [formControl]="control"/>
    <button id="addTask-btn" (click)="addTask()">Add Task</button>
  `,
})

/**
 * State management using behavior subject
 */
export class CComponent implements OnInit {
  public tasks$: Observable<Task[]>;
  public data$: BehaviorSubject<Partial<CheckList>> = new BehaviorSubject(null);
  public control = new FormControl();
  public getChecklistSubscription: Subscription;
  constructor(private _checklistService: ChecklistService) {}

  ngOnInit(): void {
    this.getChecklistSubscription = this._checklistService
      .get()
      .pipe(
        tap((checklist) => {
          this.data$.next(checklist);
        })
      )
      .subscribe();

    this.tasks$ = this.data$.pipe(
      map((checklist) => {
        return checklist?.tasks || [];
      })
    );
  }

  public addTask(): void {
    if (!this.control.value) return;
    const newTask = {
      id: this.data$.value.tasks.length + 1,
      name: this.control.value,
    };

    this.data$.next({
      ...this.data$.value,
      tasks: [...this.data$.value.tasks, newTask],
    });

    this.control.reset();
  }

  public deleteTask(index: number): void {
    const currentTasks = this.data$.value.tasks;
    currentTasks.splice(index, 1);
    this.data$.next({
      tasks: currentTasks,
    });
  }
}
