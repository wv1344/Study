
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
  constructor(execute) {
    execute(this.resolve, this.reject)
  }
  status = PENDING

  value = []
  reason = []

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = RESOLVED
      this.value = value
    }
  }

  reject = (reason) => {
    if (this.status === REJECTED) {
      this.status = REJECTED
      this.reason = reason
    }
  }

  then(onFulfilled, onRejected) {
    realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
      
      }
    })
  }
}