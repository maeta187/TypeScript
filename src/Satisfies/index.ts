// const palette = {
//   red: [255, 0, 0],
//   green: '#00ff00',
//   // blueがタイポしているが気づかないケースがある
//   bleu: [0, 0, 255]
// }

type Colors = 'red' | 'green' | 'blue'
type RGB = [red: number, green: number, blue: number]
// const palette: Record<Colors, string | RGB> = {
//   red: [255, 0, 0],
//   green: '#00ff00',
// // タイポに
//   bleu: [0, 0, 255]
// }

// key名に対して型付けを行うようになったのでタイポには気付けるようになったが、valueはRGBとのユニオン型になり、.toUpperCase（）を使用する際に型のエラーが発生する
// const greenNormalized = palette.green.toUpperCase()
/**
 * @satisfies {Record<Colors, string | RGB>}
 */
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  // タイポするとエラーが発生する
  blue: [0, 0, 255]
  // エラーが発生する
  // purple: ''
} satisfies Record<Colors, string | RGB>
// String型と推論され.toUpperCase()が使用できる
const greenNormalized = palette.green.toUpperCase()

// satisfiesを使用することでオブジェクトのキーをチェックしつつ、value側も型定義される
// 定義された型しか使用することはできないが、使用されている値の型から型推論して型独自のメソッドが使える
// 今回型定義で使用しているRGBのTuple型で定義されるのでred、blueの配列の要素は3つないとエラーになる
