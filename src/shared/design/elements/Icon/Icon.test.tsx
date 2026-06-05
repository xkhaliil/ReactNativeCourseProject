import { render } from "@testing-library/react-native"

import Icon from "./Icon"

jest.mock("@expo/vector-icons/FontAwesome", () => ({
  __esModule: true,
  default: (): null => null,
}))

describe("Design > Elements > Icon", () => {
  it("works", () => {
    render(<Icon name="home" />)
  })
})
