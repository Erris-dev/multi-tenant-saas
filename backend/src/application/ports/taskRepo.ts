import { Task } from "../../domain/entities/Task";

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findAllTasksInProject(projectId: string, tenantId: string): Promise<Task[]>;
  findASingleTask(taskId: string, tenantId: string): Promise<Task | null>;
  save(task: Task): Promise<Task>;
  remove(id: string): Promise<boolean>;
}
