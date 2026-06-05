import toCondition from "./toCondition"

describe("Weather > toWeather", () => {
  it("works with 0", () => {
    expect(toCondition(0)).toEqual("Clear")
  })

  it("works with -1", () => {
    expect(toCondition(-1)).toEqual("Unknown")
  })
})
