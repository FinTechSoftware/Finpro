import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import FinproElement from '../../internals/finpro-element';
import style from './fp-divider.css';

/**
 * @tag fp-divider
 * @summary Finpro Divider component
 */

export type DividerSize =    '5xs' | '4xs' | '3xs' | '2xs' | 'xs' | 's';
export type DividerVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type DividerType = 'dashed' | 'dotted' | 'solid' | 'rounded';

@customElement('fp-divider')
export default class FpDivider extends FinproElement {
    static get styles(): CSSResultGroup {
        return[style];
    }

    /** 
    * Sets the divider size
    */
    @property({ type: String })
    size: DividerSize = 's';

    /**
    * Sets the divider type
    */
    @property({ type: String })
    type: DividerType = 'solid';

    /**
    * Sets the divider variant 
    */
    @property({ type: String })
    variant: DividerVariant = 'primary';
    
    render(): TemplateResult {
        return html`<div class='divider'></div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-divider': FpDivider;
    }
}