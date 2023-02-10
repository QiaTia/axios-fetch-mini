type CallBack<T = any> = (config: T) => any;
/** InterceptorManager */
export default class intercept<T = any, F = any> {
    private handlers;
    use(fulfilled: CallBack<T>, rejected?: CallBack<F>): number;
    eject(id: number): void;
    forEach(fn: CallBack): void;
}
export {};
