import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from '../dto/task.dto';
import { KeyValueDto, TaskTypeDto } from 'src/common.dto';
import { EntityMapper } from 'src/utils/mapper/entity.mapper';
import { TaskStatusList } from '../task.status.list';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) { }

    mapTaskData(task) {
        return {
            id: task.id,
            userId: task.userId,
            taskTypeId: task.taskTypeId,
            taskStatusId: task.taskStatusId,
            remindDate: task.remindDate,
            dueDate: task.dueDate,
            priorityId: task.priorityId,
            documents: task.documents,
            notes: task.notes,
            subTasks: task.subTasks,
            customTitle: task.customTitle,
            customDescription: task.customDescription,
            isActive: task.isActive,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            taskStatus: task.taskStatus,
            taskType: task.taskType,
            priority: task.priority,
            categories: task.categories.map(cat => ({
                categoryId: cat.categoryId,
                category: cat.category, // Includes name and description
            })),
        };
    }

    // Fetch all tasks
    async getAllTasks(page: number, limit: number, statusId?: number) {
        const offset = (page - 1) * limit;  // Calculate offset based on page and limit
        const tasks = await this.prisma.task.findMany({
            skip: offset,
            take: limit,
            include: {
                taskStatus: { select: { name: true, description: true } },
                taskType: { select: { name: true, description: true } },
                priority: { select: { name: true, description: true } },
                categories: {
                    include: {
                        category: { select: { name: true, description: true } },
                    }
                },
            },
            where: {
                isActive: true,
                ...(statusId ? { taskStatusId: statusId } : {}),
            }
        });
        return tasks.map(this.mapTaskData);
    }

    // Fetch a single task by ID
    async getTaskById(id: number) {
        const task = await this.prisma.task.findUnique({
            where: { id, isActive: true },
            include: {
                taskStatus: { select: { name: true, description: true } },
                taskType: { select: { name: true, description: true } },
                priority: { select: { name: true, description: true } },
                categories: {
                    include: {
                        category: { select: { name: true, description: true } },
                    }
                },
            },
        });
        return task ? this.mapTaskData(task) : null;
    }

    // Create a new task
    async createTask(userId: number, createTaskDto: TaskDto) {

        if (createTaskDto.taskStatusId === TaskStatusList.Completed) {
            throw new HttpException(`The task cannot be completed until it has been created.`, HttpStatus.CONFLICT);
        }

        try {
            const task = await this.prisma.task.create({
                data: {
                    userId,
                    taskTypeId: createTaskDto.taskTypeId,
                    taskStatusId: createTaskDto.taskStatusId,
                    remindDate: createTaskDto.remindDate,
                    dueDate: createTaskDto.dueDate,
                    priorityId: createTaskDto.priorityId,
                    documents: createTaskDto.documents,
                    notes: createTaskDto.notes,
                    subTasks: createTaskDto.subTasks,
                    customTitle: createTaskDto.customTitle,
                    customDescription: createTaskDto.customDescription,
                    isActive: true,
                    createdAt: new Date(), // Assuming you want to set the createdAt field
                    categories: {
                        create: createTaskDto.categories.map((category) => ({
                            categoryId: category.categoryId,
                        })),
                    },
                },
            });

            return this.getTaskById(task.id)
        }
        catch (error) {
            return new HttpException(`An error occurred while processing your request ${error}`, HttpStatus.BAD_GATEWAY);
        }
    }

    // Update an existing task
    async updateTask(id: number, updateTaskDto: TaskDto) {

        const existingTask = await this.prisma.task.findUnique({ where: { id } });
        if (!existingTask) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        try {
            // Update the task
            const updatedTask = await this.prisma.task.update({
                where: { id },
                data: {
                    ...updateTaskDto,
                    categories: {
                        deleteMany: {}, // Remove all existing categories
                        create: updateTaskDto.categories?.map(category => ({
                            categoryId: category.categoryId,
                        })) || [], // Create new categories
                    },
                },
            });
            return this.getTaskById(updatedTask.id)
        } catch (error) {
            return new HttpException(`An error occurred while processing your request ${error}`, HttpStatus.BAD_GATEWAY);
        }
    }

    // Mark as completed
    async markAsCompleted(id: number) {
        const task = await this.prisma.task.findUnique({ where: { id, isActive: true } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        else if (task.taskStatusId === TaskStatusList.Completed) {
            throw new HttpException(`This task completed already`, HttpStatus.CONFLICT);
        }
        try {
            // Update the task
            const updatedTask = await this.prisma.task.update({
                where: { id },
                data: {
                    taskStatusId: TaskStatusList.Completed,
                },
            });
            return this.getTaskById(updatedTask.id)
        } catch (error) {
            return new HttpException(`An error occurred while processing your request ${error}`, HttpStatus.BAD_GATEWAY);
        }
    }

    // Delete a task
    async deleteTask(id: number) {
        const task = await this.prisma.task.findUnique({ where: { id } });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }
        try {
            return this.prisma.task.update({
                where: { id },
                data: { isActive: false }, // Set isActive to false for soft delete
            });
        } catch (error) {
            return new HttpException(`An error occurred while processing your request ${error}`, HttpStatus.BAD_GATEWAY);
        }
    }


    async getCategories(): Promise<KeyValueDto[]> {
        const categories = await this.prisma.category.findMany();
        return categories.map(EntityMapper.toKeyValueDto);
    }

    async getPriorities(): Promise<KeyValueDto[]> {
        const priorities = await this.prisma.priority.findMany();
        return priorities.map(EntityMapper.toKeyValueDto);
    }

    async getTaskStatuses(): Promise<KeyValueDto[]> {
        const taskStatus = await this.prisma.taskStatus.findMany();
        return taskStatus.map(EntityMapper.toKeyValueDto);
    }

    async getTaskTypes(): Promise<TaskTypeDto[]> {
        const taskType = await this.prisma.taskType.findMany();
        return taskType.map(EntityMapper.toTaskTypeDto);
    }

    async getRecommendedTasks() {
        try {

            return await this.prisma.recommendedTask.findMany(
                {
                    where: { isActive: true },
                    include: {
                        taskStatus: { select: { name: true, description: true } },
                        taskType: { select: { name: true, description: true } },
                        priority: { select: { name: true, description: true } },
                        categories: {
                            include: {
                                category: { select: { name: true, description: true } },
                            }
                        },
                    },
                }
            );
        } catch (error) {
            return new HttpException(`An error occurred while processing your request ${error}`, HttpStatus.BAD_GATEWAY);
        }

    }
}
