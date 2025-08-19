import { ProjectStatus } from "../../infrastructure/database/entities/ProjectType";

export interface UpdateProjectDTO {
  projectId?: string,
  userId?: string,
  name?: string;
  description?: string;
  status?: ProjectStatus;
  start_date?: Date;
  end_date?: Date;
}

export interface UpdateProjectResponse {
  projectId?: string,
  name?: string;
  description?: string;
  status?: ProjectStatus;
  start_date?: Date;
  end_date?: Date;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  status?: ProjectStatus;
  start_date?: Date;
  end_date?: Date;
  userId?: string,
  tenantId?: string;
}

export interface CreateProjectResponse {
  id?: string;
  name?: string;
  description?: string;
  status?: ProjectStatus;
  start_date?: Date;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
