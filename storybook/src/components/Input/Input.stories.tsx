import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Component/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email address', placeholder: 'you@example.com', hint: 'We’ll only use this for your account.' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'url'] },
    error: { control: 'text' },
    hint: { control: 'text' },
    onChange: { control: false },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: 'hello@modern8bits.design' } }
export const Error: Story = { args: { error: 'Enter a valid email address.', hint: undefined, defaultValue: 'not-an-email' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'hello@modern8bits.design', hint: undefined } }
