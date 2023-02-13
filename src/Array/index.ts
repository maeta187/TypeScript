const array: number[] = [0, 1, 2, 3, 4, 5]

export const cheekArrayType = () => {
  console.log(array)
}

const arrayMap = [...Array(100)].map((_, i) => i)

export const checkArrayMap = () => {
  console.log(arrayMap)
}
