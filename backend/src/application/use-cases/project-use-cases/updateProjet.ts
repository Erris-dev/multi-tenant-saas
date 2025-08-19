import { ProjectRepository } from "../../ports/projectRepo";
import { UpdateProjectDTO, UpdateProjectResponse } from "../../dto/projectDTO";
import { Project } from "../../../domain/entities/Project";

export class UpdateProject {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(request: UpdateProjectDTO): Promise<object> {
    const id = request.projectId;
    if (!id) {
        throw new Error("Project ID is missing or invalid.");
    }

    console.log(id);

    const project = await this.projectRepo.findById(id);
    console.log(project);
    if (!project) {
      throw new Error("Project not found.");
    }

    project.renameProject(request);

    await this.projectRepo.save(project);

    return { message: "Projected updated successfully"};
  }
}
