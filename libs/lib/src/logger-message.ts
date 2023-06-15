import { LoggerConfig } from './logger-config';
import { LoggerLevel } from './logger-level';

export interface LoggerMessage<T> {
    hostname?: string;
    date?: Date;
    level?: LoggerLevel;
    message: T;
    index?: string;
    config?: LoggerConfig;
}
