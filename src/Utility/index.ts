interface Todo {
  title: string
  text: string
}

/**
 * Partial
 * 引数で渡された型をすべてオプショナルプロパティにする
 */
type Todoable = Partial<Todo>

/**
 * Readonly
 * 引数で渡された型をすべてReadonlyにする
 */
type ReadTodo = Readonly<Todo>

// export const checkUtility = () => {}
