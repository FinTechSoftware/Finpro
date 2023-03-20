import { FormControlMixin } from '@open-wc/form-control';
import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import 'element-internals-polyfill';
import { event, EventDispatcher } from '../../../utilities/event';
import '../../fp-icon/fp-icon';
import type FpCheckboxGroup from '../fp-checkbox-group';
import style from './fp-checkbox.css';
import { fpCheckboxGroupTag, fpChangeEventName } from '../fp-checkbox-group';
import FinproElement from '../../../internals/finpro-element';

export const fpCheckboxTag = 'fp-checkbox';

/**
 * @tag fp-checkbox
 * @summary Finpro Checkbox component
 */
@customElement(fpCheckboxTag)
export default class FpCheckbox extends FormControlMixin(FinproElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the checked state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Sets the checkbox value
   */
  @property()
  value: string;

  /**
   * Sets checkbox as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Sets the disabled state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets the indeterminate state for checkbox
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Fires whenever user change the value of the checkbox.
   */
  @event('fp-checkbox-change') private onChange: EventDispatcher<boolean>;

  /**
   * Fires when checkbox is focused
   */
  @event('fp-focus') private onFocus: EventDispatcher<string>;

  /**
   * Fires when checkbox is blurred
   */
  @event('fp-blur') private onBlur: EventDispatcher<string>;

  @query('[type=checkbox]') checkboxElement: HTMLElement;

  protected field: FpCheckboxGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<FpCheckboxGroup>(fpCheckboxGroupTag);
    this.field?.addEventListener(fpChangeEventName, this.handleFieldValueChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(fpChangeEventName, this.handleFieldValueChange);
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('checked') && this.required && this.checked) {
      this.setValue(this.value);
    }
  }

  update(changedProperties: Map<string, unknown>) {
    super.update(changedProperties);
    if (this.indeterminate && this.checked) {
      this.checked = false;
      this.requestUpdate('checked', true);
    }
  }

  /**
   * Focuses this option
   */
  focus() {
    this.checkboxElement.tabIndex = 0;
    this.checkboxElement.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
  blur() {
    this.onBlur(this.value);
    if (!this.field) return;
    this.checkboxElement.tabIndex = -1;
  }

  private handleChange(event: CustomEvent) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(target.checked);
    this.indeterminate = false;
  }

  private handleFieldValueChange = (event: CustomEvent<Array<string>>) => {
    this.checked = event.detail.includes(this.value);
  };

  render(): TemplateResult {
    let icon = '';
    if (this.checked) icon = 'check';
    if (this.indeterminate) icon = 'minus';

    return html`
      <label>
        <input
          type="checkbox"
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          aria-required=${this.required}
          aria-labelledby="label"
          aria-readonly=${this.disabled}
          .indeterminate=${this.indeterminate}
          @change=${this.handleChange}
          value=${ifDefined(this.value)}
          @blur=${this.blur}
        />
        <div class="check-mark">${icon ? html`<fp-icon name="${icon}"></fp-icon>` : null}</div>
        <span class="label"><slot></slot></span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [fpCheckboxTag]: FpCheckbox;
  }
}
