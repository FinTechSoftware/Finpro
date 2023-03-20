import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Finpro Design System',
  brandUrl: 'https://github.com/FinTechSoftware/Finpro',
  colorPrimary: '#F27A1A',
  colorSecondary: '#273142',
  fontBase: 'PoppinsVariable, sans-serif',
  fontCode:
    '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace',
});

addons.setConfig({ theme });
