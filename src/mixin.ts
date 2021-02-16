
interface Mixin<B extends object, M extends object> {
  to(base: B): M & B
}

// export function mixin<B extends object, M extends object = object>(mixing: ThisType<B> & M): Mixin<B, M> {
//   return {
//     to(base: B): M & B {
//       const cln = Object.create(base)
//
//       return Object.assign(cln, mixing)
//     }
//   }
// }
export const mixin = <B extends object>() => <M extends object>(mixing: ThisType<B> & M): Mixin<B, M> => ({
  to(base: B): M & B {
    const cln = Object.create(base)

    return Object.assign(cln, mixing)
  },
})
