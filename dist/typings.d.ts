/// <reference types="node" />
/// <reference types="node" />
interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
}
type HeadersInit = [string, string][] | Record<string, string> | Headers;
declare var Headers: {
    prototype: Headers;
    new (init?: HeadersInit): Headers;
};
export type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
export type RequestResult<T, R> = {
    data: T;
    code?: number;
    msg?: string | null;
} & R;
export type RequestProps = {
    baseUrl?: string;
    header?: Record<string, string | number | boolean | undefined>;
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'DOWN';
    dataType?: string;
    responseType?: string;
    custom?: Record<string, any>;
    timeout?: number;
    url: string;
    data?: Record<string, any>;
    params?: Record<string, string>;
    complete?: (any: any) => void;
};
export type RequestCache = "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload";
export type RequestCredentials = "include" | "omit" | "same-origin";
export type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
export type RequestRedirect = "error" | "follow" | "manual";
export type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
export interface RequestInit {
    /** A BodyInit object or null to set request's body. */
    body?: any;
    /** A string indicating how the request will interact with the browser's cache to set request's cache. */
    cache?: RequestCache;
    /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
    credentials?: RequestCredentials;
    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    headers?: HeadersInit;
    /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
    integrity?: string;
    /** A boolean to set request's keepalive. */
    keepalive?: boolean;
    /** A string to set request's method. */
    method?: string;
    /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
    mode?: RequestMode;
    /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
    redirect?: RequestRedirect;
    /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
    referrer?: string;
    /** A referrer policy to set request's referrerPolicy. */
    referrerPolicy?: ReferrerPolicy;
    /** An AbortSignal to set request's signal. */
    signal?: AbortSignal | null;
    /** Can only be null. Used to disassociate request from any Window. */
    window?: null;
}
/** This Fetch API interface represents the response to a request. */
export interface Body {
    readonly body: any | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<any>;
    json(): Promise<any>;
    text(): Promise<string>;
}
export interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}
export {};
