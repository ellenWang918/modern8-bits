import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { GridGuidance } from './GridGuidance'
import { devices } from './grid.data'
import { GridWebsiteCanvas, GridWebsiteMockup } from '../prototypes/grid-prototype'
import { viewportGroups } from './grid.viewports'
import { MobileGridMockup } from '../prototypes/mobile-grid-prototype'
import { mobileContentRect } from '../prototypes/mobile-grid.geometry'
import { BentoLayout as BentoLayoutExample } from './BentoLayout'

const meta = { title: 'Foundation/Grid', component: GridGuidance, tags: ['!autodocs'], parameters: { layout: 'fullscreen' } } satisfies Meta<typeof GridGuidance>
export default meta
type Story = StoryObj<typeof meta>

export const BentoLayout: Story = {
  name: 'Bento Layout',
  parameters: { canvasPadding: 0, controls: { disable: true } },
  render: (_args, context) => <BentoLayoutExample theme={context.globals.theme === 'dark' ? 'dark' : 'light'} presentation={context.globals.presentation === 'low-fidelity' ? 'low-fidelity' : 'default'} />,
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const grid = canvasElement.querySelector('.m8-bento-grid')!
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.m8-bento-card'))
    await expect(cards).toHaveLength(6)
    await expect(cards.map(card => card.querySelector('.m8-card__eyebrow')?.textContent?.slice(0, 2))).toEqual(['01', '02', '03', '04', '05', '06'])
    const verifyLayout = async () => {
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect()
        await expect(rect.left).toBeGreaterThanOrEqual(-1)
        await expect(rect.right).toBeLessThanOrEqual(window.innerWidth + 1)
        await expect(cards[i].scrollWidth).toBeLessThanOrEqual(cards[i].clientWidth + 1)
        for (const other of cards.slice(i + 1)) {
          const next = other.getBoundingClientRect()
          await expect(rect.right <= next.left + 1 || next.right <= rect.left + 1 || rect.bottom <= next.top + 1 || next.bottom <= rect.top + 1).toBe(true)
        }
      }
    }
    await verifyLayout()
    const originalHeight = grid.getBoundingClientRect().height
    await userEvent.click(canvas.getByRole('button', { name: 'Longer text' }))
    await expect(grid.getBoundingClientRect().height).toBeGreaterThan(originalHeight)
    await verifyLayout()
    await userEvent.click(canvas.getByRole('button', { name: 'Column guides' }))
    await expect(grid).toHaveAttribute('data-guides', 'true')
    await expect(canvas.getByRole('button', { name: 'Longer text' })).toHaveAttribute('aria-pressed', 'true')
    await verifyLayout()
    if (window.innerWidth < 672) {
      for (let i = 1; i < cards.length; i++) await expect(cards[i].getBoundingClientRect().top).toBeGreaterThanOrEqual(cards[i - 1].getBoundingClientRect().bottom)
    }
    const navigation = within(canvas.getByRole('navigation', { name: 'Bento guidance sections' }))
    const originalUrl = window.location.href
    for (const link of navigation.getAllByRole('link')) {
      await userEvent.click(link)
      const section = canvasElement.querySelector(link.getAttribute('href')!) as HTMLElement
      await expect(within(section).getByRole('heading', { level: 2 })).toHaveFocus()
      await expect(window.location.href).toBe(originalUrl)
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Back to top' }))
    await expect(canvas.getByRole('heading', { name: 'Bento layout', level: 1 })).toHaveFocus()
    await expect(canvas.getByRole('button', { name: 'Longer text' })).toHaveAttribute('aria-pressed', 'true')
    await expect(grid).toHaveAttribute('data-guides', 'true')
  },
}

export const BentoDark: Story = { ...BentoLayout, tags: ['!dev'], globals: { theme: 'dark', presentation: 'default' } }
export const BentoLowFidelity: Story = { ...BentoLayout, tags: ['!dev'], globals: { theme: 'light', presentation: 'low-fidelity' } }
export const BentoLowFidelityDark: Story = { ...BentoLayout, tags: ['!dev'], globals: { theme: 'dark', presentation: 'low-fidelity' } }

