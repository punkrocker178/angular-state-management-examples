import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from '../models/task.interface';
import { ChecklistStore } from '../store/checklist.store';

@Component({
  selector: 'app-b',
  template: `
  <h2>B Component (ngrx/component-store)</h2>
  <div *ngFor="let task of (tasks$ | async);let i = index">
      <span *ngIf="!task.isEditable" style="margin-right:4px">{{task.id}} - {{task.name}}</span>

      <span *ngIf="task.isEditable"><input/></span>
      
      <button style="margin-right:4px" (click)="edit(i)">edit</button>
      <button (click)="deleteTask(i)">delete</button>
    </div>
    <input type="text" [formControl]="control"/>
    <button id="addTask-btn" (click)="addTask()">Add Task</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * State management using ngrx/component-store
 * * Bussiness logic is separated in service
 */
export class BComponent implements OnInit {
  public tasks$: Observable<Task[]>;
  public control = new FormControl();

  constructor(private _store: ChecklistStore) {}

  ngOnInit(): void {
    this._store.getChecklist();
    this.tasks$ = this._store.select((state) => state.tasks);
  }

  public addTask(): void {
    if (!this.control.value) return;
    this._store.addTask(this.control.value);
    this.control.reset();
  }

  public edit(index: number): void {
    this._store.toggleEditable(index);
  }

  public deleteTask(index: number): void {
    this._store.deleteTask(index);
  }
}
