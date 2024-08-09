export const checkUsing = () => {
  // usingを使用する場合は[Symbol.dispose]() {}で囲む
  // const foo = (value: string) => {
  //   // 呼ばれたタイミングで即実行される
  //   console.log('foo')
  //   return {
  //     // 呼ばれた回数分呼ばれるが逆順で呼ばれる(2,1)
  //     [Symbol.dispose]: () => {
  //       console.log(`call foo!! ${value}`)
  //     }
  //   }
  // }

  // const bar = () => {
  //   console.log('call bar!!')
  // }

  // using fooFunc = foo('1')
  // {
  //   console.log('in scope')
  //   using fooFunc = foo('2')
  //   // 通常の関数を代入しようとするとエラーになる
  //   // using barFunc = bar()
  //   console.log('out scope')
  // }

  // console.log('Hello Wold')

  // class ErrorA extends Error {
  //   name = 'ErrorA'
  // }
  // class ErrorB extends Error {
  //   name = 'ErrorB'
  // }
  // function throwY(id: string) {
  //   return {
  //     [Symbol.dispose]() {
  //       throw new ErrorA(`Error from ${id}`)
  //     }
  //   }
  // }
  // function func() {
  //   using a = throwY('a')
  //   throw new ErrorB('oops!')
  // }
  // try {
  //   func()
  //   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // } catch (e: any) {
  //   console.log(e.name) // SuppressedError
  //   console.log(e.message) // An error was suppressed during disposal.
  //   // error: 最初にスローされたエラー
  //   console.log(e.error.name) // ErrorA
  //   console.log(e.error.message) // Error from a
  //   // error: 最後にスローされたエラー
  //   console.log(e.suppressed.name) // ErrorB
  //   console.log(e.suppressed.message) // oops!
  // }

  // 非同期処理の場合
  async function doWork() {
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  function loggy(id: string): AsyncDisposable {
    console.log(`Constructing ${id}`)
    return {
      async [Symbol.asyncDispose]() {
        console.log(`Disposing (async) ${id}`)
        await doWork()
      }
    }
  }
  async function func() {
    await using a = loggy('a')
    await using b = loggy('b')
    {
      await using c = loggy('c')
      await using d = loggy('d')
    }
    await using e = loggy('e')
    return
  }
  func()
}
