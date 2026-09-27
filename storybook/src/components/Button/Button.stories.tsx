import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'Component/Button',
  component: Button,
  args: { children: 'Button label', variant: 'contained', size: 'small' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['contained', 'outline', 'ghost', 'pixel'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    iconOnly: { control: false },
    type: { control: false },
  },
  parameters: {
    docs: { description: { component: 'Use buttons for clear actions. Keep pixel geometry as a restrained accent.' } },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Contained: Story = { args: { children: 'Get started', variant: 'contained', size: 'small' } }
export const Outline: Story = { args: { children: 'Learn more', variant: 'outline', size: 'small' } }
export const Ghost: Story = { args: { children: 'Explore', variant: 'ghost', size: 'small' } }
export const Pixel: Story = { args: { children: 'Explore system', variant: 'pixel', size: 'small' } }
export const Sizes: Story = {
  render: (args) => <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
    <Button {...args} size="small">Small</Button>
    <Button {...args} size="medium">Medium</Button>
    <Button {...args} size="large">Large</Button>
  </div>,
}

export const IconOnly: Story = {
  render: () => {
    const sizes = [
      { label: 'Small', size: 'small' as const },
      { label: 'Medium', size: 'medium' as const },
      { label: 'Large', size: 'large' as const },
    ]
    const treatments = [
      { label: 'Contained', variant: 'contained' as const },
      { label: 'Outline', variant: 'outline' as const },
      { label: 'Ghost', variant: 'ghost' as const },
      { label: 'Disable', variant: 'contained' as const, disabled: true },
    ]

    return (
      <div role="group" aria-label="Icon-only buttons by size and treatment" style={{ display: 'grid', gridTemplateColumns: 'auto repeat(4, min-content)', alignItems: 'center', gap: 16 }}>
        <span />
        {treatments.map(({ label }) => <span key={label}>{label}</span>)}
        {sizes.flatMap(({ label: sizeLabel, size }) => [
          <span key={`${size}-label`}>{sizeLabel}</span>,
          ...treatments.map(({ label, variant, disabled }) => (
            <Button
              key={`${size}-${label}`}
              aria-label={`${label} ${sizeLabel} action`}
              disabled={disabled}
              iconOnly
              size={size}
              variant={variant}
            />
          )),
        ])}
      </div>
    )
  },
}

export const Disable: Story = { args: { children: 'Unavailable', variant: 'contained', size: 'small', disabled: true } }
