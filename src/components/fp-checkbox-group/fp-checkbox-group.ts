import { FormControlMixin } from '@open-wc/form-control';
import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'element-internals-polyfill';
import { event, EventDispatcher } from '../../utilities/event';
import style from './fp-checkbox-group.css';
import FpCheckbox, { fpCheckboxTag } from './fp-checkbox/fp-checkbox';
import FinproElement from '../../internals/finpro-element';

export const fpCheckboxGroupTag = 'fp-checkbox-group';

export const fpChangeEventName = 'fp-checkbox-group-change';

/**
 * @tag fp-checkbox-group
 * @summary Finpro Button component
 *
 * @cssproperty --fp-checkbox-direction - Can be used for showing checkbox options as columns instead of rows. Options are `row` or `column`
 */
@customElement(fpCheckboxGroupTag)
export default class FpCheckboxGroup extends FormControlMixin(FinproElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the checkbox group label
   */
  @property({ type: String })
  label: string;

  /**
   * Set and gets the actual value of the field
   */
  @property({ type: Array, reflect: true })
  value: string[] = [];

  /**
   * Sets option as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  get options(): FpCheckbox[] {
    return [].slice.call(this.querySelectorAll(fpCheckboxTag));
  }

  get checkedOptions(): string[] {
    return this.options.filter(opt => opt.checked).map(opt => opt.value);
  }

  get availableOptions(): FpCheckbox[] {
    return this.options.filter(option => !option.disabled);
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.tabIndex = 0;
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.setValue(this.checkedOptions.join(','));
      this.onChange(this.value);
    }
  }

  /**
   * Fires when checkbox group value changed
   */
  @event('fp-checkbox-group-change') private onChange: EventDispatcher<string[]>;

  private focusedOptionIndex = 0;

  private handleOptionChecked() {
    this.value = this.checkedOptions;
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Next option
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous option
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      this.focusedOptionIndex--;

      // next or previous option with tab / hold shift & tab
    } else if (event.key === 'Tab') {
      event.shiftKey ? this.focusedOptionIndex-- : this.focusedOptionIndex++;

      if (this.focusedOptionIndex === this.availableOptions.length) {
        this.tabIndex = 0;
        this.focusedOptionIndex = 0;
        return;
      }
    } else {
      // Other keys are not our interest here
      return;
    }

    // Don't exceed array indexes
    this.focusedOptionIndex = Math.max(
      0,
      Math.min(this.focusedOptionIndex, this.availableOptions.length - 1)
    );

    this.availableOptions[this.focusedOptionIndex].focus();

    event.preventDefault();
  }

  private handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus();
  }

  render(): TemplateResult {
    return html`<fieldset role="group" aria-labelledby="label" aria-required=${this.required}>
      <legend id="label">${this.label}</legend>
      <div class="options" @fp-checkbox-change=${this.handleOptionChecked}>
        <slot></slot>
      </div>
    </fieldset>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [fpCheckboxGroupTag]: FpCheckboxGroup;
  }
  interface HTMLElementEventMap {
    [fpChangeEventName]: CustomEvent<string[]>;
  }
}
