import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException, NotFoundException, UseGuards, Query, ParseIntPipe, Optional } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskDto } from './dto/task.dto';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthUser } from 'src/utils/auth.user';
import { UserTypeList } from 'src/shared/enum/user.types';
import { UserTypes } from 'src/utils/decorator/user.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { KeyValueDto } from 'src/common.dto';

@UseGuards(JwtAuthGuard)
@UserTypes(UserTypeList.Diplomat)
@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    // Get all tasks
    @Get("getAll")
    async findAll(
        @Query('page', ParseIntPipe) page: number = 1,      // Default page = 1
        @Query('limit', ParseIntPipe) limit: number = 10,     // Default limit = 10
        @Query('statusId') statusId?: string  
    ) {
        const parsedStatusId = statusId ? parseInt(statusId, 10) : undefined;
        return this.taskService.getAllTasks(page, limit, parsedStatusId);
    }

    // Get task by ID
    @Get('getById/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const task = await this.taskService.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    // Create a new task
    @Post("create")
    async create(
        @User() user: AuthUser,
        @Body() createTaskDto: TaskDto) {
        if (!createTaskDto.taskTypeId || !createTaskDto.taskStatusId || !createTaskDto.priorityId) {
            throw new BadRequestException('Required fields missing');
        }
        return this.taskService.createTask(user.userId, createTaskDto);
    }

    // Update an existing task
    @Put('update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: TaskDto) {
        const updatedTask = await this.taskService.updateTask(id, updateTaskDto);
        if (!updatedTask) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return updatedTask;
    }

    // Mark as completed
    @Put('markAsCompleted/:id')
    async markAsCompleted(@Param('id', ParseIntPipe) id: number) {
        const updatedTask = await this.taskService.markAsCompleted(id);
        if (!updatedTask) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return updatedTask;
    }

    // Delete a task by ID
    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        const task = await this.taskService.deleteTask(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return { message: `Task with ID ${id} deleted successfully` };
    }


    @UseGuards(JwtAuthGuard)
    @Get("getCategories")
    getCategories(): Promise<KeyValueDto[]> {
        return this.taskService.getCategories();
    }

    @UseGuards(JwtAuthGuard)
    @Get("getPriorities")
    getPriorities(): Promise<KeyValueDto[]> {
        return this.taskService.getPriorities();
    }

    @UseGuards(JwtAuthGuard)
    @Get("getTaskTypes")
    getTaskTypes(): Promise<KeyValueDto[]> {
        return this.taskService.getTaskTypes();
    }

    @UseGuards(JwtAuthGuard)
    @Get("getTaskStatuses")
    getTaskStatuses(): Promise<KeyValueDto[]> {
        return this.taskService.getTaskStatuses();
    }

    @UseGuards(JwtAuthGuard)
    @Get("getRecommendedTasks")
    getRecommendedTasks() {
        return this.taskService.getRecommendedTasks();
    }
}
