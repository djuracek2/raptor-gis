import * as appServices from './app-service';
import * as userServices from './user-service';
export * from './type';
export { getResourceOrigin, initAppConfigOfNewApp, toCreateAppByDefaultTemplate, createAppCallBack } from './app-service/util';
export { appServices, userServices };
