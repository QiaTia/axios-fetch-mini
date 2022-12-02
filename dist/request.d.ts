import './typings';
interface ConfigProp extends API.RequestInit {
    baseUrl: string;
    url: string;
    params: Record<string, any>;
}
interface ResponseProp extends API.Response {
    data?: any;
    config?: ConfigProp;
}
export default function (config: ConfigProp): Promise<Required<ResponseProp>>;
export {};
