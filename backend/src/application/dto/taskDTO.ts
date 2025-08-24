import { TaskType, TaskStatus, TaskPriority } from "../../infrastructure/database/entities/TaskType";

export interface UpdateTaskRequest {
    taskId: string,
    title?: string,
    description?: string,
    type?: TaskType,
    status?: TaskStatus,
    priority?: TaskPriority,
    due_date?: Date,
    assigneId?: string
}

export interface CreateTaskRequest {
    title: string,
    description?: string,
    type: TaskType,
    status: TaskStatus,
    priority: TaskPriority,
    due_date: Date,
    tenantId: string,
    projectId: string,
    assigneId?: string,
    created_at?: Date,
    updated_at?: Date,
}

export interface CreateTaskResponse {

}