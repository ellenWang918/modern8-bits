import { chromium } from '../../storybook/node_modules/playwright/index.mjs'
import { readFile, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const evidence = { combinations: [], tokenChecks: 0, consoleErrors: [] }
page.on('pageerror', error => evidence.consoleErrors.push(error.message))
try {
  await page.goto('http://localhost:6006/iframe.html?id=foundation-getting-started--docs&viewMode=docs')
  await page.getByRole('heading', { name: 'Getting Started', exact: true }).waitFor()
  await page.evaluate(() => document.fonts.ready)
  const example = page.locator('.m8-getting-started__example')
  const name = page.getByRole('textbox', { name: 'Project name' })
  const checkbox = page.getByRole('checkbox', { name: /^Keep planning notes/ })
  await name.fill('Modern8-bits')
  await checkbox.check()
  await page.getByRole('button', { name: 'Save example' }).click()
  for (const presentation of ['default', 'low-fidelity']) {
    await page.getByRole('button', { name: presentation === 'default' ? 'Default theme' : 'Low-fidelity', exact: true }).click()
    for (const appearance of ['light', 'dark']) {
      await page.getByRole('button', { name: appearance === 'light' ? 'Light' : 'Dark', exact: true }).click()
      assert.equal(await name.inputValue(), 'Modern8-bits')
      assert.equal(await checkbox.isChecked(), true)
      assert.match(await page.getByRole('status').innerText(), /with planning notes/)
      assert.equal(await example.getAttribute('data-presentation'), presentation)
      assert.equal(await example.getAttribute('data-theme'), appearance)
      await name.fill('')
      await page.getByRole('button', { name: 'Save example' }).click()
      assert.equal(await name.getAttribute('aria-invalid'), 'true')
      const errorColour = await example.locator('.m8-field__message').evaluate(n => getComputedStyle(n).color)
      if (presentation === 'low-fidelity') assert.equal(errorColour, appearance === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)')
      await name.fill('Modern8-bits')
      await page.getByRole('button', { name: 'Save example' }).click()
      for (const width of [1440, 390]) {
        await page.setViewportSize({ width, height: 1000 })
        const metrics = await example.evaluate(n => {
          const get = selector => getComputedStyle(n.querySelector(selector))
          return { overflow: document.documentElement.scrollWidth > window.innerWidth, titleFamily: get('.m8-card__title').fontFamily, detailFamily: get('.m8-badge--pixel').fontFamily, radius: get('.m8-card').borderRadius, inputHeight: n.querySelector('.m8-field__input').getBoundingClientRect().height, buttonHeight: n.querySelector('.m8-button').getBoundingClientRect().height, pixelShadow: get('.m8-badge--pixel').boxShadow }
        })
        assert.equal(metrics.overflow, false)
        assert.equal(metrics.inputHeight, 44)
        assert.equal(metrics.buttonHeight, 48)
        assert.equal(metrics.radius, presentation === 'default' ? '8px' : '0px')
        assert.match(metrics.titleFamily, presentation === 'default' ? /Space Grotesk/ : /IBM Plex Sans/)
        if (presentation === 'default') assert.match(metrics.detailFamily, /IBM Plex Mono/)
        if (presentation === 'low-fidelity') { assert.match(metrics.detailFamily, /IBM Plex Sans/); assert.equal(metrics.pixelShadow, 'none') }
        await page.screenshot({ path: `.scratch/foundations-first-release/presentation-${presentation}-${appearance}-${width}.png`, fullPage: true })
        evidence.combinations.push({ presentation, appearance, width, statePreserved: true, errorColour, ...metrics })
      }
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  const source = await readFile('storybook/src/foundations/variables.data.ts', 'utf8')
  const baseArray = source.slice(source.indexOf('[\n') + 2).replace(/\s*\.\.\.presentationVariables,?/, '').replace(/\]\s*$/, '').trim().replace(/,\s*$/, '')
  const base = JSON.parse('[' + baseArray + ']')
  const addedSource = await readFile('storybook/src/foundations/presentation.data.ts', 'utf8')
  const added = JSON.parse(addedSource.slice(addedSource.indexOf('= [') + 2))
  for (const presentation of ['default', 'low-fidelity']) for (const appearance of ['light', 'dark']) {
    const defs = presentation === 'default' ? [...base, ...added] : added
    const checks = await example.evaluate((node, { defs, presentation, appearance }) => {
      node.dataset.presentation = presentation; node.dataset.theme = appearance
      const styles = getComputedStyle(node)
      return defs.map(v => {
        const mode = v.collection === 'Presentation' ? (presentation === 'default' ? 'Default' : 'Low-fidelity') + (v.type === 'COLOR' ? ' · ' + (appearance === 'light' ? 'Light' : 'Dark') : '') : v.values.some(x => x.mode === 'Light') ? appearance === 'light' ? 'Light' : 'Dark' : 'Default'
        const expected = v.values.find(x => x.mode === mode).value
        const raw = styles.getPropertyValue('--m8-' + v.name.replaceAll('/', '-')).trim()
        return { name: v.name, type: v.type, expected, raw }
      })
    }, { defs, presentation, appearance })
    for (const check of checks) {
      if (check.type === 'COLOR') assert.equal(check.raw.toUpperCase(), check.expected.toUpperCase(), JSON.stringify(check))
      else if (check.type === 'FLOAT') assert.equal(parseFloat(check.raw), parseFloat(check.expected), JSON.stringify(check))
      else assert.ok(check.raw.replaceAll("'", '').replaceAll('"', '').startsWith(check.expected), JSON.stringify(check))
      evidence.tokenChecks++
    }
  }
  await page.getByRole('button', { name: 'Default theme', exact: true }).click()
  await page.getByRole('button', { name: 'Light', exact: true }).click()
  await name.focus()
  await page.keyboard.press('Tab')
  assert.equal(await checkbox.evaluate(n => document.activeElement === n), true)
  assert.equal(await checkbox.evaluate(n => getComputedStyle(n.nextElementSibling).outlineStyle), 'solid')
  await page.keyboard.press('Tab')
  assert.equal(await page.getByRole('button', { name: 'Save example' }).evaluate(n => document.activeElement === n), true)
  await page.keyboard.press('Tab')
  assert.equal(await page.getByRole('button', { name: 'Unavailable action' }).evaluate(n => document.activeElement === n), false)
  evidence.keyboard = 'Input → Checkbox → Save; disabled action skipped; focus outline visible'
  assert.deepEqual(evidence.consoleErrors, [])
  await writeFile('.scratch/foundations-first-release/presentation-browser.json', JSON.stringify(evidence, null, 2))
  console.log(JSON.stringify(evidence, null, 2))
} finally { await browser.close() }
