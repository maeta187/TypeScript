import { checkObjectType } from './Object'
import { cheekArrayType, checkArrayMap } from './Array'
import Tuple from './Tuple'
import { cheekLiteral } from './Literal'
import { checkFunction, arrowFunction, callbackFunction } from './Function'

checkObjectType()
cheekArrayType()
checkArrayMap()
Tuple()
cheekLiteral()
checkFunction()
arrowFunction('arrowFunction')
callbackFunction(2, (cbFunction) => {
  return cbFunction * 10
})
