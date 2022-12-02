import InterceptorManager from './InterceptorManager';
import dispatchRequest from './request';
import './typings';

export type RequestProps = Partial<API.RequestProps>;

class AxiosFetch<R> {
  defaults: RequestProps = {
    url: '',
    baseUrl: '',
    header: {
      'content-type': 'application/json;charset=UTF-8',
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    custom: {},
    timeout: 6e4,
  };
  interceptors: { [key in 'request' | 'response']: InterceptorManager };
  constructor(instanceConfig: RequestProps = {})  {
    this.defaults = { ...this.defaults, ...instanceConfig };
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }
  private static mergeConfig(opt: RequestProps, config: RequestProps): RequestProps {
    opt.baseUrl = config.baseUrl;
    opt.responseType = opt.responseType || config.responseType;
    opt.timeout = opt.timeout || config.timeout;
    opt.url = opt.url || '';
    opt.data = opt.data || {};
    opt.params = opt.params || {};
    opt.header = opt.header || config.header;
    opt.method = opt.method || config.method;
    opt.custom = { ...config.custom, ...(opt.custom || {}) };
    return opt;
  }
  create(instanceConfig?: RequestProps) {
    return new AxiosFetch(instanceConfig);
  }
  request<T>(
    configOrUrl?: string | RequestProps,
    opt?: RequestProps,
  ): Promise<API.RequestResult<T, R>> {
    if (typeof configOrUrl === 'string') {
      opt = opt || { url: '' };
      opt.url = configOrUrl;
    } else {
      opt = configOrUrl || this.defaults;
    }
    opt = AxiosFetch.mergeConfig(opt as RequestProps, this.defaults);
    const chain: (undefined | Function)[] = [dispatchRequest, undefined];
    this.interceptors.response.forEach(({ fulfilled, rejected }) => {
      chain.push(fulfilled, rejected);
    });
    this.interceptors.request.forEach(({ fulfilled, rejected }) => {
      chain.unshift(fulfilled, rejected);
    });
    let promise: Promise<any> = Promise.resolve(opt);
    while (chain.length) {
      // @ts-ignore
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  get<T>(url: string, data: Record<string, any> = {}, opt: Partial<RequestProps> = {}) {
    return this.request<T>({ ...opt, params: data, url, method: 'GET' });
  }
  post<T>(url: string, data: Record<string, any> = {}, opt: Partial<RequestProps> = {}) {
    return this.request<T>({ ...opt, data, url, method: 'POST' });
  }
  put<T>(url: string, data: Record<string, any> = {}, opt: Partial<RequestProps> = {}) {
    return this.request<T>({ ...opt, data, url, method: 'PUT' });
  }
  delete<T>(url: string, data: Record<string, any> = {}, opt: Partial<RequestProps> = {}) {
    return this.request<T>({ ...opt, data, url, method: 'DELETE' });
  }
  down<T>(url: string, data: Record<string, any> = {}, opt: Partial<RequestProps> = {}) {
    return this.request<T>({ ...opt, data, url, method: 'DOWN' });
  }
}

const axios = new AxiosFetch<API.RequestProps>();
// @ts-ignore
if(window && !window.axios) window.axios = axios;

export default axios;
// // @ts-ognore
// if(module.exports) module.exports = axios