import { CSSResultGroup, html, TemplateResult } from "lit";
import { customElement } from 'lit/decorators.js';
import FinproElement from "../../../internals/finpro-element";
import style from './fp-menu-label.css';

/**
 * @tag fp-menu-label
 * @summary Finpro Menu Label component
 *
 * @csspart base - The component's base wrapper.
 */
@customElement('fp-menu-label')
export default class FpMenuLabel extends FinproElement {
    static get styles(): CSSResultGroup {
        return [style]
    }

    render(): TemplateResult {
        return html` <slot part="base" class="menu-label"></slot> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-menu-label': FpMenuLabel;
    }
}