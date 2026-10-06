import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
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

export const ComposedDescriptions: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['default', 'low-fidelity'] as const).flatMap(presentation =>
        (['light', 'dark'] as const).map(theme => {
          const id = `checkbox-${presentation}-${theme}`
          return (
            <section key={id} data-theme={theme} data-presentation={presentation} aria-label={`${presentation} ${theme}`} style={{ padding: 24, background: 'var(--m8-background-canvas)', color: 'var(--m8-text-primary)' }}>
              <p id={`${id}-context`}>Updates are sent by email.</p>
              <Checkbox {...args} id={id} aria-describedby={`${id}-context ${id}-message ${id}-context`} />
              <Checkbox label="Accept terms" id={`${id}-error`} error="Accept the terms to continue." aria-describedby={`${id}-context`} />
              <Checkbox label="Alternative label" aria-label="Custom checkbox name" />
              <span id={`${id}-custom-label`}>External checkbox name</span>
              <Checkbox label="Visible checkbox label" aria-labelledby={`${id}-custom-label`} />
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
        const checkbox = region.getByRole('checkbox', { name: 'Send me product updates' })
        const id = `checkbox-${presentation}-${theme}`
        await expect(checkbox).toHaveAttribute('aria-describedby', `${id}-context ${id}-message`)
        await expect(checkbox).toHaveAccessibleDescription('Updates are sent by email. You can change this any time.')
        const invalid = region.getByRole('checkbox', { name: 'Accept terms' })
        await expect(invalid).toHaveAccessibleDescription('Updates are sent by email. Accept the terms to continue.')
        await expect(invalid).toHaveAttribute('aria-invalid', 'true')
        await userEvent.click(region.getByText('You can change this any time.'))
        await expect(checkbox).toBeChecked()
        await userEvent.keyboard(' ')
        await expect(checkbox).not.toBeChecked()
        await userEvent.tab()
        await expect(invalid).toHaveFocus()
        await expect(region.getByRole('checkbox', { name: 'Custom checkbox name' })).toHaveAccessibleName('Custom checkbox name')
        await expect(region.getByRole('checkbox', { name: 'External checkbox name' })).toHaveAccessibleName('External checkbox name')
      }
    }
  },
}
