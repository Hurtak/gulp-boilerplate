import defaultImport from './module1.js'
import { second as namedImport } from './module2.js'

console.log('console log from app.js')
defaultImport()
namedImport()

const x = { a: 1, b: 2, c: { ca: 1 } }
const y = {
  ...x,
  b: 10
}

console.log(y)

console.log(pre)
