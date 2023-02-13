const tuple: [string, number, boolean] = ['foo', 1234, false]

function foo(): [number, string, boolean] {
  return [1, 'ok', true]
}

const fooList: [number, string, boolean] = foo()

// Tuple型の返り値を分割代入で受け取り
const [num, str, bool]: [number, string, boolean] = foo()
const [fooNum, ...bar]: [number, string, boolean] = foo()

const checkTuple = () => {
  console.log({ tuple })
  console.log({ fooList })
  console.log({ num })
  console.log({ str })
  console.log({ bool })
  console.log({ fooNum })
  console.log({ bar })
}

export default checkTuple
