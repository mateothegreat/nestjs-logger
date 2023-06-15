import { ElasticsearchBackendConfig } from '@app/lib/backends/elasticsearch/elasticsearch-backend-config';
import { Client } from '@elastic/elasticsearch';
import * as os from 'os';
import { LoggerLevel } from '../../logger-level';
import { LoggerMessage } from '../../logger-message';
import { LoggerBackend } from '../logger-backend';

export class ElasticsearchBackend implements LoggerBackend {
    public config: ElasticsearchBackendConfig;
    private client: Client;

    public constructor(config: ElasticsearchBackendConfig) {
        this.config = config;
        this.client = new Client(config.clientOptions);
    }

    public emit<T>(message: LoggerMessage<T>): void {
        void this.client.index({
            index: message.index || this.config.index,
            document: {
                date: message.date || new Date(),
                hostname: message.hostname || os.hostname(),
                level: {
                    number: message.level,
                    name: LoggerLevel[message.level]
                },
                message: message.message
            }
        });
    }

    public raw<T>(message: LoggerMessage<T>): void {
        void this.client.index({
            index: message.index || this.config.index,
            document: message.message
        });
    }
}
