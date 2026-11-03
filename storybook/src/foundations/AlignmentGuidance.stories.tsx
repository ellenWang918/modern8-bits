import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { AlignmentGuidance } from './AlignmentGuidance'

const meta = { title: 'Foundation/Alignment', component: AlignmentGuidance, tags: ['!autodocs'], parameters: { layout: 'fullscreen', canvasPadding: 0, controls: { disable: true } } } satisfies Meta<typeof AlignmentGuidance>
export default meta
type Story = StoryObj<typeof meta>

export const Guidance: Story = {
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const root = canvasElement.querySelector<HTMLElement>('.m8-alignment-guide')!
    await expect(canvas.getAllByRole('img')).toHaveLength(10)
    const guides = canvas.getByRole('checkbox', { name: 'Show alignment guides' })
    await userEvent.click(guides)
    await expect(root).toHaveAttribute('data-guides', 'false')
    const frameSizes = () => Array.from(root.querySelectorAll('.m8-alignment-frame')).map(node => {
      const { width, height } = node.getBoundingClientRect()
      return { width, height }
    })
    const frames = frameSizes()
    for (const presentation of ['low-fidelity', 'default']) {
      await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Presentation' }), presentation)
      for (const theme of ['dark', 'light']) {
        await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Appearance' }), theme)
        await expect(root).toHaveAttribute('data-theme', theme)
        await expect(root).toHaveAttribute('data-presentation', presentation)
        await expect(guides).not.toBeChecked()
        await expect(root.scrollWidth).toBeLessThanOrEqual(root.clientWidth + 1)
        for (const figure of canvas.getAllByRole('figure')) {
          await expect(figure.scrollWidth).toBeLessThanOrEqual(figure.clientWidth + 1)
        }
      }
    }
    // Fonts can reflow surrounding text; the illustrated frame sizes stay fixed.
    await expect(frameSizes()).toEqual(frames)
    await userEvent.click(guides)
    await expect(getComputedStyle(root.querySelector('.m8-alignment-guides')!).visibility).toBe('visible')
    const originalUrl = window.location.href
    const nav = within(canvas.getByRole('navigation', { name: 'Alignment guidance sections' }))
    for (const link of nav.getAllByRole('link')) {
      await userEvent.click(link)
      const section = canvasElement.querySelector(link.getAttribute('href')!) as HTMLElement
      await expect(within(section).getByRole('heading', { level: 2 })).toHaveFocus()
      await expect(window.location.href).toBe(originalUrl)
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Back to top' }))
    await expect(canvas.getByRole('heading', { name: 'Alignment', level: 1 })).toHaveFocus()
    await expect(canvas.getByRole('heading', { name: 'Alignment', level: 1 }).getBoundingClientRect().top).toBeGreaterThanOrEqual(0)
  },
}

export const Dark: Story = { ...Guidance, args: { initialTheme: 'dark' }, tags: ['!dev'] }
export const LowFidelity: Story = { ...Guidance, args: { initialPresentation: 'low-fidelity' }, tags: ['!dev'] }
export const LowFidelityDark: Story = { ...Guidance, args: { initialTheme: 'dark', initialPresentation: 'low-fidelity' }, tags: ['!dev'] }
