
interface Mixin<B extends object, M extends object> {
  apply(base: B): M & B
}

// export function mixinTo<B extends object, M extends object = object>(mixing: ThisType<B> & M): Mixin<B, M> {
//   return {
//     apply(base: B): M & B {
//       const cln = Object.create(base)
//
//       return Object.assign(cln, mixing)
//     }
//   }
// }
export const mixinTo = <B extends object>() => <M extends object>(mixing: ThisType<B> & M): Mixin<B, M> => ({
  apply(base: B): M & B {
    const cln = Object.create(base)

    return Object.assign(cln, mixing)
  },
})
