const num1 = 1
const num2 = 2

const addNum = (foo: number, bar: number): number => {
  return foo + bar
}

export const voidFunction = (foo: number, bar: number): void => {
  foo + bar
}

// 基本的には使わない
export const undefinedFunction = (): undefined => {
  console.log('undefinedFunction')
  return
}

const doubleNum: (num: number) => number = (value) => value * 2

export const arrowFunction = (value: string) =>
  console.log({ arrowFunction: value })

export const callbackFunction = (num: number, cb: (num: number) => number) => {
  const cdFunction = cb(num * 2)
  console.log({ cdFunction })
}

export const checkFunction = () => {
  console.log({ addNum: addNum(num1, num2) })
  console.log({ doubleNum: doubleNum(num2) })
}
