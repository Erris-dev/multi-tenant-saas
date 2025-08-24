import { ProjectRepository } from "../../ports/projectRepo";
import { Project } from "../../../domain/entities/Project";

export class GetSingleProject {
    constructor(private projectRepo: ProjectRepository) {};

    async execute(projectId: string, tenantId: string): Promise<Project | null> {
        // Validate inputs
        if (!projectId || !tenantId) throw new Error("ProjectId and TenantId are required");

        // Call the method to retrieved the projects
        const project = await this.projectRepo.findASingleProjectOfUser(projectId, tenantId);

        // Return the projects
        return project
    }
    
}