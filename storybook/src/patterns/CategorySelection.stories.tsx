import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { CategorySelection } from './CategorySelection'
const meta = { title: 'Pattern/Category Selection', component: CategorySelection, tags: ['autodocs'], parameters: { docs: { description: { component: 'Radio selects one category; Checkbox selects several. Both examples show group validation and in-memory results. Informational Badge/Chip is not a selection control.' } } } } satisfies Meta<typeof CategorySelection>
export default meta
type Story = StoryObj<typeof meta>
export const AllModes: Story = {
  render: () => <div style={{ display: 'grid', gap: 32 }}>{['default', 'low-fidelity'].flatMap(presentation => ['light', 'dark'].map(theme => <section key={`${presentation}-${theme}`} aria-label={`${presentation} ${theme}`} data-theme={theme} data-presentation={presentation} style={{ padding: 16, background: 'var(--m8-background-canvas)', color: 'var(--m8-text-primary)' }}><CategorySelection exampleName={`${presentation} ${theme}`} /></section>))}</div>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    for (const presentation of ['default', 'low-fidelity']) for (const theme of ['light', 'dark']) {
      const region = within(canvas.getByRole('region', { name: `${presentation} ${theme}` }))
      const single = within(region.getByRole('form', { name: `Single category example — ${presentation} ${theme}` }))
      await userEvent.click(single.getByRole('button', { name: 'Save category' }))
      await expect(single.getByRole('alert')).toHaveTextContent('Error: choose one category.')
      const food = single.getByRole('radio', { name: 'Food' })
      const travel = single.getByRole('radio', { name: 'Travel' })
      await userEvent.click(food)
      await userEvent.keyboard('{ArrowRight}')
      await expect(travel).toBeChecked()
      await expect(food).not.toBeChecked()
      await userEvent.click(single.getByRole('button', { name: 'Save category' }))
      await expect(single.getByRole('status')).toHaveTextContent('Selected category: Travel.')
      const multiple = within(region.getByRole('form', { name: `Multiple categories example — ${presentation} ${theme}` }))
      await userEvent.click(multiple.getByRole('button', { name: 'Save categories' }))
      await expect(multiple.getByRole('alert')).toHaveTextContent('Error: choose at least one category.')
      const first = multiple.getByRole('checkbox', { name: 'Food' })
      await expect(first).toHaveAttribute('aria-invalid', 'true')
      await userEvent.click(first)
      await userEvent.tab()
      await userEvent.keyboard(' ')
      await expect(multiple.getByRole('checkbox', { name: 'Travel' })).toBeChecked()
      await userEvent.click(multiple.getByRole('button', { name: 'Save categories' }))
      await expect(multiple.getByRole('status')).toHaveTextContent('Selected categories: Food, Travel.')
      await userEvent.click(first)
      await expect(first).not.toBeChecked()
      await expect(multiple.getByRole('checkbox', { name: 'Travel' })).toBeChecked()
    }
  },
}
