import { Inject, Injectable } from '@nestjs/common';
import { LoggerConfig } from './logger-config';
import { LoggerLevel } from './logger-level';
import { LoggerMessage } from './logger-message';

@Injectable()
export class LoggerService {
    private config: LoggerConfig;

    public constructor(@Inject('LOGGER_CONFIG') config: LoggerConfig) {
        this.config = config;
    }

    /**
     * Emit a raw message and do not form our own object that gets indexed.
     *
     * @param message
     */
    public raw<T>(message: LoggerMessage<T>): void {
        if (message.config && message.config.backends) {
            if (Array.isArray(message.config.backends)) {
                for (let i = 0; i < message.config.backends.length; i++) {
                    this.config.backends.filter(backend => backend.config.name === message.config.backends[i]).forEach(backend => backend.raw(message));
                }
            } else {
                this.config.backends.filter(backend => backend.config.name === message.config.backends).forEach(backend => backend.raw(message));
            }
        } else {
            this.config.backends.forEach(backend => backend.raw(message));
        }
    }

    /**
     * Emit a well formed log message.
     *
     * @param {LoggerMessage<T>} message
     */
    public log<T>(message: LoggerMessage<T>): void {
        if (message.config && message.config.backends) {
            if (Array.isArray(message.config.backends)) {
                for (let i = 0; i < message.config.backends.length; i++) {
                    this.config.backends.filter(backend => backend.config.name === message.config.backends[i]).forEach(backend => backend.emit(message));
                }
            } else {
                this.config.backends.filter(backend => backend.config.name === message.config.backends).forEach(backend => backend.emit(message));
            }
        } else {
            this.config.backends.forEach(backend => backend.emit(message));
        }
    }

    /**
     * Helper method to emit a message at the debug level.
     *
     * @param {LoggerMessage<T> | string | T} message
     */
    public error<T>(message: LoggerMessage<T> | T | string): void {
        if (message['message']) {
            (message as LoggerMessage<T>).level = LoggerLevel.ERROR;
            this.log(message as LoggerMessage<T>);
        } else {
            this.log({ level: LoggerLevel.ERROR, message });
        }
    }

    /**
     * Helper method to emit a message at the debug level.
     *
     * @param {LoggerMessage<T> | string | T} message
     */
    public info<T>(message: LoggerMessage<T> | T | string): void {
        if (message['message']) {
            (message as LoggerMessage<T>).level = LoggerLevel.INFO;
            this.log(message as LoggerMessage<T>);
        } else {
            this.log({ level: LoggerLevel.INFO, message });
        }
    }

    /**
     * Helper method to emit a message at the debug level.
     *
     * @param {LoggerMessage<T> | string | T} message
     */
    public debug<T>(message: LoggerMessage<T> | T | string): void {
        if (message['message']) {
            (message as LoggerMessage<T>).level = LoggerLevel.DEBUG;
            this.log(message as LoggerMessage<T>);
        } else {
            this.log({ level: LoggerLevel.DEBUG, message });
        }
    }

    /**
     * Helper method to emit a message at the WARNING level.
     *
     * @param {LoggerMessage<T> | string | T} message
     */
    public warning<T>(message: LoggerMessage<T> | T | string): void {
        if (message['message']) {
            (message as LoggerMessage<T>).level = LoggerLevel.WARNING;
            this.log(message as LoggerMessage<T>);
        } else {
            this.log({ level: LoggerLevel.WARNING, message });
        }
    }

    /**
     * Helper method to emit a message at the critical level.
     *
     * @param {LoggerMessage<T> | string | T} message
     */
    public critical<T>(message: LoggerMessage<T> | T | string): void {
        if (message['message']) {
            (message as LoggerMessage<T>).level = LoggerLevel.CRITICAL;
            this.log(message as LoggerMessage<T>);
        } else {
            this.log({ level: LoggerLevel.CRITICAL, message });
        }
    }
}
