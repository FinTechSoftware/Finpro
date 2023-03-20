import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from "lit/directives/class-map.js";
import FinproElement from "../../../internals/finpro-element";
import { getTextContent } from "../../../internals/slot";
import { watch } from "../../../internals/watch";
import style from './fp-menu-item.css';

/**
 * @tag fp-menu-item
 * @summary Finpro Menu Item component
 *
 * @csspart base - The component's base wrapper.
 * @csspart checked-icon - The checked icon, which is only visible when the menu item is checked.
 * @csspart prefix - The prefix container.
 * @csspart label - The menu item label.
 * @csspart suffix - The suffix container.
 */
@customElement('fp-menu-item')
export default class FpMenuItem extends FinproElement {
    static get styles(): CSSResultGroup {
        return [style]
    }

    private cachedTextLabel: string;

    @query('slot:not([name])') defaultSlot: HTMLSlotElement;
    
    @query('.menu-item') menuItem: HTMLElement;

    @property() type: 'normal' | 'checkbox' = 'normal';

    @property({ type: Boolean, reflect: true }) checked = false;

    @property() value = '';

    @property({ type: Boolean, reflect: true }) disabled = false;

    connectedCallback() {
        super.connectedCallback();
        this.handleHostClick = this.handleHostClick.bind(this);
        this.addEventListener('click', this.handleHostClick);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleHostClick);
    }

    private handleDefaultSlotChange() {
        const textLabel = this.getTextLabel();

        if (typeof this.cachedTextLabel === 'undefined') {
            this.cachedTextLabel = textLabel;
            return;
        }

        if (textLabel !== this.cachedTextLabel) {
            this.cachedTextLabel = textLabel;
            this.emit('slotchange', { bubbles: true, composed: false, cancelable: false });
        }
    }

    private handleHostClick(event: MouseEvent) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }

    @watch('checked')
    handleCheckedChange() {
        if (this.checked && this.type !== 'checkbox') {
            this.checked = false;
            console.error('The checked attribute can only be used on menu items with type="checkbox"', this);
            return;
        }

        if (this.type === 'checkbox') {
            this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
        } else {
            this.removeAttribute('aria-checked');
        }
    }

    @watch('disabled')
    handleDisabledChange() {
        this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }

    @watch('type')
    handleTypeChange() {
        if (this.type === 'checkbox') {
            this.setAttribute('role', 'menuitemcheckbox');
            this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
        } else {
            this.setAttribute('role', 'menuitem');
            this.removeAttribute('aria-checked');
        }
    }

    getTextLabel() {
        return getTextContent(this.defaultSlot);
    }

    render(): TemplateResult {
        return html`
        <div
          part="base"
          class=${classMap({
            'menu-item': true,
            'menu-item--checked': this.checked,
            'menu-item--disabled': this.disabled,
            'menu-item--has-submenu': false // reserved for future use
        })}
        >
          <span part="checked-icon" class="menu-item__check">
            <fp-icon name="check" library="system" aria-hidden="true"></fp-icon>
          </span>
          <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>
          <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>
          <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>
          <span class="menu-item__chevron">
            <fp-icon name="chevron-right" library="system" aria-hidden="true"></fp-icon>
          </span>
        </div>
      `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-menu-item': FpMenuItem;
    }
}