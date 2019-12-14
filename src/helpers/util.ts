const toString = Object.prototype.toString

export function isDate(val: any): boolean {
  return toString.call(val) === '[object Date]'
}

// typeof '数组 null 对象' 都会返回 'object'
// export function isObject(val: any): boolean {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ; (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
