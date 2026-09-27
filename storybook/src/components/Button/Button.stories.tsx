import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button label', variant: 'primary', size: 'medium' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'pixel'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    type: { control: false },
  },
  parameters: {
    docs: { description: { component: 'Use buttons for clear actions. Keep pixel geometry as a restrained accent.' } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { children: 'Get started' } }
export const Secondary: Story = { args: { children: 'Learn more', variant: 'secondary' } }
export const Pixel: Story = { args: { children: 'Explore system', variant: 'pixel' } }
export const Sizes: Story = {
  render: (args) => <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
    <Button {...args} size="small">Small</Button>
    <Button {...args} size="medium">Medium</Button>
    <Button {...args} size="large">Large</Button>
  </div>,
}
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } }
