import { UpdateTaskRequest } from "../../application/dto/taskDTO";
import {
  TaskStatus,
  TaskPriority,
  TaskType,
} from "../../infrastructure/database/entities/TaskType";

export interface TaskProps {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  due_date?: Date;
  tenantId: string;
  assigneId?: string;
  projectId: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Task {
  public readonly id: string;
  public title: string;
  public description?: string;
  public type: TaskType;
  public status: TaskStatus;
  public priority: TaskPriority;
  public due_date?: Date;
  public readonly tenantId: string;
  public assigneId?: string;
  public readonly projectId: string;
  public readonly created_at?: Date;
  public updated_at?: Date;

  constructor(props: TaskProps) {
    (this.id = props.id),
      (this.title = props.title),
      (this.description = props.description),
      (this.type = props.type),
      (this.status = props.status),
      (this.priority = props.priority),
      (this.due_date = props.due_date),
      (this.tenantId = props.tenantId),
      (this.assigneId = props.assigneId),
      (this.projectId = props.projectId),
      (this.created_at = props.created_at),
      (this.updated_at = props.updated_at);
  }

  async renameTask(updateValues: UpdateTaskRequest) {
    if (updateValues.title !== undefined) {
      if (updateValues.title.length < 3) {
        throw new Error("Project name must be at least 3 characters long");
      }
      this.title = updateValues.title;
    }

    if (updateValues.description !== undefined) {
      this.description = updateValues.description;
    }

    if (updateValues.status !== undefined) {
      this.status = updateValues.status;
    }

    if (updateValues.due_date !== undefined) {
      this.due_date = updateValues.due_date;
    }

    if(updateValues.priority !== undefined) {
        this.priority = updateValues.priority;
    }

    if(updateValues.assigneId !== undefined) {
        this.assigneId = updateValues.assigneId;
    }
  }
}
