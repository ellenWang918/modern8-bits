import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Input } from './Input'

const meta = {
  title: 'Component/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Keep field boundaries, labels, and hints on consistent layout anchors. With multiline labels, align supporting content to the first line. Follow the [Alignment foundation](./?path=/docs/foundation-alignment--docs); preserve the field’s focus ring and hit area when refining visible content.' } } },
  args: { label: 'Email address', placeholder: 'you@example.com', hint: 'We’ll only use this for your account.' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'url', 'date', 'number'] },
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

export const NativeDate: Story = {
  args: { label: 'Expense date', type: 'date', defaultValue: '2026-10-06', hint: 'Uses your browser’s date control.', required: true },
  parameters: { docs: { description: { story: 'A native HTML date field. Display and keyboard behavior depend on the browser; submitted values use YYYY-MM-DD. This is not a custom date picker.' } } },
  play: async ({ canvasElement }) => { const input = canvasElement.querySelector('input'); await expect(input).toHaveValue('2026-10-06'); await expect(input).toHaveAttribute('type', 'date'); await expect(input?.checkValidity()).toBe(true) },
}
export const NativeAmount: Story = {
  args: { label: 'Amount (AUD)', type: 'number', min: '0.01', step: '0.01', required: true, defaultValue: '12.50', hint: 'Enter a positive amount with up to two decimal places.' },
  parameters: { docs: { description: { story: 'Native min/step validation checks the entry. Currency symbols and locale formatting are separate display concerns; use a decimal-safe representation for financial calculations. This field is not a currency formatter.' } } },
  play: async ({ canvasElement }) => { const input = canvasElement.querySelector('input'); if (!input) throw new globalThis.Error('Missing amount input'); await expect(input.checkValidity()).toBe(true); await userEvent.clear(input); await userEvent.type(input, '-1'); await expect(input.validity.rangeUnderflow).toBe(true); await userEvent.clear(input); await userEvent.type(input, '12.345'); await expect(input.validity.stepMismatch).toBe(true) },
}

export const ComposedDescriptions: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['default', 'low-fidelity'] as const).flatMap(presentation =>
        (['light', 'dark'] as const).map(theme => {
          const id = `input-${presentation}-${theme}`
          return (
            <section key={id} data-theme={theme} data-presentation={presentation} aria-label={`${presentation} ${theme}`} style={{ padding: 24, background: 'var(--m8-background-canvas)', color: 'var(--m8-text-primary)' }}>
              <p id={`${id}-context`}>This address belongs to your personal account.</p>
              <Input {...args} id={id} aria-describedby={`${id}-context ${id}-message ${id}-context`} />
              <Input label="Recovery email" id={`${id}-error`} error="Enter a valid recovery address." aria-describedby={`${id}-context`} />
            </section>
          )
        })
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const presentation of ['default', 'low-fidelity']) {
      for (const theme of ['light', 'dark']) {
        const region = within(canvas.getByRole('region', { name: `${presentation} ${theme}` }))
        const input = region.getByRole('textbox', { name: 'Email address' })
        const id = `input-${presentation}-${theme}`
        await expect(input).toHaveAttribute('aria-describedby', `${id}-context ${id}-message`)
        await expect(input).toHaveAccessibleDescription('This address belongs to your personal account. We’ll only use this for your account.')
        const invalid = region.getByRole('textbox', { name: 'Recovery email' })
        await expect(invalid).toHaveAccessibleDescription('This address belongs to your personal account. Enter a valid recovery address.')
        await expect(invalid).toHaveAttribute('aria-invalid', 'true')
        await userEvent.click(input)
        await userEvent.type(input, 'person@example.com')
        await expect(input).toHaveValue('person@example.com')
        await userEvent.unhover(input)
        const style = getComputedStyle(input)
        await expect(style.borderTopColor).toBe(theme === 'light' ? 'rgb(102, 102, 102)' : 'rgb(163, 163, 163)')
        await userEvent.tab()
        await expect(invalid).toHaveFocus()
      }
    }
  },
}
