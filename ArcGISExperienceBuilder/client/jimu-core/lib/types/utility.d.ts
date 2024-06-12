import { type IItem } from '@esri/arcgis-rest-types';
import { type GPTaskInfo } from './app-config';
export interface Utility {
    utilityId: string;
    url: string;
    itemInfo?: IItem;
    tasks?: GPTaskInfo[];
}
