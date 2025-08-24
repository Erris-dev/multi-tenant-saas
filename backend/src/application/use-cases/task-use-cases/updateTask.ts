import { TaskRepository } from "../../ports/taskRepo";
import { UpdateTaskRequest } from "../../dto/taskDTO";

export class UpdateTask {
    constructor(private taskRepo: TaskRepository) {}

    async execute(request: UpdateTaskRequest): Promise<string> {
        const id = request.taskId
        if (!id) throw new Error('TaskID is missing');
        
        const task = await this.taskRepo.findById(id);
        if(!task) throw new Error('Task not found');

        task.renameTask(request);

        await this.taskRepo.save(task);

        return "Task updated successfully";
    }  
}