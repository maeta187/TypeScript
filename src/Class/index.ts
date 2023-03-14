class Person {
  name: string
  // Classのプロパティはconstructor()に書かれたもの
  constructor(initName: string) {
    // thisは実行された場所で依存する(変わる)
    this.name = initName
  }

  // TypeScriptは第一引数にthisを伝えることができる(第一引数にしか書けない)
  greeting(this: { name: string }) {
    console.log(`Hello! My name is ${this.name}`)
  }
  // アロー関数は定義時に決まる(インスタンス化)
  // greeting = () => {
  //   console.log(`Hello! My name is ${this.name}`)
  // }
}

const person = new Person('Quill')

const anotherQuill = {
  // nameが無いとgreeting()で参照するthis.nameはundefinedとなる
  name: 'anotherQuill',
  anotherGreeting: person.greeting
}
export const checkClass = () => {
  // console.log(person)
  person.greeting()
  anotherQuill.anotherGreeting()
}
