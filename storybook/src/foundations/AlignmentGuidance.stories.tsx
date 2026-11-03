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
    const verifyAnchors = async () => {
      const selects = Array.from(root.querySelectorAll('.m8-alignment-controls select')).map(node => node.getBoundingClientRect())
      await expect(Math.abs(selects[0].width - selects[1].width)).toBeLessThan(1)
      if (selects[1].left > selects[0].right) {
        await expect(Math.abs(selects[0].top - selects[1].top)).toBeLessThan(1)
        const check = root.querySelector('.m8-alignment-check')!.getBoundingClientRect()
        if (check.left > selects[1].right) await expect(Math.abs(check.top + check.height / 2 - selects[0].top - selects[0].height / 2)).toBeLessThan(1)
      }
      for (const comparison of root.querySelectorAll('.m8-alignment-comparison')) {
        const [before, after] = Array.from(comparison.querySelectorAll('svg')).map(node => node.getBoundingClientRect())
        if (after.left > before.right) {
          await expect(Math.abs(before.top - after.top)).toBeLessThan(1)
          await expect(Math.abs(before.height - after.height)).toBeLessThan(1)
        } else await expect(after.top).toBeGreaterThanOrEqual(before.bottom)
      }
      const principles = Array.from(root.querySelectorAll('.m8-alignment-principles article'))
      if (principles[1].getBoundingClientRect().left > principles[0].getBoundingClientRect().right) {
        await expect(Math.abs(principles[0].querySelector('p')!.getBoundingClientRect().top - principles[1].querySelector('p')!.getBoundingClientRect().top)).toBeLessThan(1)
      }
      const heading = canvas.getByRole('heading', { name: 'Alignment', level: 1 }).getBoundingClientRect()
      const section = root.querySelector('.m8-grid-section')!.getBoundingClientRect()
      await expect(Math.abs(heading.left - section.left)).toBeLessThan(1)
    }
    await verifyAnchors()
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
        await verifyAnchors()
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
