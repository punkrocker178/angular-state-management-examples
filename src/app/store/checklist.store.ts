import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { CheckList } from '../models/checklist.interface';
import { Task } from '../models/task.interface';
import { ChecklistService } from '../services/checklist.service';

@Injectable()
export class ChecklistStore extends ComponentStore<CheckList> {
  constructor(private _checklistService: ChecklistService) {
    super();
  }

  public readonly addTask = this.updater((state, taskName: string) => {
    const newTask = {
      id: state.tasks.length + 1,
      name: taskName,
    } as Task;

    return {
      ...state,
      tasks: [...state.tasks, newTask],
    };
  });

  public readonly deleteTask = this.updater((state, index: number) => {
    state.tasks.splice(index, 1);
    return state;
  });

  readonly getChecklist = this.effect(() => {
    return this._checklistService.get().pipe(
      //👇 Act on the result within inner pipe.
      tap({
        next: (checklist) => {
          this.setState({ ...checklist });
        },
      }),
      // 👇 Handle potential error within inner pipe.
      catchError(() => EMPTY)
    );
  });
}
