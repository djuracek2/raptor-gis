import { type IMAppConfig, type ElementType } from 'jimu-core';
import type { Template } from '../templates/type';
export declare function getDuplicateLabel(appConfig: IMAppConfig, type: ElementType, label: string): string;
export declare function makeSureTemplateConfig(templateJson: Template): Promise<void>;
