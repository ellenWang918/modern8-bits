import React from 'react'
import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'
import '../src/styles/global.css'
import '../src/styles/presentation.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: (a, b) => {
        const sectionOrder = ['Foundation', 'Component']
        const sectionA = a.title.split('/')[0]
        const sectionB = b.title.split('/')[0]
        const sectionDifference = sectionOrder.indexOf(sectionA) - sectionOrder.indexOf(sectionB)
        if (sectionDifference !== 0) return sectionDifference

        if (sectionA === 'Foundation' && a.title !== b.title) {
          if (a.title === 'Foundation/Overview') return -1
          if (b.title === 'Foundation/Overview') return 1
          if (a.title === 'Foundation/Getting Started') return -1
          if (b.title === 'Foundation/Getting Started') return 1
        }

        if (a.title === b.title && a.title === 'Component/Button') {
          const buttonOrder = ['Overview', 'Contained', 'Outline', 'Ghost', 'Disable', 'Pixel', 'Sizes', 'Icon Only']
          return buttonOrder.indexOf(a.name) - buttonOrder.indexOf(b.name)
        }

        return a.title.localeCompare(b.title) || a.name.localeCompare(b.name)
      },
    },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    backgrounds: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/Modern8-bits',
    },
  },
  globalTypes: {
    presentation: {
      description: 'Default theme or structural prototype',
      defaultValue: 'default',
      toolbar: {
        title: 'Presentation',
        icon: 'paintbrush',
        items: [{ value: 'default', title: 'Default theme' }, { value: 'low-fidelity', title: 'Low-fidelity' }],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color appearance',
      defaultValue: 'light',
      toolbar: {
        title: 'Appearance',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <div
        data-theme={context.globals.theme}
        data-presentation={context.globals.presentation ?? 'default'}
        style={{ minHeight: context.viewMode === 'docs' ? 'auto' : '100vh', padding: '32px' }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
