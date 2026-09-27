import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  title: 'Content/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'NEW', variant: 'neutral' },
  argTypes: { variant: { control: 'inline-radio', options: ['neutral', 'strong', 'pixel'] } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Strong: Story = { args: { children: 'FEATURED', variant: 'strong' } }
export const Pixel: Story = { args: { children: '8-BIT DETAIL', variant: 'pixel' } }
export const Set: Story = {
  render: () => <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Badge>DEFAULT</Badge><Badge variant="strong">ACTIVE</Badge><Badge variant="pixel">PIXEL DETAIL</Badge>
  </div>,
}
