import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './fp-spinner.css';

export type SpinnerType = 'oval' | 'bars' | 'dots';
export type SpinnerSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'xxl' | '2xxl' | '3xxl' | '4xxl';
export type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger'

/**
 * @tag fp-spinner
 * @summary Finpro Button component
 */

@customElement('fp-spinner')
export default class FpSpinner extends LitElement {
    static get styles(): CSSResultGroup {
        return [style];
    }

    /**
    * Sets the button type
    */
    @property({ type: String, reflect: true })
    type: SpinnerType = 'oval';

    /**
    * Sets the button size
    */
    @property({ type: String, reflect: true })
    size: SpinnerSize = '5xl';

    /**
    * Sets the button variant
    */
    @property({ reflect: true })
    variant: SpinnerVariant = 'primary';

    private _handleSvg() {
        switch (this.type) {
            case 'oval':
                return '<svg width="1.375rem" height="1.375rem" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="var(--fp-color-primary)" class="spinner" role="presentation"><g fill="none" fill-rule="evenodd"><g transform="translate(2.5 2.5)" stroke-width="5"><circle stroke-opacity=".5" cx="16" cy="16" r="16"></circle><path d="M32 16c0-9.94-8.06-16-16-16"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g></svg>'
            case 'bars':
                return '<svg viewBox="0 0 135 140" xmlns="http://www.w3.org/2000/svg" fill="var(--fp-color-primary)" width="1.375rem" class="spinner" role="presentation"><rect y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="30" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="60" width="15" height="140" rx="6"><animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="90" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect><rect x="120" y="10" width="15" height="120" rx="6"><animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"></animate></rect></svg>'
            case 'dots':
                return '<svg width="2.25rem" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="var(--fp-color-primary)" class="spinner" role="presentation"><circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="60" cy="15" r="9" fill-opacity="0.3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"></animate></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"></animate></circle></svg>'
            default:
                return '<svg width="1.375rem" height="1.375rem" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="var(--fp-color-primary)" class="spinner" role="presentation"><g fill="none" fill-rule="evenodd"><g transform="translate(2.5 2.5)" stroke-width="5"><circle stroke-opacity=".5" cx="16" cy="16" r="16"></circle><path d="M32 16c0-9.94-8.06-16-16-16"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite"></animateTransform></path></g></g></svg>'
        }
    }

    render(): TemplateResult {

        return html`<span class='spinner'>
            ${unsafeSVG(this._handleSvg())}
        </span>     
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-spinner': FpSpinner;
    }
}
