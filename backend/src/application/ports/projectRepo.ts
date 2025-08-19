import { Project } from "../../domain/entities/Project";

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  save(project: Project): Promise<Project>;
  findAll(): Promise<Project[]>;
  findAllByUserId(userId: string): Promise<Project[]>
  findByName(name: string): Promise<Project | null>
  delete(id: string): Promise<void>;
}
