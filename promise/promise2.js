
// 定义表示三个状态的常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // executor 执行器
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  // 存储状态的变量，初始值 pending
  status = PENDING;
  // 成功之后的值
  value = null
  // 失败之后的值
  reason = null

  // 存储成功回调函数
  onFulfilledCallbacks = []
  // 存储失败回调函数
  onRejectedCallbacks = []

  resolve = (value) => {
    // 只有等待的状态，才可以执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED
      // 保存成功之后的值
      this.value = value

      // 判断回调函数是否存在，存在就调用
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    // 只有等待的状态，才可以执行状态修改
    if (this.status === PENDING) {
      // 状态修改为失败
      this.status = REJECTED
      // 保存失败的原因
      this.reason = reason

      // 判断回调函数是否存在，存在就调用
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 实现链式调用，创建一个新的promise，然后return出去
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // FULFILLED
        // queueMicrotask(() => {  // 创建一个微任务 等待 promise2 完成初始化
        try {
          // 获取成功回调函数的执行结果
          const x = onFulfilled(this.value);
          // 传入 resolvePromise 集中处理 返回值 x
          resolvePromise(x, resolve, reject);
        } catch (e) {
          reject(e);
        }
        // })
      } else if (this.status === REJECTED) {
        // REJECTED
        // queueMicrotask(() => {
        try {
          const x = onRejected(this.reason)
          resolvePromise(x, resolve, reject)
        } catch (e) {
          reject(e)
        }
        // })
      } else if (this.status === PENDING) {
        // PENDING
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    })
    return promise2
  }
}

function resolvePromise(x, resolve, reject) {
  // 如果传进来的是一个 MyPromise 实例
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise
