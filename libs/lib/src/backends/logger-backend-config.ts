import { LoggerLevel } from '../logger-level';

export interface LoggerBackendConfig {
    name: string;
    level?: LoggerLevel;
}
