import { LoggerBackend } from './backends/logger-backend';

export interface LoggerConfig {
    backends: string & Array<LoggerBackend>;
}
