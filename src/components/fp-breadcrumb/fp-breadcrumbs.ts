import { CSSResultGroup, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import FinproElement from '../../internals/finpro-element';
import style from './fp-breadcrumbs.css';

export type Item = {
    title: string,
    href: string,
    styling: string
  }

/**
 * @tag fp-breadcrumbs
 * @summary Finpro Breadcrumbs component
 */

export type BreadcrumbsSize =  '5xs' | '4xs' | '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'xxl' | '2xxl' | '3xxl' | '4xxl' ;
@customElement('fp-breadcrumbs')
export default class FpBreadcrumbs extends FinproElement {
    static get styles(): CSSResultGroup {
        return [style];
    }

    /**
     * Sets the breadcrumbs list
     */
    @property({ type: Array })
    list = new Array<Item>();


    /**
     * Sets the breadcrumbs separator
     */
    @property({ type: String })
    separator?: string = '/';

    /**
     * Sets the breadcrumbs size
     */
    @property({ type: String })
    size?: BreadcrumbsSize = 'xs';

    render() {

        return html`
            <ul class="breadcrumbs">
            ${this.list.map(
                (item, index) =>
                html`${index > 0 ? `${this.separator}` : ``}
                    <a href=${item.href}>
                        <li style=${item.styling}>${item.title}</li>
                    </a>
                `
            )}
            </ul>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-breadcrumbs': FpBreadcrumbs;
    }
}