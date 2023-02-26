import { Task } from './task.interface';

export interface CheckList {
  id: number;
  name: string;
  tasks: Task[];
}
