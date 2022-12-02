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
