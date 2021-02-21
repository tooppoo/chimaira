import { mixinTo } from "@/mixin-to"

describe("mixinTo class", () => {
  describe("apply an object", () => {
    class Num {
      static test: number = 1
      constructor(private readonly value: number) { }

      times(n: Num): Num {
        return new Num(this.value * n.value)
      }

      get asNumber(): number {
        return this.value
      }
    }

    const MixedClass = mixinTo(Num).apply({
      plus(n: Num) {
        return new MixedClass(this.asNumber + n.asNumber)
      }
    })

    it("can respond to method in mixin", () => {
      const sut = new MixedClass(5)

      expect(sut.plus(new Num(4)).times(new Num(2)).asNumber).toStrictEqual(18)
    })
    it("can respond to method in base class", () => {
      const sut = new MixedClass(5)

      expect(sut.times(new Num(2)).asNumber).toStrictEqual(10)
    })
    it("can respond to static property in base class", () => {
      expect(MixedClass.test).toStrictEqual(Num.test)
    })

    it("can nest mixin", () => {
      const NestMixedClass = mixinTo(MixedClass).apply({
        pow(n: number) {
          return new NestMixedClass(this.asNumber ** n)
        }
      })

      const sut = new NestMixedClass(5)

      expect(sut.pow(3).asNumber).toStrictEqual(125)
    })
  })
})
