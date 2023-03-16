class Person {
  // name: string
  // private age: number
  /**
   * Classのプロパティはconstructor()に書かれたもの
   * constructor()の引数に書くことで初期化を省力でき、constructor()の上部に書いていた型定義も不要
   */
  constructor(public name: string, private age: number) {
    /**
     * thisは実行された場所で依存する(変わる)
     * this.name = initName
     * this.age = initAge
     */
  }

  // TypeScriptは第一引数にthisを伝えることができる(第一引数にしか書けない)
  // greeting(this: { name: string }) {
  //   console.log(`Hello! My name is ${this.name}`)
  // }
  // Class作り出すインスタンスを表す型を同時に作る
  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`)
  }
  // アロー関数は定義時に決まる(インスタンス化)
  // greeting = () => {
  //   console.log(`Hello! My name is ${this.name}`)
  // }

  incrementAge() {
    this.age++
  }
}

const person = new Person('Quill', 30)

// const anotherQuill = {
//   // nameが無いとgreeting()で参照するthis.nameはundefinedとなる
//   name: 'anotherQuill',
//   greeting: person.greeting.bind(person),
//   incrementAge: person.incrementAge.bind(person)
// }
export const checkClass = () => {
  // console.log(person)
  person.greeting()
  // anotherQuill.greeting()
}
