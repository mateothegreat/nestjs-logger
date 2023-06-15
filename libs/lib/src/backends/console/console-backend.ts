import { LoggerMessage } from '../../logger-message';
import { LoggerBackend } from '../logger-backend';
import { ConsoleBackendConfig } from './console-backend-config';

export class ConsoleBackend implements LoggerBackend {
    public config: ConsoleBackendConfig;

    public constructor(config: ConsoleBackendConfig) {
        this.config = config;
    }

    public emit<T>(message: LoggerMessage<T>): void {
        console.log(JSON.stringify(message));
    }

    public raw<T>(message: LoggerMessage<T>): void {
        console.log(JSON.stringify(message));
    }
}
