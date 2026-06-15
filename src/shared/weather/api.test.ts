import { getCurrent, getForecast } from "./api"

describe("Weather API", () => {
  const originalFetch = global.fetch
  const fetchMock = jest.fn<
    ReturnType<typeof fetch>,
    Parameters<typeof fetch>
  >()

  function getRequestedUrl(): string {
    const request = fetchMock.mock.calls[0]?.[0]
    if (!request) {
      throw new Error("Expected fetch to be called")
    }

    if (typeof request === "string") {
      return request
    }

    if (request instanceof URL) {
      return request.toString()
    }

    return request.url
  }

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = fetchMock
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  it("maps current weather data from the API response", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          current: {
            weather_code: 63,
            temperature_2m: 22.5,
            wind_speed_10m: 17.2,
            relative_humidity_2m: 71,
            uv_index: 6,
          },
        }),
      ),
    )

    const location = {
      name: "Barcelona",
      latitude: 41.385063,
      longitude: 2.173404,
    }

    await expect(getCurrent(location)).resolves.toEqual({
      condition: "Moderate Rain",
      temperature: 22.5,
      wind: 17.2,
      humidity: 71,
      uv: 6,
    })

    const url = getRequestedUrl()
    expect(url).toContain("api.open-meteo.com/v1/forecast")
    expect(url).toContain(
      "current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index",
    )
    expect(url).toContain("latitude=41.385063")
    expect(url).toContain("longitude=2.173404")
  })

  it("maps forecast data from the API response", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          daily: {
            time: ["2026-06-05", "2026-06-06"],
            temperature_2m_max: [28.3, 26.7],
            temperature_2m_min: [18.1, 17.4],
            weather_code: [0, 63],
          },
        }),
      ),
    )

    const location = {
      name: "Barcelona",
      latitude: 41.385063,
      longitude: 2.173404,
    }

    await expect(getForecast(location)).resolves.toEqual([
      {
        day: "2026-06-05",
        temperatureMax: 28.3,
        temperatureMin: 18.1,
        condition: "Clear",
      },
      {
        day: "2026-06-06",
        temperatureMax: 26.7,
        temperatureMin: 17.4,
        condition: "Moderate Rain",
      },
    ])

    const url = getRequestedUrl()
    expect(url).toContain("api.open-meteo.com/v1/forecast")
    expect(url).toContain(
      "daily=temperature_2m_max,temperature_2m_min,weather_code",
    )
    expect(url).toContain("latitude=41.385063")
    expect(url).toContain("longitude=2.173404")
  })
})
