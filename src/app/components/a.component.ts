import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxActions } from '@rx-angular/state/actions';
import { RxActionFactory } from '@rx-angular/state/actions';
import { Observable, tap } from 'rxjs';
import { Task } from '../models/task.interface';
import { ChecklistStateService } from '../services/checklist-state.service';

interface AComponentUI {
  addTask: string;
  deleteTask: number;
}

/**
 * State management using rx-angular/state
 * Bussiness logic is separated in service
 */

@Component({
  selector: 'app-a',
  template: `
  <h2>A Component (rx-angular/state)</h2>
    <div *ngFor="let task of (tasks$ | async);let i = index">
      <span style="margin-right:4px">{{task.id}} - {{task.name}}</span>
      <button (click)="ui.deleteTask(i)">delete</button>
    </div>
    <input type="text" [formControl]="control"/>
    <button id="addTask-btn" (click)="ui.addTask(control.value)">Add Task</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AComponent implements OnInit {
  constructor(
    private _state: ChecklistStateService,
    private _actionFactory: RxActionFactory<AComponentUI>
  ) {}
  public control = new FormControl();

  public tasks$: Observable<Task[]>;

  // Commands
  public ui: RxActions<AComponentUI>;

  ngOnInit(): void {
    this.ui = this._actionFactory.create();
    this._state.getChecklist();

    this._state.handleAddTask(
      this.ui.addTask$.pipe(tap(() => this.control.reset()))
    );
    this._state.handletDeleteTask(this.ui.deleteTask$);

    this.tasks$ = this._state.select('tasks');
  }
}
