import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Card } from './Card'

const meta = {
  title: 'Component/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Keep card boundaries and padding aligned to the grid; balance visible content inside the card. Follow the [Alignment foundation](./?path=/docs/foundation-alignment--docs) for text baselines, shared content edges, and local optical corrections.' } } },
  args: {
    eyebrow: 'FOUNDATIONS',
    title: 'Build with intention',
    children: 'Flexible components, clear tokens, and a little pixel character for any product.',
  },
  argTypes: { variant: { control: 'inline-radio', options: ['default', 'pixel'] } },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithFooter: Story = {
  args: { footer: <Button variant="outline" size="small">Explore foundations</Button> },
}
export const Pixel: Story = { args: { variant: 'pixel', eyebrow: 'COMPONENT / 001' } }
