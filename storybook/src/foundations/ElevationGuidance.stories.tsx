import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ElevationGuidance } from './ElevationGuidance'
import { elevationScenarios } from './elevation.data'

const meta = { title: 'Foundation/Elevation', component: ElevationGuidance, tags: ['!autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof ElevationGuidance>
export default meta
type Story = StoryObj<typeof meta>

export const Guidance: Story = {
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const scenario = canvas.getByRole('combobox', { name: 'Example' })
    const presentation = canvas.getByRole('combobox', { name: 'Example presentation' })
    const shadows = canvas.getByRole('checkbox', { name: 'Show shadows' })
    for (const [value, choice] of Object.entries(elevationScenarios)) {
      await userEvent.selectOptions(scenario, value)
      await expect(canvas.getByRole('status')).toHaveTextContent(choice.name)
      for (const figure of canvas.getAllByRole('figure')) {
        const sample = figure.querySelector<HTMLElement>('.m8-elevation-scene__sample')!
        await expect(sample).toHaveAttribute('data-elevation', choice.role)
        await expect(figure.querySelector('.m8-elevation-scene__scrim') !== null).toBe(value === 'dialog')
        await expect(getComputedStyle(sample).boxShadow === 'none').toBe(choice.role === 'base' || choice.role === 'sunken')
      }
    }
    await userEvent.selectOptions(scenario, 'well')
    for (const mode of ['default', 'low-fidelity']) {
      await userEvent.selectOptions(presentation, mode)
      for (const figure of canvas.getAllByRole('figure')) {
        const sample = figure.querySelector<HTMLElement>('.m8-elevation-scene__sample')!
        const style = getComputedStyle(sample)
        await expect(sample).toHaveAttribute('data-elevation', 'sunken')
        await expect(style.boxShadow).toBe('none')
        await expect(style.backgroundColor).toBe(figure.getAttribute('data-theme') === 'light' ? 'rgb(238, 238, 238)' : 'rgb(17, 17, 17)')
        const children = sample.querySelectorAll('.m8-elevation-well__components > div')
        await expect(children).toHaveLength(2)
        await expect(getComputedStyle(children[0]).backgroundColor).not.toBe(style.backgroundColor)
      }
    }
    await userEvent.selectOptions(presentation, 'default')
    await userEvent.selectOptions(scenario, 'menu')
    await userEvent.click(shadows)
    for (const figure of canvas.getAllByRole('figure')) {
      await expect(getComputedStyle(figure.querySelector('.m8-elevation-scene__sample')!).boxShadow).toBe('none')
    }
    await userEvent.click(shadows)
    await userEvent.selectOptions(presentation, 'low-fidelity')
    await expect(shadows).toBeDisabled()
    await expect(shadows).not.toBeChecked()
    for (const figure of canvas.getAllByRole('figure')) {
      const sample = figure.querySelector('.m8-elevation-scene__sample')!
      await expect(getComputedStyle(sample).boxShadow).toBe('none')
      await expect(getComputedStyle(sample).borderRadius).toBe('0px')
    }
    await userEvent.selectOptions(presentation, 'default')
    await expect(scenario).toHaveValue('menu')
    await expect(shadows).toBeChecked()
    const figures = canvas.getAllByRole('figure')
    await expect(getComputedStyle(figures[0].querySelector('.m8-elevation-scene__sample')!).backgroundColor).toBe('rgb(255, 255, 255)')
    await expect(getComputedStyle(figures[1].querySelector('.m8-elevation-scene__sample')!).backgroundColor).toBe('rgb(51, 51, 51)')
    const guide = canvasElement.querySelector('.m8-elevation-docs')!
    await expect(guide.scrollWidth).toBeLessThanOrEqual(guide.clientWidth + 1)
  },
}

export const Navigation: Story = {
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const nav = within(canvas.getByRole('navigation', { name: 'Elevation table of contents' }))
    const originalUrl = window.location.href
    for (const link of nav.getAllByRole('link')) {
      await userEvent.click(link)
      await expect(window.location.href).toBe(originalUrl)
      const section = canvasElement.querySelector(link.getAttribute('href')!)!
      await expect(within(section as HTMLElement).getByRole('heading', { level: 2 })).toHaveFocus()
    }
    await userEvent.click(nav.getByRole('button', { name: 'Back to top' }))
    const title = canvas.getByRole('heading', { name: 'Elevation', level: 1 })
    await expect(title).toHaveFocus()
    await expect(title.getBoundingClientRect().top).toBeGreaterThanOrEqual(0)
  },
}
