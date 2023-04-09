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
function toUpperCase(x: string): string
function toUpperCase(x: number): number
function toUpperCase(x: string | number) {
  if (typeof x === 'string') {
    return x.toUpperCase()
  }
  return x
}

/**
 * 関数オーバーロード
 * toUpperCase()の引数がstring型とnumber型のユニオン型かつreturnもxをそのまま返すパターンがあるので型推論もユニオン型となる
 * 型アサーションを使う方法もあるが使い回す時に都度書く必要がある
 * 実行している関数の上に定義し直した関数を書くと、関数のオーバーロードがされる
 * その場合、実際に動く関数の型は認識されなくなる
 */
const upperHello = toUpperCase('hello')

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
  // タグ付きUnion
  kind = 'dog' as const
  speak() {
    console.log('bow-wow')
  }
}

class Bird {
  // タグ付きUnion
  kind = 'bird' as const
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
  switch (pet.kind) {
    case 'bird':
      pet.fly()
  }
  if (pet instanceof Bird) {
    pet.fly()
  }
}

/**
 * 型アサーション
 * 元々持っている型に対して明示的に指定し、指定した型することができる
 * 「<>」を使う方法と「as」を使用した方法がある
 * JSX内で書く場合は「<>」がHTML要素として処理される場合があるので気をつける
 */
// const input = <HTMLInputElement>document.getElementById('input')
// const input = document.getElementById('input') as HTMLInputElement
// input.value = 'initial input value'
;(document.getElementById('input') as HTMLInputElement).value =
  'initial input value'

// Non-null assertion operator
// const input = document.getElementById('input')!
// input.value = 'initial input value'

/**
 * インデックスシグネチャ
 * 型定義されたオブジェクトは後から追加は行えないが、インデックスシグネチャを使用するで型定義されていない要素を追加することができる
 * 追加する際は、インデックスシグネチャで定義された型である必要がある
 * ただし、keyをstring型にし場合でもnumber型が書ける(number型の場合はstring型は書けない)
 * インデックスシグネチャを使用した場合、オブジェクト内の要素を参照する際、存在しない要素を書いてもエラーと認識されなくなるので注意が必要
 */
interface Designer {
  name: string
  [index: string]: string
}

const designer: Designer = {
  name: 'Quill',
  role: 'foo'
}

/**
 * オプショナルチェイン
 * 対象のkeyが存在しない場合がある時に使用する
 * 存在しない場合はundefinedとなる
 * downloadedData.user?.name
 */
interface DownloadedData {
  id: number
  user?: {
    name?: {
      fist: string
      last: string
    }
  }
}

const downloadedData: DownloadedData = {
  id: 1
}

export const checkApply = () => {
  console.log(quill)
  console.log(toUpperCase('quill'))
  describeProfile(worker)
  havePet(new Bird())
}
