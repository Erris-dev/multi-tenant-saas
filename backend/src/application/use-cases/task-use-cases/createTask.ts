import { TaskRepository } from "../../ports/taskRepo";
import { Task } from "../../../domain/entities/Task";
import { CreateTaskRequest } from "../../dto/taskDTO";
import { randomUUID } from "crypto";

export class CreateTask {
    constructor(private taskRepo: TaskRepository) {}

    async execute(request: CreateTaskRequest): Promise<string> {
        const tenantId = request.tenantId;
        const projectId = request.projectId;

        if(!tenantId || !projectId) throw new Error("TenantId or ProjectId is missing");

        const newTask = new Task({
            id: randomUUID(),
            title: request.title,
            description: request.description,
            status: request.status,
            type: request.type,
            priority: request.priority,
            due_date: request.due_date,
            assigneId: request.assigneId,
            tenantId,
            projectId,
        })

        await this.taskRepo.save(newTask);

        return "Task created successfully";
    }
}