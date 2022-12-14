import InterceptorManager from './InterceptorManager';
import './typings';
export type RequestProps = Partial<API.RequestProps>;
declare class AxiosFetch<R> {
    defaults: RequestProps;
    interceptors: {
        [key in 'request' | 'response']: InterceptorManager;
    };
    constructor(instanceConfig?: RequestProps);
    private static mergeConfig;
    create(instanceConfig?: Partial<RequestProps>): AxiosFetch<unknown>;
    request<T>(configOrUrl?: string | RequestProps, opt?: RequestProps): Promise<API.RequestResult<T, R>>;
    get<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    post<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    put<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    delete<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
    down<T>(url: string, data?: Record<string, any>, opt?: Partial<RequestProps>): Promise<API.RequestResult<T, R>>;
}
declare const axios: AxiosFetch<API.RequestProps>;
export default axios;
