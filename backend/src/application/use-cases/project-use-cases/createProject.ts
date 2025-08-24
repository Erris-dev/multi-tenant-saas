import { ProjectRepository } from "../../ports/projectRepo";
import {
  CreateProjectRequest,
  CreateProjectResponse,
} from "../../dto/projectDTO";
import { Project } from "../../../domain/entities/Project";
import { randomUUID } from "crypto";

export class CreateProject {
  constructor(private projectRepo: ProjectRepository) {}

  async execute(request: CreateProjectRequest): Promise<CreateProjectResponse> {
    const tenantId = request.tenantId;

    console.log(request.userId);
    if (!tenantId) {
      throw new Error("Tenant ID is required to create a project.");
    }

    const newProject = new Project({
      id: randomUUID(),
      name: request.name,
      description: request.description,
      start_date: request.start_date,
      end_date: request.end_date,
      userId: request.userId,
      tenantId: tenantId,
    });

    const project = await this.projectRepo.save(newProject);

    return {
        id: project.id,
        name: project.name,
        status: project.status,
        description: project.description,
        start_date: project.start_date,
        end_date: project.end_date,
        created_at: project.created_at,
        updated_at: project.updated_at,
    }
  }
}
