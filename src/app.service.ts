import { LoggerService } from '@app/lib/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public constructor(private readonly loggerService: LoggerService) {
        loggerService.info('AppService.constructor');
    }
}
