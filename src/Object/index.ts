type ObjectType = {
  name: string
  age: number
}

const object: ObjectType = {
  name: 'John',
  age: 20
}

export const checkObjectType = () => {
  console.log({ object })
  Object.values(object).forEach((value) => {
    console.log(value)
  })
}
