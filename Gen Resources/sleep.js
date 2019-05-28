/**
 * Functions to create sleep function
 *  using Promise and setTimeout
 * 
 */

// Wait function which returns a promise
// Which is resolved anger 'ms' miliseconds
var wait = ms => new Promise((resolve, reject)=>setTimeout(resolve, ms))

// Promise syntax
var prom = wait(2000)  // prom, is a promise
var showdone = ()=>console.warn('done')
prom.then(showdone)


// same thing, using await syntax
await wait(2000)
console.warn('done')