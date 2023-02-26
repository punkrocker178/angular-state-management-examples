import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { CheckList } from '../models/checklist.interface';
import { Task } from '../models/task.interface';

@Injectable()
export class ChecklistService {
  public get(): Observable<CheckList> {
    return of({
      id: 1,
      name: 'My list',
      tasks: [
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' },
        { id: 3, name: 'Task 3' },
        { id: 4, name: 'Task 4' },
      ] as Task[],
    } as CheckList).pipe(delay(300));
  }
}
