import { mixin } from "@/mixin"

describe("mixin object", () => {
  it("to instance of a class", () => {
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
    const sut = mixin<Num>()({
      plus(n: Num): Num {
        return new Num(this.asNumber + n.asNumber)
      }
    }).to(five)

    expect(sut.plus(new Num(4)).times(new Num(2))).toStrictEqual(new Num(18))
  })

  it("to plain object", () => {
    interface Num {
      value: number
    }
    const five: Num = {
      value: 5,
    }
    const sut = mixin<Num>()({
      plus(n: Num): number {
        return this.value + n.value
      }
    }).to(five)

    expect(sut.plus({ value: 10 })).toStrictEqual(15)
  })
  //
  // it("to class", () => {
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
  //   const sut = mixin<Num>()({
  //     add(n: Num): Num {
  //       return new Num(this.asNumber + n.asNumber)
  //     },
  //   }).to(Num)
  // })
})
