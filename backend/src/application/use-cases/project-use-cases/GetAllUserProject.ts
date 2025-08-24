import { ProjectRepository } from "../../ports/projectRepo";
import { Project } from "../../../domain/entities/Project";

export class GetUsersProjects {
    constructor(private projectRepo: ProjectRepository) {};

    async execute(userId: string, tenantId: string): Promise<Project[]> {
        // Validate inputs
        if (!userId || !tenantId) throw new Error("UserId and TenantId are required");

        // Call the method to retrieved the projects
        const projects = await this.projectRepo.findAllProjectOfUser(userId, tenantId);

        // Return the projects
        return projects
    }
    
}