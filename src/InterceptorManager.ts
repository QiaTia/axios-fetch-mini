type CallBack<T = any> = (config: T) => any;

/** InterceptorManager */
export default class intercept<T = any, F = any> {
  private handlers: { rejected?: CallBack; fulfilled: CallBack }[] = [];
  public use(fulfilled: CallBack<T>, rejected?: CallBack<F>) {
    this.handlers.push({ fulfilled, rejected });
    return this.handlers.length - 1;
  }
  eject(id: number) {
    if (this.handlers[id]) {
      this.handlers.splice(id, 1);
    }
  }
  forEach(fn: CallBack) {
    this.handlers.forEach(fn);
  }
}
