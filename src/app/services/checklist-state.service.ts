import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { CheckList } from '../models/checklist.interface';
import { Task } from '../models/task.interface';
import { ChecklistService } from './checklist.service';

@Injectable()
export class ChecklistStateService extends RxState<CheckList> {
  constructor(private _checklistService: ChecklistService) {
    super();
  }

  public getChecklist(): void {
    this.connect(this._checklistService.get(), (oldState, value) => {
      return { ...value };
    });
  }

  public handletDeleteTask(deleteTaskCommand$): void {
    this.connect('tasks', deleteTaskCommand$, (state, eventValue: number) => {
      state.tasks.splice(eventValue, 1);
      return state.tasks;
    });
  }

  public handleAddTask(addTaskCommand$): void {
    this.connect('tasks', addTaskCommand$, (state, formValueEmitted) => {
      const newTask = {
        id: state.tasks.length + 1,
        name: formValueEmitted,
      } as Task;
      state.tasks = [...state.tasks, newTask];
      return state.tasks;
    });
  }
}
