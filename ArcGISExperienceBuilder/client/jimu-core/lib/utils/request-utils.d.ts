import { type UserSession } from '@esri/arcgis-rest-auth';
import { type ExternalResolvablePromise } from '../external-resolvable-promise';
export declare function requestWrapper(desUrl: string, promiseFunc: (session: UserSession) => Promise<any>, retryLimit?: number): Promise<any>;
type CacheableURL = string | RegExp | ((url: string, query: object) => boolean);
/**
 * Register a URL as cacheable. Will cache the request in framework.
 */
export declare function registerCacheableUrl(cacheableUrl: CacheableURL): void;
/**
 * Return the cached request.
 */
export declare function getRequestCache(url: string, query: object): ExternalResolvablePromise;
/**
 * Cache a request.
 */
export declare function setRequestCache(url: string, query: object, promise: ExternalResolvablePromise): void;
/**
 * Delete a request cache.
 */
export declare function deleteRequestCache(url: string, query: object): void;
/**
 * Return whether a URL is cacheable, that is to say, have ever registered this URL as cachable.
 */
export declare function isURLCacheable(url: string, query: object): boolean;
export {};
