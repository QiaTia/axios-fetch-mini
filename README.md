# Axios-Fetch-Mini

Axios Fetch 实现的极简包

## 开始使用

```js
const http = axios.create({});
/** Response拦截 */
http.interceptors.response.use(({ data })=> data, e => e);

http.get('https://qiatia.cn/tia/dc/random', { num })
  .then(({ data })=>{
    console.log(data);
  })
  .catch(console.log);

http.post('/hello')
  .then(console.log)
  .catch(console.log);

http.put('/hello')
  .then(console.log)
  .catch(console.log);

http.down('/hello')
  .then(console.log)
  .catch(console.log);

http.delete('hello')
  .then(console.log)
  .catch(console.log);
```

最近想把我官网优化一下, 以前无脑上了`react`的`企业级`框架`umi`,  方便倒是很方便, 啥都配上了, 但是文件体积是真的大啊, 没两个页面打开都要好久, 这次打算做极致点, 争取把打包文件做到很小. 打算用`preact`来搞,  然后上一个路由, 然后想了下, `axios`也是一个历史承重的框架, 兼容了`xhr`和`node`的`http`. 以前我都写了几篇`axios`实现的文章, 那还等啥先自己写一个`axios`的`fetch`实现, 抛弃历史包袱做到最小.
<!-- more -->
### 搭建环境

#### 搭建`rollup`打包`TypeScript`环境

本来我是想用`webpack`, 但是打包完成才发现有啥问题, 现在也忘了是啥问题, 不过`rollup`开发`js`库更为合适, 比较webpack设计之初就说开发前端工程项目的

```sh
pnpm init
pnpm install -D rollup typescript @rollup/plugin-commonjs rollup-plugin-terser rollup-plugin-typescript2
```

配置`rollup`

```sh
touch rollup.config.js
```

rollup.config.js

```javascript
// 导入依赖
const { terser } = require('rollup-plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');

// tsconfig.json合并选项
// 一般来说默认使用项目的tsconfig.json，如果有个别需要修改的如下，可以在此修改
const override = {
  compilerOptions: {
    module: 'ESNext'
  }
};

module.exports = {
  // 项目入口
  input: 'src/index.ts',
  // 打包后的出口和设置
  output: {
    file: 'dist/index.js',
    format: 'esm',
    sourcemap: false,
    exports: 'default',
  },
  // 使用的插件
  // 注意，这里的插件使用是有顺序的，先把ts编译为js，然后查找依赖，最后压缩
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: override
    }),
    commonjs(),
    terser()
  ],
}
```

配置`TypeScript`

```sh
touch tsconfig.json
```

tsconfig.json

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "target": "ESNext",
    "lib": [
      "ESNext",
    ],
    "sourceMap": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "declaration": true,
    "declarationDir": "dist/types",
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "test/**/*"
  ]
}
```

### Code

`axios`是底层拦截器是靠`Promise`链来实现的, 这部分只要理解了会很简单, 然后重要的就是合并配置项, 适配器部分. 这些一完成也就差不多了.

`InterceptorManager.ts`拦截器模块

```typescript
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
```

`Adapter.ts`适配器模块

```typescript
import { posUrl, stringify } from './utils';
export default async function (config: ConfigProp ): Promise<Required<ResponseProp>>  {
  const newConfig = {
    ...config,
    url: posUrl(config.url) ? config.url : `${config.baseUrl || ''}${config.url || ''}`,
  };
  if (JSON.stringify(config.params) !== '{}') {
    const params = stringify(config.params as Record<string, string>);
    newConfig.url += newConfig.url.indexOf('?') === -1 ? `?${params}` : `&${params}`;
  }

  const response: ResponseProp = await window.fetch(newConfig.url, newConfig);
  const ContentType = response.headers.get('content-type');
  response.config = config;
  if(ContentType?.includes('json')) 
    response.data = await response.json();
  else 
    response.data = await response.text();
  return response as Required<ResponseProp>;
}
```

`index.ts` 配置默认请求数据, 拦截器对象, 合并配置项

```typescript
class axiosFetch {
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
  interceptors: { 
    request: InterceptorManager<RequestProps>,
    response: InterceptorManager<ResponseProp>
  };
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
  ...
}
```

`index.ts` rquest方法, 主要就是组合`Promise`链

```typescript
class axiosFetch {
  ...
  request<T, R>(
    configOrUrl?: string | RequestProps,
    opt?: RequestProps,
  ): Promise<RequestResult<T, R>> {
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
}
```

后面再定义好其他快捷的`get`, `post`, `put`等请求方式的方法, 一个新鲜出炉的请求库也就出来了, js打包大小`2.03k`, 实现了`axios`大部分功能, 也足够我自己使用了

组后来`github`链接 [axios-fetch-mini](https://github.com/QiaTia/axios-fetch-mini)
