import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './fp-switch.css';

export const fpSwitchTag = 'fp-switch';

/**
 * @tag fp-switch
 * @summary Finpro Switch component
 */
@customElement(fpSwitchTag)
export default class FpSwitch extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the checked state for switch
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the disabled state for switch
   */
  @property({ type: Boolean, reflect: true })
  disabled? = false;

  /**
   * Fires whenever user toggles the switch
   */
  @event('fp-switch-toggle') private onToggle: EventDispatcher<boolean>;

  toggle() {
    if (this.disabled) return;

    this.checked = !this.checked;
    this.onToggle(this.checked);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.toggle();
      event.preventDefault();
    }
  }

  render(): TemplateResult {
    const ariaLabel = this.ariaLabel ?? this.attributes.getNamedItem("aria-label")?.value ?? undefined;

    return html`
      <span
        class="switch"
        role="switch"
        aria-checked=${this.checked}
        aria-readonly=${!!this.disabled}
        @click=${this.toggle}
        @keydown=${this.handleKeyDown}
        aria-label=${ifDefined(ariaLabel)}
        tabindex="0"
      >
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [fpSwitchTag]: FpSwitch;
  }
}
