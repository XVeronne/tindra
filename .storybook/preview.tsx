import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Showcase',
          ['Pre-Session', 'Tactile Object', 'Zen Amber Glow', 'Volume Expansion', 'Weekly Report'],
          'Foundations',
          ['Color', 'Typography'],
          'Editorial',
          ['Buttons', 'Cards', 'Marks', 'Fields']
        ]
      }
    }
  },
  decorators: [
    withThemeByClassName({
      themes: { Light: '', Dark: 'dark' },
      defaultTheme: 'Light',
      parentSelector: 'html'
    })
  ]
};

export default preview;
