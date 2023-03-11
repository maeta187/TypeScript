/**
 * void含めて全く何も返さない場合はnever型を使用する
 * neverを明示的に指定しなかった場合はvoidとなる
 */
export function error(message: string): never {
  throw new Error(message)
}