export const MobileMockup: Story = {
  name: 'Mobile Mockup',
  parameters: { canvasPadding: 0, controls: { disable: true } },
  render: () => <MobileGridMockup />,
  play: async ({ canvasElement }) => {
    // Keep manual review still; device sweeps and form filling run in tests.
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    // Every recorded profile must leave content inside the safe rectangle and
    // outside every known obstruction, including interior cameras and dividers.
    for (const device of devices) {
      for (const profile of device.profiles) {
        const rect = mobileContentRect(profile)!
        await expect(rect).toBeDefined()
        await expect(rect.width).toBeGreaterThan(0)
        await expect(rect.height).toBeGreaterThan(0)
        await expect(rect.x).toBeGreaterThanOrEqual(profile.insets.left)
        await expect(rect.y).toBeGreaterThanOrEqual(profile.insets.top)
        await expect(rect.x + rect.width).toBeLessThanOrEqual(profile.window.width - profile.insets.right + .01)
        await expect(rect.y + rect.height).toBeLessThanOrEqual(profile.window.height - profile.insets.bottom + .01)
        for (const region of profile.reservedRegions) {
          await expect(rect.x >= region.x + region.width - .01 || rect.x + rect.width <= region.x + .01 || rect.y >= region.y + region.height - .01 || rect.y + rect.height <= region.y + .01).toBe(true)
        }
      }
      await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Device' }), device.id)
      for (const orientation of [...new Set(device.profiles.map(profile => profile.orientation))]) {
        await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Orientation' }), orientation)
        const profiles = device.profiles.filter(profile => profile.orientation === orientation)
        for (const profile of [profiles[0], profiles[profiles.length - 1]]) {
          await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Measured configuration' }), profile.id)
          await expect(canvas.getByTestId('mobile-window')).toHaveAttribute('data-profile', profile.id)
          const app = canvas.getByTestId('mobile-content').getBoundingClientRect()
          const footer = canvasElement.querySelector('.mp-bottom')!.getBoundingClientRect()
          await expect(footer.bottom).toBeLessThanOrEqual(app.bottom + 1)
          await expect(footer.left).toBeGreaterThanOrEqual(app.left - 1)
          await expect(footer.right).toBeLessThanOrEqual(app.right + 1)
        }
      }
    }
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Device' }), devices[0].id)
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Screen' }), 'Details')
    await userEvent.type(canvas.getByRole('textbox', { name: 'Placeholder name' }), 'Example name')
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Save this placeholder' }))
    for (const presentation of ['default', 'low-fidelity']) {
      await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Presentation' }), presentation)
      for (const appearance of ['dark', 'light']) {
        await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Appearance' }), appearance)
        await expect(canvas.getByRole('textbox', { name: 'Placeholder name' })).toHaveValue('Example name')
        await expect(canvas.getByRole('checkbox', { name: 'Save this placeholder' })).toBeChecked()
      }
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Save placeholder' }))
    await expect(canvas.getByRole('status', { name: 'Placeholder confirmation' })).toHaveTextContent('Nothing is sent or stored.')
    await userEvent.click(canvas.getByRole('button', { name: 'Home' }))
    await expect(canvas.getByRole('combobox', { name: 'Screen' })).toHaveValue('Home')
    const review = canvasElement.querySelector('.mp-review')!
    await expect(review.scrollWidth).toBeLessThanOrEqual(review.clientWidth + 1)
  },
}

export const ColumnRestrictions: Story = {
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const columns = canvas.getByRole('combobox', { name: 'Columns' })
    const scenario = canvas.getByRole('combobox', { name: 'Content layout' })
    const grid = canvas.getByTestId('web-grid')
    const option = (count: number) => within(columns).getByRole('option', { name: new RegExp(`^${count} columns`) })
    await expect(option(8)).toBeDisabled()
    await expect(option(12)).toBeEnabled()
    await expect(grid.querySelector('.m8-web-grid__tile')).toHaveStyle({ gridColumn: 'span 6' })
    await userEvent.selectOptions(columns, '12')
    await userEvent.click(canvas.getByRole('button', { name: '320px' }))
    await expect(columns).toHaveValue('auto')
    await expect(canvas.getByRole('status', { name: 'Grid measurements' })).toHaveTextContent('returned to Auto')
    await expect(grid).toHaveAttribute('data-columns', '4')
    await expect(option(8)).toBeDisabled()
    await expect(option(12)).toBeDisabled()
    await userEvent.click(canvas.getByRole('button', { name: '1920px' }))
    await userEvent.selectOptions(scenario, 'full')
    for (const count of [4, 8, 12]) {
      await expect(option(count)).toBeEnabled()
      await userEvent.selectOptions(columns, String(count))
      await expect(grid).toHaveAttribute('data-columns', String(count))
      await expect(grid.querySelector('.m8-web-grid__tile')).toHaveStyle({ gridColumn: `span ${count}` })
    }
    await userEvent.selectOptions(columns, '8')
    await userEvent.selectOptions(scenario, 'halves')
    await expect(columns).toHaveValue('auto')
    await expect(grid).toHaveAttribute('data-columns', '12')
    for (const value of ['thirds', 'split']) {
      await userEvent.selectOptions(scenario, value)
      await expect(option(4)).toBeDisabled()
      await expect(option(8)).toBeDisabled()
      await expect(option(12)).toBeEnabled()
    }
    await expect(grid.querySelector('.m8-web-grid__tile')).toHaveStyle({ gridColumn: 'span 4' })
    await expect(grid.querySelectorAll('.m8-web-grid__tile')[1]).toHaveStyle({ gridColumn: 'span 8' })
    await userEvent.selectOptions(scenario, 'full')
    await userEvent.selectOptions(columns, '4')
    await userEvent.selectOptions(canvas.getByRole('combobox', { name: 'Layout width' }), 'fluid')
    await expect(columns).toHaveValue('4')
    await expect(grid).toHaveAttribute('data-columns', '4')
  },
}

