import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Card } from './Card'

const meta = {
  title: 'Content/Card',
  component: Card,
  tags: ['autodocs'],
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
  args: { footer: <Button variant="secondary" size="small">Explore foundations</Button> },
}
export const Pixel: Story = { args: { variant: 'pixel', eyebrow: 'COMPONENT / 001' } }
