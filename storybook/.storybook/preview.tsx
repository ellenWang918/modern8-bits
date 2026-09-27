import type { Preview } from '@storybook/react-vite'
import '../src/styles/tokens.css'
import '../src/styles/global.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    backgrounds: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Ig6OBlF54TZEoe3D8BwwlJ/Modern8-bits',
    },
  },
  globalTypes: {
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
      <div data-theme={context.globals.theme} style={{ minHeight: '100vh', padding: '32px' }}>
        <Story />
      </div>
    ),
  ],
}

export default preview
