import {CSSResultGroup, html, TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import style from './fp-card.css';
import {classMap} from "lit/directives/class-map.js";
import FinproElement from '../../internals/finpro-element';
import { HasSlotController } from '../../internals/slot';

export type CardType =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'alternative'
    | 'featured'
    | 'warning'
    | 'success'
    | 'danger';

export type CardBorderRadius =
    | 'n'
    | '2xs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | '2xl'
    | 'pill';


/**
 * @tag fp-card
 * @summary Cards can be used to group related subjects in a container.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 */
@customElement('fp-card')
export default class FpCard extends FinproElement {
    static get styles(): CSSResultGroup {
        return [style];
    }

    /**
     * Sets the card variant
     */
    @property({type: String, reflect: true})
    variant: CardType = 'primary';

    /**
     * Sets the border radius
     */
    @property({type: String, reflect: true})
    borderRadius: CardBorderRadius = 's';

    private readonly hasSlotController = new HasSlotController(this, 'footer', 'header', 'img');

    get _hasDefaultSlot() {
        const childNodes = [...this.childNodes];
        return childNodes.some(node => {
            const nodeType = node.nodeType;
            // has only text node.
            if (nodeType === node.TEXT_NODE && node.textContent?.trim() !== '') {
                return true;
            }
            // has element node, it should not have slot attribute.
            if (nodeType === node.ELEMENT_NODE) {
                if (!(node as HTMLElement).hasAttribute('slot')) {
                    return true;
                }
            }
            return false;
        });
    }

    render(): TemplateResult {
        return html`
            <div part="base"
                 class=${classMap({
                     card: true,
                     'card--has-footer': this.hasSlotController.test('footer'),
                     'card--has-image': this.hasSlotController.test('img'),
                     'card--has-header': this.hasSlotController.test('header')
                 })}>
                <slot name="img" class="card-img" part="img"></slot>
                <slot name="header" class="card-header" part="header"></slot>
                <slot part="body" class="card-body" part="body"></slot>
                <slot name="footer" class="card-footer" part="footer"></slot>
            </div> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-card': FpCard;
    }
}
