import { html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { event, EventDispatcher } from '../../../utilities/event';
import type FpDropdownGroup from '../fp-group/fp-dropdown-group';
import type FpDropdown from '../fp-dropdown';

import { fpDropdownGroupTag } from '../fp-group/fp-dropdown-group';
import { fpDropdownTag } from '../fp-dropdown';

import style from './fp-dropdown-item.css';

import '../../fp-button/fp-button';
import { ifDefined } from 'lit/directives/if-defined.js';
import FpButton from '../../fp-button/fp-button';
import FinproElement from '../../../internals/finpro-element';

export const fpDropdownItemTag = 'fp-dropdown-item';

/**
 * @tag fp-dropdown-item
 * @summary Fintech Pro Dropdown Item component
 */
@customElement(fpDropdownItemTag)
export default class FpDropdownItem extends FinproElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the icon name. Shows icon with fp-icon component
   */

  @property({ type: String })
  icon?: string;

  @event('fp-dropdown-item-click') private onClick: EventDispatcher<string>;

  private _handleClick() {
    this.onClick('Action clicked!');
  }

  @query('[role=menuitem]') private menuElement: FpButton;

  /**
   * Focuses this action
   */
   focus() {
    this.menuElement.focus();
  }

  private FpDropdownGroupField: FpDropdownGroup | null;
  private FpDropdownField: FpDropdown | null;

  connectedCallback(): void {
    super.connectedCallback();

    this.FpDropdownGroupField = this.closest<FpDropdownGroup>(fpDropdownGroupTag);
    this.FpDropdownField = this.closest<FpDropdown>(fpDropdownTag);

    if (!this.FpDropdownField && !this.FpDropdownGroupField) {
      console.warn(`fp-dropdown-item is designed to be used inside a ${fpDropdownGroupTag} or ${fpDropdownTag}`, this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  render(): TemplateResult {
    return html`<fp-button
      variant="tertiary"
      kind="neutral"
      icon="${ifDefined(this.icon)}"
      role="menuitem"
      @click="${this._handleClick}"
      ><slot></slot>
    </fp-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [fpDropdownItemTag]: FpDropdownItem;
  }
}
