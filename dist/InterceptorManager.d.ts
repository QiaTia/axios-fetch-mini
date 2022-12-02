type CallBack = (config: any) => any;
/** InterceptorManager */
export default class intercept {
    private handlers;
    use(fulfilled: CallBack, rejected?: CallBack): number;
    eject(id: number): void;
    forEach(fn: CallBack): void;
}
export {};
