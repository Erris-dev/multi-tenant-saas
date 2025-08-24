import { Request, Response } from "express";
import { PostgreTaskRepo } from "../../infrastructure/repositories/postgreTaskRepo";
import { CreateTask } from "../../application/use-cases/task-use-cases/createTask";
import { UpdateTask } from "../../application/use-cases/task-use-cases/updateTask";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const taskRepo = new PostgreTaskRepo();
    const createUseCase = new CreateTask(taskRepo);

    const { title, description, type, status, priority, due_date } = req.body;
    const tenantId = (req as any).tenantId;
    const { projectId } = req.params;
    const assigneId = req.user?.userId;

    const result = await createUseCase.execute({
      title,
      description,
      type,
      status,
      priority,
      due_date,
      tenantId,
      assigneId,
      projectId,
    });

    res.status(200).json({ message: result });
  } catch (err: any) {
    console.error("Error creating task");
    res.status(500).json({ error: err.message });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const taskRepo = new PostgreTaskRepo();
    const updateUseCase = new UpdateTask(taskRepo);

    const { taskId } = req.params;
    const { title, description, status, due_date, priority, type, assigneId } =
      req.body;

    const response = await updateUseCase.execute({
      taskId,
      title,
      description,
      status,
      due_date,
      priority,
      type,
      assigneId,
    });

    res.status(200).json({ message: response });
  } catch (err: any) {
    console.error("Error updating task");
    res.status(500).json({ error: err.message });
  }
};
