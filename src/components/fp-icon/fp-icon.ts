import { CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import FinproElement from '../../internals/finpro-element';
import { getIconPath } from '../../utilities/asset-paths';
import { event, EventDispatcher } from '../../utilities/event';

import style from './fp-icon.css';

const requestMap = new Map<string, Promise<Response>>();

/**
 * @tag fp-icon
 * @summary Finpro Icon component
 *
 * @cssproperty font-size - Setting size of icon. Default is current font size in DOM place
 * @cssproperty color - Setting color of icon. Default is `currentColor`
 */
@customElement('fp-icon')
export default class FpIcon extends FinproElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  private _iconName: string;

  /**
   * Name of the icon to show
   */
  @property()
  get name(): string {
    return this._iconName;
  }

  set name(value: string) {
    if (value !== this._iconName) {
      this._iconName = value;
      this.load();
    }
  }

  /**
   * Fires when SVG icon loaded
   */
  @event('fp-load') private onLoad: EventDispatcher<string>;

  /**
   * Fires when SVG icon failed to load
   */
  @event('fp-error') private onError: EventDispatcher<string>;

  @state() private svg: string;

  async load() {
    const iconPath = getIconPath();
    const fileUrl = `${iconPath}/${this.name}.svg`;

    if (!requestMap.has(fileUrl)) {
      requestMap.set(fileUrl, fetch(fileUrl));
    }

    try {
      const iconRequest = await requestMap.get(fileUrl);
      const res = await iconRequest?.clone();

      if (res?.ok) {
        this.svg = await res.text();
        this.onLoad(`${this.name} icon loaded`);
        this.requestUpdate();
      } else {
        this.onError(`${this.name} icon failed to load`);
      }
    } catch (error) {
      this.onError(`${this.name} icon failed to load [${error}]`);
    }
  }

  render(): TemplateResult {
    return html`<div aria-hidden="true">${unsafeSVG(this.svg)}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fp-icon': FpIcon;
  }
}
