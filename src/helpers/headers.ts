import { isPlainObject, deepMerge } from "./util";
import { Method } from "../types";

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

export function parseHeaders(headers: string):any {
  let parsed = Object.create(null)
  if(!headers) {
    return parsed
  }

  // 以回车和换行符分割成数组
  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()

    if(!key) {
      return
    }
    if(val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}

// 扁平化headers
// headers: {
//   common: {
//     A: ''
//   },
//   post: {
//     B: ''
//   }
// }
// 扁平化为：
// headers: {
//   A: '',
//   B: ''
// }
export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
