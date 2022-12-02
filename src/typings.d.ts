declare namespace API {
  type RequestResult<T, R> = {
    data: T;
    code?: number;
    msg?: string | null;
  } & R;
  type RequestProps = {
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
}