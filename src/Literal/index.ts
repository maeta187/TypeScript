// Expected a `const` assertion instead of a literal type annotation
// const foo: 'foo' = 'foo'

const foo = 'foo' as const

type ButtonVariant = 'primary' | 'secondary' | 'danger'

// 'button' is assigned a value but never used.
// const button: ButtonVariant = 'red'

const buttonLiteral: ButtonVariant = 'primary'

export const checkLiteral = () => {
  console.log(foo)
  console.log(buttonLiteral)
}
