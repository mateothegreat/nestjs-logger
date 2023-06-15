<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Setup

```typescript
import { ConsoleBackend } from '@mateothegreat/nestjs-logger/backends/console/console-backend';
import { ElasticsearchBackend } from '@mateothegreat/nestjs-logger/backends/elasticsearch/elasticsearch-backend';
import { LoggerLevel } from '@mateothegreat/nestjs-logger/logger-level';
import { LoggerModule } from '@mateothegreat/nestjs-logger/logger.module';
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
```

## Usage

```typescript
import { LoggerService } from '@mateothegreat/nestjs-logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public constructor(private readonly loggerService: LoggerService) {
        loggerService.info('AppService.constructor');
    }
}
```
