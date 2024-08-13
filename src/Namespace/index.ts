/**
 * namespaceで宣言することで複数のenum型を保持することが出来る
 * 何も代入が発生しない場合は自動的にnumber型が定義されるが、string型が代入された要素からは使用できない
 * namespaceを使用した場合、要素にはstring型かnumber型しか使用できない
 */
namespace Fist {
  export enum fooEnum {
    NUM, // 0
    NUM1, // 1
    FOO = 'foo'
  }
  export enum barEnum {
    BAR = 'bar'
  }
}

namespace Second {
  export enum fizzEnum {
    FIZZ = 'fizz'
  }
  export enum buzzEnum {
    BUZZ = 'buzz'
  }
}

const foo = (x: Fist.fooEnum, y: Second.buzzEnum) => {
  console.log(x)
  console.log(y)
  console.log(Fist.fooEnum.NUM)
}

export const checkNamespace = () => {
  foo(Fist.fooEnum.FOO, Second.buzzEnum.BUZZ)
}
