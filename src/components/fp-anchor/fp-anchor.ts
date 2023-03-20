import { CSSResultGroup, html, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import style from './fp-anchor.css';
import FinproElement from '../../internals/finpro-element';

/**
 * @tag fp-anchor
 * @summary Finpro Anchor component
 */

@customElement('fp-anchor')
export default class FpAnchor extends FinproElement {
    static get styles(): CSSResultGroup {
        return[style];
    }

    /**
     * Sets the anchor label
     */
    @property({ type: String })
    label: '';

    /**
     * Sets the anchor href
     */
    @property({ type: String })
    href: '';

    /**
     * Sets the anchor target
     */
    @property({ type: String })
    target: '';
    

    render(): TemplateResult {
        const href = this.href || '';
        const target = this.target || '';

        return html`<div class='anchor'>
            <a href='${ifDefined(href)}' target='${ifDefined(target)}'>
                <slot name='label'></slot>
            </a>    
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-anchor': FpAnchor;
    }
}