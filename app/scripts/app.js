import 'babel-polyfill'

import defaultImport from './module1.js'
import { second as namedImport } from './module2.js'

console.log('console log from app.js')
defaultImport()
namedImport()

const test = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log(`${ i + 1 } async/await support`)
  }
}
test()
