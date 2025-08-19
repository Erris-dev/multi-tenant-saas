import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../../config';
import { UserEntity } from './entities/userType';
import { TenantEntity } from './entities/tenantType';
import { ProjectEntity } from './entities/ProjectType';
import { TaskEntity } from './entities/TaskType';

import path from 'path';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    synchronize: true,
    logging: false,
    entities: [UserEntity, TenantEntity, ProjectEntity,TaskEntity ],
    migrations: [], 
    subscribers: [],
});

export const createConnection = async (): Promise<DataSource> =>{
    try {
        const db = await AppDataSource.initialize();
        console.log("Bitch databaza u lidh");
        return db;
    } catch (error) {
        console.error("Ja brud mfal amo smujta me lidh:", error);
        throw error;
    }
}