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
