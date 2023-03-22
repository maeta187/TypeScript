interface Human {
  name: string
  age: number
  // メソッドだけに適用できる型定義
  greeting(message: string): void
}

const human: Human = {
  name: 'Quill',
  age: 30,
  greeting(message: string) {
    console.log(message)
  }
}

/**
 * implementsは複数定義できる
 * implementsはinterfaceだけでなくtypeも使用できる
 */
class Developer implements Human {
  constructor(
    public name: string,
    public age: number,
    public experience: number
  ) {}
  greeting(message: string) {
    console.log(message)
  }
}

/**
 * 構造的部分型
 * HumanにexperienceがなくてもHumanに書かれている型を満たしているのでエラーが起きない
 */
const user: Human = new Developer('Quill', 30, 3)

export const checkInterface = () => {
  console.log(human)
  console.log(user)
}
