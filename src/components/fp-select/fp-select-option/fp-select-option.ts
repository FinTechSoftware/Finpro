import { html, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import FinproElement from '../../../internals/finpro-element';
import { event, EventDispatcher } from '../../../utilities/event';
import FpSelect, { ISelectOption } from '../fp-select';
import style from './fp-select-option.css';

@customElement('fp-select-option')
export default class FpSelectOption extends FinproElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /* Declare reactive properties */
  /**
   * Sets the value for the option
   */
  @property({})
  value: string;

  /**
   * Sets option as disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Sets option as selected state
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  @state()
  multiple = false;

  /**
   * Fires when clicked on the option
   */
  @event('fp-select-option') private _onSelect: EventDispatcher<ISelectOption>;

  private fpSelect: FpSelect | null;

  private singleOptionTemplate() {
    return html`<div class="single-option" @click="${this._onClickOption}">
      <slot></slot>
    </div>`;
  }

  private checkboxOptionTemplate() {
    return html`<fp-checkbox
      class="checkbox-option"
      .checked="${this.selected}"
      .disabled="${this.disabled}"
      @fp-checkbox-change="${this._onCheckboxChange}"
    >
      <slot></slot>
    </fp-checkbox>`;
  }

  render() {
    return html`<div class="option-container">
      ${this.multiple ? this.checkboxOptionTemplate() : this.singleOptionTemplate()}
    </div>`;
  }

  private _handleEvent() {
    this._onSelect({
      value: this.value,
      text: this.textContent,
      selected: this.selected,
    } as ISelectOption);
  }

  private _onClickOption() {
    this.selected = !this.selected;
    this._handleEvent();
  }

  private _onCheckboxChange(event: CustomEvent) {
    this.selected = event.detail;
    this._handleEvent();
  }

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.fpSelect = this.closest<FpSelect>('fp-select');
      // FIXME: We should warn when parent is not fp-select

      this.multiple = this.fpSelect?.multiple || false;
      this.fpSelect?.registerOption(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.fpSelect?.unregisterOption(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fp-select-option': FpSelectOption;
  }
}
