import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { GettingStarted } from './GettingStarted'

const meta = { title: 'Foundation/Getting Started', component: GettingStarted, tags: ['!autodocs'] } satisfies Meta<typeof GettingStarted>
export default meta
type Story = StoryObj<typeof meta>

export const InteractiveExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const name = canvas.getByRole('textbox', { name: 'Project name' })
    const checkbox = canvas.getByRole('checkbox', { name: /^Keep planning notes/ })
    await userEvent.click(canvas.getByRole('button', { name: 'Save example' }))
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByText('Error: enter a project name.')).toBeVisible()
    await userEvent.type(name, 'Modern8-bits')
    await userEvent.click(checkbox)
    await userEvent.click(canvas.getByRole('button', { name: 'Save example' }))
    for (const presentation of ['Default theme', 'Low-fidelity']) {
      await userEvent.click(canvas.getByRole('button', { name: presentation }))
      for (const appearance of ['Light', 'Dark']) {
        await userEvent.click(canvas.getByRole('button', { name: appearance }))
        await expect(name).toHaveValue('Modern8-bits')
        await expect(checkbox).toBeChecked()
        await expect(canvas.getByRole('status')).toHaveTextContent('Success: “Modern8-bits” saved in this example with planning notes.')
        await expect(canvas.getByRole('button', { name: 'Unavailable action' })).toBeDisabled()
        await expect(canvas.getByRole('button', { name: appearance })).toHaveAttribute('aria-pressed', 'true')
      }
    }
  },
}

