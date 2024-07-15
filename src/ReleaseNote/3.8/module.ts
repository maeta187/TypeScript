export class Person {
  static species = 'Homo sapiens'
  static isAdult(age: number) {
    if (age > 17) return true
    return false
  }
  readonly id: number = 32
  constructor(
    readonly name: string,
    protected age: number
  ) {}
  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`)
  }
  incrementAge() {
    this.age++
  }
}
