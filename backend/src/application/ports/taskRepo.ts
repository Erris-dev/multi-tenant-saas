import { Task } from "../../domain/entities/Task";

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findAll(): Promise<Task[]>;
  save(task: Task): Promise<Task>;
  remove(id: string): Promise<boolean>;
}
