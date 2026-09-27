import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Component/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Send me product updates', description: 'You can change this any time.' },
  argTypes: { onChange: { control: false }, onBlur: { control: false }, onFocus: { control: false } },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Error: Story = { args: { error: 'Please choose whether to receive updates.', description: undefined } }
export const Disabled: Story = { args: { disabled: true } }
