import { isPlainObject } from "./util"

export function transformRequest(data: any): any {
  if(isPlainObject(data)) {
    // 需要设置Content-Type为json格式，使得post的data接收到JSON格式的对象
    return JSON.stringify(data)

  }
  return data
}

export function transformResponse(data:any): any {
  if(typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
