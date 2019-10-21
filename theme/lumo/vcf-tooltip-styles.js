import '@vaadin/vaadin-lumo-styles/color';
import '@vaadin/vaadin-lumo-styles/style';
import '@vaadin/vaadin-lumo-styles/sizing';
import '@vaadin/vaadin-lumo-styles/spacing';
import '@vaadin/vaadin-lumo-styles/typography';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles(
  'vcf-tooltip',
  css`
    :host {
      /* Sizing */
      --lumo-tooltip-size: var(--lumo-size-m);
      /* Style */
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      font-weight: 500;
      cursor: default;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    [part='content'] {
      padding: calc(var(--lumo-tooltip-size) / 6);
      color: var(--lumo-body-text-color);
      background-color: var(--lumo-base-color);
      border-radius: var(--lumo-border-radius);
    }
  `,
  {
    include: ['lumo-color', 'lumo-typography']
  }
);
