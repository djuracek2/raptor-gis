import type { Template } from '../templates/type';
/**
 *
 * @param templateJson
 * @param widgetId widget name is used to get translation. This is for the case that widget has internal templates such as list, card, etc.
 *    for other templates, pass null
 * @param defaultMessages
 */
export declare function processForTemplate(templateJson: Template, widgetId: string, defaultMessages: any): Template;
