import { posUrl, stringify } from './utils';
import './typings';

interface ConfigProp extends API.RequestInit {
  baseUrl: string, url: string, params: Record<string, any>
}
interface ResponseProp extends API.Response {
  data?: any, 
  config?: ConfigProp 
}

export default async function (config: ConfigProp ): Promise<Required<ResponseProp>>  {
  const newConfig = {
    ...config,
    url: posUrl(config.url) ? config.url : `${config.baseUrl || ''}${config.url || ''}`,
  };
  if (JSON.stringify(config.params) !== '{}') {
    const params = stringify(config.params as Record<string, string>);
    newConfig.url += newConfig.url.indexOf('?') === -1 ? `?${params}` : `&${params}`;
  }
  // @ts-ignore
  const response: ResponseProp = await window.fetch(newConfig.url, newConfig);
  const ContentType = response.headers.get('content-type');
  response.config = config;
  if(ContentType?.includes('json')) 
    response.data = await response.json();
  else 
    response.data = await response.text();
  return response as Required<ResponseProp>;
}
