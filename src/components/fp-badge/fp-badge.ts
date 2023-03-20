import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './fp-badge.css';
import '../fp-icon/fp-icon';
import FinproElement from '../../internals/finpro-element';

export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * @tag fp-badge
 * @summary Finpro Badge component
 *
 * @cssproperty --fp-badge-bg-color - Sets the background color of badge. Default value is `--fp-color-accent-primary-background`
 * @cssproperty --fp-badge-color - Sets the color of badge. Default value is `--fp-color-primary`
 */

@customElement('fp-badge')
export default class FpBadge extends FinproElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the badge size
   */
  @property({ type: String, reflect: true })
  size: BadgeSize = 'medium';

  /**
   * Sets the name of the icon
   */
  @property({ type: String })
  icon?: string;

  render(): TemplateResult {
    const icon = this.icon ? html`<fp-icon name=${this.icon}></fp-icon>` : '';

    return html`<span class="badge">
      <slot name="icon">${icon}</slot>
      <slot></slot>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fp-badge': FpBadge;
  }
}
