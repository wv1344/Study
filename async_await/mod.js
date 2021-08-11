/**
 * 将实例放到顶层对象 global 
 * 
 */

function A(){
  this.foo = 'hello'
}

if(!global._foo){
  global._foo = new A();
}

module.exports = global._foo;

/**
 * const a = require('./mod.js');
 * console.log(a.foo);
 * 
 * 在其他文件中加载 mod.js
 * 可以保证变量a在任何时候加载的都是 A 的同一个实例
 * 
 * 
 * 但是有一个问题，全局变量 global._foo 是可写的，任何文件都可以修改
 * 
 * 
 * global._foo = { foo: 'world' };
 * const a = require('./mod.js');
 * console.log(a.foo);
 * 
 * 这段代码，会使得加载了 mod.js 的脚本都失效
 * 
 */

/**
 * 防止其他文件修改定义的全局变量可以使用 Symbol
 * Symbol 唯一符号，全局中变量为 Symbol ，确保其他文件不会被无意修改
 * 
 * const FOO_KEY = Symbol.for('foo')
 * 
 * function A() {
 *   this.foo = 'hello'
 * }
 * 
 * if(!global[FOO_KEY]){
 *   global[FOO_KEY] = new A();
 * }
 * 
 * module.exports = global[FOO_KEY]
 * 
 */