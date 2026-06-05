import { render } from "@testing-library/react-native"

import Icon from "./Icon"

jest.mock("@expo/vector-icons/FontAwesome", () => {
  const React = require("react")
  const { Text } = require("react-native")

  return function MockFontAwesome(props: { name: string }) {
    return React.createElement(Text, null, props.name)
  }
})

describe("Design > Elements > Icon", () => {
  it("works", () => {
    render(<Icon name="home" />)
  })
})
