import { Request, Response } from "express";
import { PostgreProjectRepo } from "../../infrastructure/repositories/postgreProjectRepo";
import { CreateProject } from "../../application/use-cases/project-use-cases/createProject";
import { UpdateProject } from "../../application/use-cases/project-use-cases/updateProjet";
import { GetUsersProjects } from "../../application/use-cases/project-use-cases/GetAllUserProject";
import { GetSingleProject } from "../../application/use-cases/project-use-cases/getSingleProject";

export const createProjectController = async (req: Request, res: Response) => {
  try {
    const projectRepo = new PostgreProjectRepo();
    const createProjectCase = new CreateProject(projectRepo);

    const { name, description, start_date, end_date } = req.body;
    const tenantId = (req as any).tenantId;
    const userId = req.user?.userId;

    const project = await createProjectCase.execute({
      userId,
      name,
      description,
      start_date,
      end_date,
      tenantId,
    });

    res.status(200).json({ message: "success", data: project });
  } catch (err: any) {
    console.error("Error registering user");
    res.status(500).json({ error: err.message });
  }
};

export const updateProjectController = async (req: Request, res: Response) => {
  try {
    const projectRepo = new PostgreProjectRepo();
    const updateProjectCase = new UpdateProject(projectRepo);

    const { projectId } = req.params;
    const { name, description, status, start_date, end_date } = req.body;

    const response = await updateProjectCase.execute({
      projectId,
      name,
      description,
      start_date,
      status,
      end_date,
    });

    res.status(200).json(response);
  } catch (err: any) {
    console.error("Error updating project");
    res.status(500).json({ error: err.message });
  }
};

export const getAllProjectOfUser = async (req: Request, res: Response) => {
  try {
    const projectRepo = new PostgreProjectRepo();
    const getUsersProject = new GetUsersProjects(projectRepo);

    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "UserId is missing" });

    const tenantId = (req as any).tenantId;

    const result = await getUsersProject.execute(userId, tenantId);

    res.status(200).json({ message: "success", response: result });
  } catch (err: any) {
    console.error("Error fetching user projects");
    res.status(500).json({ error: err.message });
  }
};

export const getSingleProjectController = async (req: Request, res: Response) => {
  try {
    const projectRepo = new PostgreProjectRepo();
    const getSingleProject = new GetSingleProject(projectRepo);

    const { projectId } = req.params;
    const tenantId = (req as any).tenantId;

    const result = await getSingleProject.execute(projectId, tenantId);

    res.status(200).json({ message: "success", response: result });
  } catch (err: any) {
    console.error("Error fetching the project");
    res.status(500).json({ error: err.message});
  }
};
