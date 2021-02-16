import { mixinTo } from "@/mixinTo"

describe("mixinTo object", () => {
  it("apply to instance of a class", () => {
    class Num {
      constructor(private readonly value: number) { }

      times(n: Num): Num {
        return new Num(this.value * n.value)
      }

      get asNumber(): number {
        return this.value
      }
    }
    const five = new Num(5)
    const sut = mixinTo<Num>()({
      plus(n: Num): Num {
        return new Num(this.asNumber + n.asNumber)
      }
    }).apply(five)

    expect(sut.plus(new Num(4)).times(new Num(2))).toStrictEqual(new Num(18))
  })

  it("apply to plain object", () => {
    interface Num {
      value: number
    }
    const five: Num = {
      value: 5,
    }
    const sut = mixinTo<Num>()({
      plus(n: Num): number {
        return this.value + n.value
      }
    }).apply(five)

    expect(sut.plus({ value: 10 })).toStrictEqual(15)
  })
  //
  // it("apply to class", () => {
  //   class Num {
  //     constructor(private readonly value: number) {}
  //
  //     times(n: Num): Num {
  //       return new Num(this.value * n.value)
  //     }
  //     get asNumber(): number {
  //       return this.value
  //     }
  //   }
  //
  //   const sut = mixinTo<Num>()({
  //     add(n: Num): Num {
  //       return new Num(this.asNumber + n.asNumber)
  //     },
  //   }).apply(Num)
  // })
})
