type CallBack = (config: any) => any;

/** InterceptorManager */
export default class intercept {
  private handlers: { rejected?: CallBack; fulfilled: CallBack }[] = [];
  public use(fulfilled: CallBack, rejected?: CallBack) {
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
