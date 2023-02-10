import InterceptorManager from './InterceptorManager';
import { ResponseProp } from './request';
import type * as API from './typings';
export type RequestProps = Partial<API.RequestProps>;
declare class AxiosFetch<R> {
    defaults: RequestProps;
    interceptors: {
        request: InterceptorManager<RequestProps>;
        response: InterceptorManager<ResponseProp>;
    };
    constructor(instanceConfig?: RequestProps);
    private static mergeConfig;
    create(instanceConfig?: RequestProps): AxiosFetch<unknown>;
    request<T>(configOrUrl?: string | RequestProps, opt?: RequestProps): Promise<API.RequestResult<T, R>>;
    get<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    post<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    put<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    delete<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    down<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
}
declare const axios: AxiosFetch<API.RequestProps>;
export default axios;
