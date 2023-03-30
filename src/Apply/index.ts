// インターセクション型
interface Engineer {
  name: string
  role: string
}

interface Blogger {
  name: string
  follower: number
}

type EngineerBlogger = Engineer & Blogger
// interfaceで書いた場合
// interface EngineerBlogger extends Engineer, Blogger {}

const quill: EngineerBlogger = {
  name: 'Quill',
  role: 'front-end',
  follower: 1000
}

type NumberBoolean = number | boolean
type StringNumber = string | number

/**
 * NumberBooleanとStringNumber内で重複している型が定義される
 * 重複が無ければnever型となり、複数の重複があるとユニオン型になる
 */
// type Mix = NumberBoolean & StringNumber

// タイプガード
/**
 * typeof演算子
 */
function toUpperCase(x: string | number) {
  if (typeof x === 'string') {
    return x.toUpperCase()
  }
  return ''
}

/**
 * in演算子
 */
type NomadWorker = Engineer | Blogger

const worker = {
  name: 'Quill',
  role: 'front-end'
}

function describeProfile(nomadWorker: NomadWorker) {
  console.log(nomadWorker.name)
  if ('role' in nomadWorker) {
    // この処理に入った時にnomadWorkerの型はEngineerとなる
    console.log(nomadWorker.role)
  }
  if ('follower' in nomadWorker) {
    // この処理に入った時にnomadWorkerの型はBloggerとなる
    console.log(nomadWorker.follower)
  }
}

class Dog {
  speak() {
    console.log('bow-wow')
  }
}

class Bird {
  speak() {
    console.log('tweet-tweet')
  }
  fly() {
    console.log('flutter')
  }
}

/**
 * instanceof演算子
 * instanceofを使用する場合はnewで作られたClassのインスタンスである必要がある
 */
type Pet = Dog | Bird
function havePet(pet: Pet) {
  pet.speak()
  if (pet instanceof Bird) {
    pet.fly()
  }
}

export const checkApply = () => {
  console.log(quill)
  console.log(toUpperCase('quill'))
  describeProfile(worker)
  havePet(new Bird())
}