export const WebsiteMockup: Story = {
  name: 'Website Mockup',
  parameters: { canvasPadding: 0, controls: { disable: true } },
  render: () => {
    if (new URLSearchParams(location.search).has('canvas')) return <GridWebsiteCanvas />
    const canvas = new URL('iframe.html', location.href)
    canvas.search = new URLSearchParams({ id: 'foundation-grid--website-mockup', viewMode: 'story', canvas: '1' }).toString()
    const guidance = new URL('./', location.href)
    guidance.search = '?path=/docs/foundation-grid--docs'
    return <GridWebsiteMockup canvasUrl={canvas.href} guidanceUrl={guidance.href} showSwitcher />
  },
}

export const SectionNavigation: Story = {
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const navigation = within(canvas.getByRole('navigation', { name: 'Grid guidance sections' }))
    const originalUrl = window.location.href
    for (const link of navigation.getAllByRole('link')) {
      let browserWouldNavigate = true
      // Observe the browser's default action after React handles the click.
      // Cancel it here too so a regression cannot navigate the test runner away.
      const observeNavigation = (event: MouseEvent) => {
        browserWouldNavigate = !event.defaultPrevented
        event.preventDefault()
      }
      document.addEventListener('click', observeNavigation, { once: true })
      try {
        await userEvent.click(link)
        await expect(browserWouldNavigate).toBe(false)
        await expect(window.location.href).toBe(originalUrl)
        const section = canvasElement.querySelector(link.getAttribute('href')!)!
        await expect(within(section as HTMLElement).getByRole('heading', { level: 2 })).toHaveFocus()
      } finally {
        document.removeEventListener('click', observeNavigation)
      }
    }
    await userEvent.click(canvas.getByRole('button', { name: 'Back to top' }))
    const title = canvas.getByRole('heading', { name: 'Grid', level: 1 })
    await expect(title).toHaveFocus()
    await expect(title.getBoundingClientRect().top).toBeGreaterThanOrEqual(0)
  },
}

export const InteractiveGuidance: Story = {
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    if (import.meta.env.MODE !== 'test') return
    const canvas = within(canvasElement)
    const grid = canvas.getByTestId('web-grid')
    const viewport = canvas.getByRole('combobox', { name: 'Viewport width' })
    for (const width of viewportGroups.flatMap(group => [...group.widths])) {
      const columns = width < 672 ? 4 : width < 1056 ? 8 : 12
      await userEvent.selectOptions(viewport, String(width))
      await expect(grid).toHaveAttribute('data-columns', String(columns))
    }
    await userEvent.selectOptions(viewport, '1920')
    const deviceSelect = canvas.getByRole('combobox', { name: 'Device' })
    const orientationSelect = canvas.getByRole('combobox', { name: 'Orientation' })
    const modeSelect = canvas.getByRole('combobox', { name: 'Measured configuration' })
    const metrics = canvas.getByTestId('device-metrics')
    for (const device of devices) {
      await userEvent.selectOptions(deviceSelect, device.id)
      for (const orientation of [...new Set(device.profiles.map(profile => profile.orientation))]) {
        await userEvent.selectOptions(orientationSelect, orientation)
        const profiles = device.profiles.filter(profile => profile.orientation === orientation)
        // Both ends exercise configuration changes, including split-right windows.
        for (const profile of [profiles[0], profiles[profiles.length - 1]]) {
          await userEvent.selectOptions(modeSelect, profile.id)
          await expect(metrics).toHaveTextContent(`${profile.window.width} × ${profile.window.height} pt`)
          await expect(metrics).toHaveTextContent(`${profile.insets.top} / ${profile.insets.right} / ${profile.insets.bottom} / ${profile.insets.left} pt`)
        }
      }
      for (const profile of device.profiles) {
        await expect(profile.window.width - profile.insets.left - profile.insets.right).toBeGreaterThan(0)
        await expect(profile.window.height - profile.insets.top - profile.insets.bottom).toBeGreaterThan(0)
        for (const region of profile.reservedRegions) {
          await expect(region.x + region.width).toBeLessThanOrEqual(profile.window.width + 1)
          await expect(region.y + region.height).toBeLessThanOrEqual(profile.window.height + 1)
        }
      }
    }
    await expect(viewport).toHaveValue('1920')
    // Leave a useful default review state after the interaction checks.
    await userEvent.selectOptions(deviceSelect, devices[0].id)
    await userEvent.click(canvas.getByRole('button', { name: '1056px' }))
    const guide = canvasElement.querySelector('.m8-grid-guide')!
    await expect(guide.scrollWidth).toBeLessThanOrEqual(guide.clientWidth + 1)
  },
}
