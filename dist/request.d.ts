interface ConfigProp extends RequestInit {
    baseUrl: string;
    url: string;
    params: Record<string, any>;
}
interface ResponseProp extends Response {
    data?: any;
    config?: ConfigProp;
}
export default function (config: ConfigProp): Promise<Required<ResponseProp>>;
export {};
