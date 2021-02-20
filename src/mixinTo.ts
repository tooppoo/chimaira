
type Constructor = new (...args: any[]) => any

type MixedConstructor<T extends Constructor, M> = new (...args: ConstructorParameters<T>) => InstanceType<T> & M

export const mixinTo = <B extends Constructor>(klass: B) => ({
  apply<M extends object>(mixing: ThisType<InstanceType<B>> & M): MixedConstructor<B, M> & B {
    const constructor = function (args: ConstructorParameters<B>): InstanceType<B> & M {
      const ins = new klass(args)

      return Object.assign(ins, mixing)
    }

    return Object.assign(constructor, klass)
  }
})
