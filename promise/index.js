
const MyPromise = require('./promise')

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
  // throw new Error('错了错了')
  resolve('success');
  },1000)
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve('other');
  })
}

// const p1 = promise.then(val => {
//   console.log(val, 's123123')
//   return p1
// },e => {
//   console.log('123123',e)
// })


promise.then(val => {
  console.log(1);
  console.log('resolve', val)
  throw new Error('错了错了')
},e => {
  console.log(e)
}).then(val => {
  console.log(2234)
  console.log('then', val)
},e => {
  console.log(e);
}).then(val => {
  console.log('999')
  return new MyPromise((resolve, reject) => {
    resolve('nihaoya')
  })
}).then(val => {
  console.log(val);
})