export function stringify(params: Record<string, any>) {
  return Object.keys(params)
    .filter(t => params[t] != undefined)
    .map(i => `${i}=${params[i]}`)
    .join('&');
}

/* 判断url是否为绝对路径 */
export const posUrl = (url = '') => /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
