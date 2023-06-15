import { ConsoleBackend } from '@app/lib/backends/console/console-backend';
import { ElasticsearchBackend } from '@app/lib/backends/elasticsearch/elasticsearch-backend';
import { LoggerLevel } from '@app/lib/logger-level';
import { LoggerModule } from '@app/lib/logger.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
    imports: [
        LoggerModule.forRoot({
            backends: [
                new ConsoleBackend({
                    name: 'console',
                    level: LoggerLevel.DEBUG
                }),
                new ElasticsearchBackend({
                    name: 'es',
                    level: LoggerLevel.DEBUG,
                    index: 'test-default',
                    clientOptions: {
                        nodes: [ 'http://localhost:9200' ]
                    }
                })
            ]
        })
    ],
    providers: [ AppService ]
})
export class AppModule {
}
