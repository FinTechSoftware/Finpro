import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../utilities/event';
import style from './fp-alert.css';
import '../fp-icon/fp-icon';
import { ifDefined } from 'lit/directives/if-defined.js';
import { stringBooleanConverter } from '../../utilities/string-boolean.converter';
import { ButtonVariant, ButtonKind, ButtonSize } from '../fp-button/fp-button';
import FinproElement from '../../internals/finpro-element';

export type AlertVariant = 'info' | 'warning' | 'success' | 'danger';

/**
 * @tag fp-alert
 * @summary Finpro Alert component
 */

@customElement('fp-alert')
export default class FpAlert extends FinproElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets alert variant
   */
  @property({ reflect: true })
  variant: AlertVariant = 'info';

  /**
   * Sets alert description
   */
  @property()
  description?: 'string';

  /**
   * Allows to customize alert icon
   */
  @property({ converter: stringBooleanConverter() })
  icon?: boolean | string;

  /**
   * Displays a close button.
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Sets alert caption.
   */
  @property()
  caption?: string;

  /**
   * Sets alert components display state.
   */
  @property({ type: Boolean, reflect: true })
  closed = false;

  /**
   * Opens alert component.
   */
  public open() {
    this.closed = false;
  }

  /**
   * Closes alert component.
   */
  public close() {
    this.closed = true;
  }

  /**
   * Fires when close button clicked.
   */
  @event('fp-close') private onClose: EventDispatcher<boolean>;

  private get _hasAlertCaptionSlot() {
    return this.querySelector(':scope > [slot="caption"]') !== null;
  }

  private _closeHandler() {
    this.closed = true;
    this.onClose(true);
  }

  private _predefinedIcons() {
    switch (this.variant) {
      case 'success':
        return 'check_fill';
      case 'danger':
        return 'close_fill';
      default:
        return this.variant;
    }
  }

  private _getIcon(): string | undefined {
    if (!this.icon) return;
    if (this.icon === true) return this._predefinedIcons();
    return this.icon;
  }

  private _initAlertActionSlot(event: Event) {
    const slotElements = (event.target as HTMLSlotElement).assignedElements();
    slotElements.forEach(element => {
      if (element.tagName !== 'FP-BUTTON') {
        element.parentNode?.removeChild(element);
        return;
      }
      element.setAttribute('variant','tertiary' as ButtonVariant);
      element.setAttribute('kind', 'neutral' as ButtonKind);
      element.setAttribute('size', 'medium' as ButtonSize);
      element.removeAttribute('icon');
    });
  }

  render(): TemplateResult {
    const caption =
      this.caption || this._hasAlertCaptionSlot
        ? html`<span class="caption">
            <slot name="caption"> ${this.caption} </slot>
          </span>`
        : null;
    const icon = this._getIcon()
      ? html`<fp-icon class="icon" name=${ifDefined(this._getIcon())}></fp-icon>`
      : null;

    const closable = this.closable
      ? html`<fp-button
          class="close"
          label="close"
          variant="tertiary"
          kind="neutral"
          icon="close"
          variant="secondary"
          @click=${this._closeHandler}
        ></fp-button>`
      : null;
    const description = html`<span class="description">
      <slot> ${this.description} </slot>
    </span>`;

    return html`
      <div class="alert">
        <div class="wrapper">
          <div class="content">
            ${icon}
            <div class="text-content">${caption} ${description}</div>
          </div>
          <slot class="action" name="action" @slotchange=${this._initAlertActionSlot}></slot>
        </div>
        ${closable}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fp-alert': FpAlert;
  }
}
