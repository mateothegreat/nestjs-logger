import { ConsoleBackend } from '@app/lib/backends/console/console-backend';
import { ElasticsearchBackend } from '@app/lib/backends/elasticsearch/elasticsearch-backend';
import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {

    public static forRoot(config: { backends: (ConsoleBackend | ElasticsearchBackend)[] }): DynamicModule {
        return {
            module: LoggerModule,
            providers: [
                LoggerService,
                {
                    provide: 'LOGGER_CONFIG',
                    useValue: config
                }
            ],
            exports: [
                LoggerService
            ]
        };
    }
}
