import { Project } from "../../domain/entities/Project";

export interface ProjectRepository {
  save(project: Project): Promise<Project>;
  findASingleProjectOfUser(projectId: string, tenantId: string): Promise<Project | null>
  findAllProjectOfUser(userId: string, tenantId: string): Promise<Project[]>;
  findById(id: string): Promise<Project | null>;
  findByName(name: string): Promise<Project | null>;
  delete(id: string): Promise<void>;
}
