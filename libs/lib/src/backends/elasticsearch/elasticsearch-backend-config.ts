import { ClientOptions } from '@elastic/elasticsearch';
import { LoggerLevel } from '../../logger-level';

export interface ElasticsearchBackendConfig {
    name: string;
    level?: LoggerLevel;
    index?: string;
    clientOptions: ClientOptions;
}
