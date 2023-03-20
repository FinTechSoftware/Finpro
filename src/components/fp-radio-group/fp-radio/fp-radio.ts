import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import FinproElement from '../../../internals/finpro-element';
import { event, EventDispatcher } from '../../../utilities/event';
import type FpRadioGroup from '../fp-radio-group';
import { fpChangeEventName, fpRadioGroupTag } from '../fp-radio-group';
import style from './fp-radio.css';


export const fpRadioTag = 'fp-radio';

export const fpCheckedEventName = 'fp-checked';

/**
 * @tag fp-radio
 * @summary Finpro Radio Option component
 */
@customElement(fpRadioTag)
export default class FpRadio extends FinproElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  @property()
  name: string;

  @property()
  value: string;

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;


  @state() private selected = false;

  /**
   * Fires when radio is checked
   */
  @event('fp-checked') private onChecked: EventDispatcher<string>;

  /**
   * Fires when radio is blurred
   */
   @event('fp-focus') private onFocus: EventDispatcher<string>;

  /**
   * Fires when radio is blurred
   */
  @event('fp-blur') private onBlur: EventDispatcher<string>;

  /**
   * Sets this option selected
   */
  select() {
    this.selected = true;
    this.onChecked(this.value);
  }

  /**
   * Readonly property to determine if option is currently checked
   */
  get checked() {
    return this.selected;
  }

  @query('[role=radio]') private radioElement: HTMLElement;

  /**
   * Focuses this option
   */
  focus() {
    this.radioElement.tabIndex = 0;
    this.radioElement.focus();
    this.onFocus(this.value);
  }

  /**
   * Blurs from this option
   */
   blur() {
    this.radioElement.tabIndex = -1;
    this.onBlur(this.value);
  }

  private handleFieldValueChange = (event: CustomEvent<string>) => {
    const newValue = event.detail;
    this.selected = newValue === this.value;
  }

  private field: FpRadioGroup | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.field = this.closest<FpRadioGroup>(fpRadioGroupTag);

    if (!this.field) {
      console.warn('fp-radio is designed to be used inside a fp-radio-group', this);
    }

    this.field?.addEventListener(fpChangeEventName, this.handleFieldValueChange);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.field?.removeEventListener(fpChangeEventName, this.handleFieldValueChange);
  }

  render(): TemplateResult {
    const classes = classMap({
      wrapper: true,
      selected: this.selected
    });

    return html`<div
      class=${classes}
      role="radio"
      aria-labelledby="label"
      aria-disabled=${this.disabled}
      aria-readonly=${this.disabled}
      @blur=${this.blur}
      @click=${this.select}>
      <p id="label"><slot></slot></p>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [fpRadioTag]: FpRadio;
  }
  interface HTMLElementEventMap {
    [fpCheckedEventName]: CustomEvent<string>
  }
}
