type objectType = {
  name: string
  age: number
}

const object: objectType = {
  name: 'John',
  age: 20
}

export const checkObjectType = () => {
  console.log(object)
}
