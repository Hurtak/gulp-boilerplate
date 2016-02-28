import defaultImport from './module1.js'
import { second as namedImport } from './module2.js'

console.log('console log from app.js')
defaultImport()
namedImport()

console.log('\n\n\n')

const obj1 = { a: 1, b: 2, c: { ca: 1, cb: 2 } }
const obj2 = {
  ...obj1,
  c: {
    ...obj1.c,
    ca: 1000
  }
}
console.log('object rest/spread', obj2)

console.log('\n\n\n')

const asyncFuntion = async () => {
  await new Promise(resolve => setTimeout(resolve, 500))
  console.log('correct error line numbers even in async functions:')
  console.log(undefinedVariable)
}
asyncFuntion()
