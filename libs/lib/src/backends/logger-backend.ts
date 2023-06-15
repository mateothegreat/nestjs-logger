import { LoggerMessage } from '../logger-message';
import { LoggerBackendConfig } from './logger-backend-config';

export interface LoggerBackend {
    config: LoggerBackendConfig;

    emit<T>(message: LoggerMessage<T>): void;

    raw<T>(message: LoggerMessage<T>): void;
}
