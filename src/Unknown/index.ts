let unknownInput: unknown

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
let anyInput: any
let text: string

// unknown型の変数へ代入はできる
unknownInput = 30
unknownInput = true
unknownInput = 'hello'

// 別の型宣言された変数への代入はできない(unknownInputが最終的にstring側であっても)
// text = unknownInput

// anyは型宣言した変数であっても代入できる(anyInputが最終的にstring型でなくても)
text = ''
anyInput = 30
anyInput = true
// anyInput = 'hello'
text = anyInput // true

// ifでunknownInputの型が比較した型とtrueならその型に合う変数へ代入できる
if (typeof unknownInput === 'string') {
  text = unknownInput // hello
}

export const checkUnknown = () => {
  console.log({ unknownInput })
  console.log({ text })
}
