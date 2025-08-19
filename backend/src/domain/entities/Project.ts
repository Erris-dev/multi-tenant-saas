import { UpdateProjectDTO } from "../../application/dto/projectDTO";
import { ProjectStatus } from "../../infrastructure/database/entities/ProjectType";

export interface ProjectProps {
  id: string;
  name?: string;
  userId?: string;
  description?: string;
  status?: ProjectStatus;
  start_date?: Date;
  tenantId: string;
  end_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class Project {
  public readonly id: string;
  public name?: string;
  public description?: string;
  public status?: ProjectStatus;
  public start_date?: Date;
  public end_date?: Date;
  public userId?: string;
  public readonly tenantId: string
  public readonly created_at?: Date;
  public updated_at?: Date;

  constructor(props: ProjectProps) {
    (this.id = props.id),
      (this.name = props.name),
      (this.description = props.description),
      (this.status = props.status),
      (this.start_date = props.start_date),
      (this.end_date = props.end_date),
      (this.tenantId = props.tenantId),
      (this.userId = props.userId),
      (this.created_at = props.created_at),
      (this.updated_at = props.updated_at);
  }

  
  async renameProject(updateValues: UpdateProjectDTO) {
    if (updateValues.name !== undefined) {
      if (updateValues.name.length < 3) {
        throw new Error("Project name must be at least 3 characters long");
      }
      this.name = updateValues.name;
    }

    if (updateValues.description !== undefined) {
      this.description = updateValues.description;
    }

    if (updateValues.status !== undefined) {
        this.status = updateValues.status;
    }

    if (updateValues.start_date !== undefined) {
        this.start_date = updateValues.start_date;
    }

    if (updateValues.end_date !== undefined) {
        this.end_date = updateValues.end_date;
    }

    this.updated_at = new Date();
  }

}
