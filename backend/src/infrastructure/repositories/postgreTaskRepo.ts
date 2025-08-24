import { TaskRepository } from "../../application/ports/taskRepo";
import { Task } from "../../domain/entities/Task";
import { TaskEntity } from "../database/entities/TaskType";
import { AppDataSource } from "../database/PostgreConfig";
import { Repository } from "typeorm";

export class PostgreTaskRepo implements TaskRepository {
    private ormRepo: Repository<TaskEntity>;

    constructor() {
        this.ormRepo = AppDataSource.getRepository(TaskEntity);
    }

    async findById(id: string): Promise<Task | null> {
        const entity = await this.ormRepo.findOne({ where: { id }});
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async findAll(): Promise<Task[]> {
        const entities = await this.ormRepo.find();
        return entities.map(entity => this.toDomain(entity));
    }

    async save(task: Task): Promise<Task> {
        const entity = await this.ormRepo.save(this.toEntity(task));
        return this.toDomain(entity);
    }

    async remove(id: string): Promise<boolean> {
        await this.ormRepo.delete(id);
        return true
    }

    private toDomain(entity: TaskEntity): Task {
        return new Task({
            id: entity.id,
            title: entity.title,
            description: entity.title,
            type: entity.type,
            priority: entity.priority,
            status: entity.status,
            due_date: entity.due_date,
            assigneId: entity.assignee?.id,
            tenantId: entity.tenant.id,
            projectId: entity.project.id,
            created_at: entity.created_at,
            updated_at: entity.updated_at
        })
    }

    private toEntity(domain: Task): Partial<TaskEntity> {
        return {
            id: domain.id,
            title: domain.title,
            description: domain.description,
            type: domain.type,
            priority: domain.priority,
            status: domain.status,
            due_date: domain.due_date,
            assignee: { id: domain.assigneId} as any,
            tenant: { id: domain.tenantId } as any,
            project: { id: domain.projectId } as any,
            created_at: domain.created_at,
            updated_at: domain.updated_at
        }
    }
}