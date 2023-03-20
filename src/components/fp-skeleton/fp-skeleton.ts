import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import FinproElement from '../../internals/finpro-element';
import style from './fp-skeleton.css';

/**
 * @tag fp-skeleton
 * @summary Finpro Skeleton component
 */

export type SkeletonRadius =  'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'xxl' | '2xxl' | '3xxl' | '4xxl';
export type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger';

@customElement('fp-skeleton')
export default class FpSkeleton extends FinproElement {
    static get styles(): CSSResultGroup {
        return[style];
    }

    @query('.skeleton') private wrapper: HTMLElement;

    /**
    * Sets the button variant
    */
    @property({ reflect: true })
    variant: SpinnerVariant = 'primary';

    /**
    * Sets the skeleton circle 
    * If Skeleton is a circle, it's width and border-radius will be equal to height
    */
    @property({ type: Boolean, reflect: true })
    circle = false;

    /**
    * Sets the skeleton radius
    */
    @property({ type: String })
    radius: SkeletonRadius = 'xs';

    /**
    * Sets the skeleton animation 
    * Whether to show the animation effect 
    */
    @property({ type: Boolean, reflect: true })
    animation? = false;

    /**
    * Sets the width 
    */
   @property()
    get width() {
        return this._width;
    }
    set width(width: string | number) {
        this._width = width;
        this.updateCssVariable();
    }

    /**
    * Sets the height 
    */
    @property()
    get height() {
        return this._height;
    }
    set height(height: string | number) {
        this._height = height;
        this.updateCssVariable();
    }

    @state() private _width: string | number = '100%';
    @state() private _height: string | number = 'var(--fp-size-2xs)';

    async updateCssVariable() {
        await this.updateComplete;
        this.wrapper.style.setProperty('--width', `${this.width}`);
        this.wrapper.style.setProperty('--height', `${this.height}`);
    }

    render(): TemplateResult {

        return html`<div class='skeleton'>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'fp-skeleton': FpSkeleton;
    }
}