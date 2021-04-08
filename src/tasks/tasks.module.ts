import { Module } from '@nestjs/common';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { TasksService } from './tasks.service';

@Module({
    imports:[
        AppointmentModule
    ],
    providers: [TasksService],
})
export class TasksModule {}
