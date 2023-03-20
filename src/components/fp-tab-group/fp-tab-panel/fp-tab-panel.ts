import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './fp-tab-panel.css';
import type FpTabGroup from '../fp-tab-group';

/**
 * @tag fp-tab-panel
 * @summary Finpro Tab panel component
 */
@customElement('fp-tab-panel')
export default class FpTabPanel extends LitElement {
  static get styles(): CSSResultGroup {
    return [styles];
  }

  private tabGroup: FpTabGroup | null;

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.tabGroup = this.closest('fp-tab-group');
      // FIXME: We need to warn if parent is not tab-group
      this.tabGroup?.registerTabPanel(this);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.tabGroup?.unregisterTabPanel(this);
  }

  /**
   * Name of the linked tab.
   */
  @property({ type: String, reflect: true })
  tab: string;

  /**
   * This attribute set by `tab-group` to make panel visible or hidden.
   */
  @property({ type: Boolean, reflect: true })
  visible = false;

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fp-tab-panel': FpTabPanel;
  }
}
