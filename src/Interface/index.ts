interface Nameable {
  name: string
}

/**
 * ユニオン型にすると必ずそのプロパティーが必要だが、オプショナルプロパティにすると、そのプロパティ＝がなくてもエラーにならない
 */
type NameableTYpe = {
  name: string
  nickName?: string
}

const nameable: NameableTYpe = {
  name: 'Quill'
}

/**
 * interfaceは他のinterfaceやtypeを継承できる
 * 同じプロパティを代入できるかぎり代入可能
 */
interface Human extends Nameable {
  name: string
  age: number
  // メソッドだけに適用できる型定義
  greeting(message: string): void
}

/**
 * HumanType内のnameがnumberだったとしてもエラーは起きない
 */
type HumanType = {
  // name: number
  age: number
  // メソッドだけに適用できる型定義
  greeting(message: string): void
} & NameableTYpe

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
 * interface側の値がreadonlyだとしてもclassには影響しない
 */
class Developer implements HumanType {
  constructor(
    public name: string,
    public age: number,
    public experience: number,
    public initName?: string
  ) {}
  greeting(message = 'hello') {
    console.log(message)
  }
}

/**
 * 構造的部分型
 * HumanにexperienceがなくてもHumanに書かれている型を満たしているのでエラーが起きない
 */
const tmpDeveloper = {
  name: 'Quill',
  age: 29,
  experience: 3,
  greeting(message?: string) {
    console.log(message)
  }
}

/**
 * nameの上書きはできないが、新しいオブジェクトでの上書きは可能
 */
const user: Human = tmpDeveloper

/**
 * 大元はHumanの型を参照しているが、Developerのnameはpublicなので再代入が可能
 */
const developer = new Developer('Quill', 30, 3, 'initName')
developer.name = 'Hello'

/**
 * interfaceで関数の型を指定できる
 * ただ、オブジェクトと混同してしまう可能性もある
 */
interface addFunc {
  (num1: number, num2: number): number
}
const addFunc: addFunc = (n1: number, n2: number) => {
  return n1 + n2
}

export const checkInterface = () => {
  console.log(human)
  console.log(user)
  console.log(developer)
  console.log(addFunc(1, 1))
  console.log(nameable)
}
