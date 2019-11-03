import { isPlainObject } from "./util";

// Content-Type大小写规范化
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if(!headers) {
    return
  }
  Object.keys(headers).forEach((name) => {
    // 本身不相等，转换成大写后相等
    if(name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any):any {
  normalizeHeaderName(headers, 'Content-Type')
  if(isPlainObject(data)) {
    if(headers && headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
  }
  return headers
}
