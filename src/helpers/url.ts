import { isDate, isPlainObject } from "./util"
import { parseHeaders } from "./headers"

interface URLOrigin {
  protocol: string,
  host: string
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?:any): string {

  // 需要处理的情况：
  // 参数为数组 http://xxx.api?a[]=1&a[]=2
  // 参数为对象 a:{name: 'kkk'} => 将{name: 'kkk'} encode的结果赋值给参数a
  // 参数为a: date 将date.toISOString()后赋值给参数a
  // 特殊字符允许出现在url中，不被encode。空格会被转成+
  // 空值忽略 null和undefined的值不会被添加到url中
  // url中的哈希标记会被丢弃
  // 保留url中的参数，重复的参数会追加在后面不会被覆盖

  if(!params) {
    return url
  }
  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    const val = params[key]

    if (val === null || typeof val === 'undefined') {
      // 跳出当前循环，进入下一个循环
      return
    }

    // 统一转换成数组
    let values = []
    if(Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach((val) => {
      if(isDate(val)) {
        val = val.toISOString()
      } else if(isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let  serializeParams = parts.join('&')

  if(serializeParams) {
    const markIdx = url.indexOf('#')
    if(markIdx !== -1) {
      url = url.slice(0, markIdx)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializeParams
  }

  return url
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}

// 通过a标签 解析host protocol
const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const {protocol, host} = urlParsingNode
  return {
    protocol,
    host
  }
}
