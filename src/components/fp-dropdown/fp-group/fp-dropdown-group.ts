import { html, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './fp-dropdown-group.css';
import { ifDefined } from 'lit/directives/if-defined.js';
import FinproElement from '../../../internals/finpro-element';

export const fpDropdownGroupTag = 'fp-dropdown-group';

/**
 * @tag fp-dropdown-group
 * @summary Finpro Dropdown Group component
 */
@customElement(fpDropdownGroupTag)
export default class FpDropdownGroup extends FinproElement {
    static get styles(): CSSResultGroup {
        return [style];
    }

    /**
     * Sets the caption.
     */
    @property({ type: String })
    caption?: string;


    render(): TemplateResult {
        const caption = this.caption ? html`<span class="caption">${this.caption}</span>` : ''

        return html`<div class="dropdown-group" role="group" aria-labelledby="${ifDefined(this.caption)}">
            ${caption}
          <slot></slot>
        </div>`
    }

}


declare global {
    interface HTMLElementTagNameMap {
        [fpDropdownGroupTag]: FpDropdownGroup;
    }
}

