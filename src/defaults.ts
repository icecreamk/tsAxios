import { AxiosRequestConfig } from './types/index'
import { processHeaders } from './helpers/headers'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  // xsrfCookieName: 'XSRF-TOKEN',

  // xsrfHeaderName: 'X-XSRF-TOKEN',

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF_TOKEN', // 存储token的cookie名称
  xsrfHeaderName: 'x-XSRF-TOKEN', // token对应的header名称

  // 1.判断 withCredentials为true 或者是同域请求，才会请求headers中添加xsrf相关字段
  // 2.判断诚诚，从cookie中读取xsrf的token值
  // 3.若取到值，将它添加到请求headers的xsrf相关字段中

  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function (data: any): any {
      return transformResponse(data)
    }
  ],

  // validateStatus(status: number): boolean {
  //   return status >= 200 && status < 300
  // }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
