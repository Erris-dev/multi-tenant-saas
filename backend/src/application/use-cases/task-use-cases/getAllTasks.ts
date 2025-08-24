import { TaskRepository } from "../../ports/taskRepo";
import { Task } from "../../../domain/entities/Task";

export class GetAllProjectTask {
    constructor(private taskRepo: TaskRepository){}

    async execute(projectId: string, tenantId: string): Promise<Task[]> {

        if(!projectId || !tenantId) throw new Error("ProjectID and TenantID are missing");

        const tasks = await this.taskRepo.findAllTasksInProject(projectId, tenantId);

        return tasks;
    }
}