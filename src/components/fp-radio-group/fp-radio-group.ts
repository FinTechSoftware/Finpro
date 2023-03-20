import { FormControlMixin } from '@open-wc/form-control';
import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import 'element-internals-polyfill';
import { event, EventDispatcher } from '../../utilities/event';
import style from './fp-radio-group.css';
import FpRadio, { fpRadioTag } from './fp-radio/fp-radio';

export const fpRadioGroupTag = 'fp-radio-group';

export const fpChangeEventName = 'fp-radio-change';

/**
 * @tag fp-radio-group
 * @summary Finpro Button component
 *
 * @cssproperty --fp-radio-direction - Can be used for showing radio options as columns instead of rows. Options are `row` or `column`
 */
@customElement(fpRadioGroupTag)
export default class FpRadioGroup extends FormControlMixin(LitElement) {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the radio group label
   */
  @property({ type: String })
  label: string;

  /**
   * Set and gets the actual value of the field
   */
  @property()
  value = '';

  /**
   * Sets option as required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  get options(): FpRadio[] {
    return [].slice.call(this.querySelectorAll(fpRadioTag));
  }

  get availableOptions(): FpRadio[] {
    return this.options.filter(option => !option.disabled);
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('value')) {
      this.setValue(this.value);
      this.onChange(this.value);
    }
  }

  /**
   * Fires when radio group value changed
   */
  @event('fp-radio-change') private onChange: EventDispatcher<string>;

  private focusedOptionIndex = 0;

  private handleOptionChecked(event: CustomEvent) {
    const checkedOption = event.target as FpRadio;
    this.setValue(checkedOption.value);
    this.onChange(checkedOption.value);
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Next option
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      this.focusedOptionIndex++;

      // Previous option
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      this.focusedOptionIndex--;

      // Select option
    } else if ([' '].includes(event.key)) {
      this.availableOptions[this.focusedOptionIndex].select();
      return;
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

  connectedCallback(): void {
    super.connectedCallback();

    this.tabIndex = 0;
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  private handleFocus() {
    this.availableOptions[this.focusedOptionIndex].focus();
  }

  render(): TemplateResult {
    return html`<fieldset
      role="radiogroup"
      aria-labelledby="label"
      aria-required=${this.required}
    >
      <legend>${this.label}</legend>
      <div class="options" @fp-checked=${this.handleOptionChecked}>
        <slot></slot>
      </div>
    </fieldset>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [fpRadioGroupTag]: FpRadioGroup;
  }
  interface HTMLElementEventMap {
    [fpChangeEventName]: CustomEvent<string>;
  }
}
