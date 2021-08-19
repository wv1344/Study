
const MyPromise = require('./promise2')

const promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  // throw new Error('错了错了')
  resolve('success');
  // },1000)
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve('other');
  })
}




promise.then(val => {
  console.log(1);
  console.log('resolve', val)
  return other()
}).then(val => {
  console.log(2234)
  console.log('then', val)
}).then(val => {
  console.log('999')
}).then(val => {
  console.log(val);
})

