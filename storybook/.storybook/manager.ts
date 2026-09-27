import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Modern8-bits',
    brandImage: './modern8-bits.svg',
    fontBase: '"Space Grotesk", sans-serif',
  }),
});
