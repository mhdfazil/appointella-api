import { Injectable } from '@nestjs/common';
import { AppoitmentService } from 'src/appointment/appointment.service';

@Injectable()
export class TasksService {

    constructor(private readonly appointmentsService: AppoitmentService) {}

    // private readonly logger = new Logger(TasksService.name);

    // @Cron('45 * * * * *')
    // handleCron() {
    //     this.logger.debug('Called when the current second is 45');
    // }

    // @Cron('45 * * * * *')
    // handleAppointmentCOmplete() {
    //     const appointments = await this.appointmentsService.findBy({ status: 'pending', date:  })
    // }

}
