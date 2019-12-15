import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

// 请求发送需要1秒，在请求发送之前取消
setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  // 该请求无法发送，应为token已经被使用
  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

// 发送需要1秒，还未发送成功就被取消
setTimeout(() => {
  cancel()
}, 200)

let cancel1: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

// 发送需要1秒，而1.5秒取消时已经发送成功
setTimeout(() => {
  cancel1()
}, 1500)
