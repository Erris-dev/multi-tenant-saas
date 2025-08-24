import { TaskRepository } from "../../ports/taskRepo";
import { Task } from "../../../domain/entities/Task";

export class GetSinglTask {
    constructor(private taskRepo: TaskRepository) {}

    async execute(taskId: string, tenantId: string): Promise<Task | null> {

        if(!taskId || !tenantId) throw new Error("ProjectID and TenantID are missing");

        const task = await this.taskRepo.findASingleTask(taskId, tenantId);
        console.log(task);

        return task;
    }
}