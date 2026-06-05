import { type Meta, type StoryObj } from "@storybook/react-native"

import { Header } from "./Header"

const noop = (): void => undefined

const meta = {
  title: "Example/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
    onLogin: noop,
    onLogout: noop,
    onCreateAccount: noop,
  },
}

export const LoggedOut: Story = {
  args: {
    onLogin: noop,
    onLogout: noop,
    onCreateAccount: noop,
  },
}
