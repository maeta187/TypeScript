const array = [0, 1, 2, 3, 4, 5]
// プレーンなオブジェクトを生成
const myObj = Object.groupBy(array, (num, index) => {
  return num % 2 === 0 ? 'even' : 'odd'
})

// Mapを生成
const myMap = Map.groupBy(array, (num, index) => {
  return num % 2 === 0 ? 'even' : 'odd'
})

export const checkGroupBy = () => {
  console.log(myObj)
  console.log(myMap)
  // myMap.forEach((v) => console.log(v))
}
