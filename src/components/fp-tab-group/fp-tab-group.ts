import { CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import style from './fp-tab-group.css';
import './fp-tab-panel/fp-tab-panel';
import './fp-tab/fp-tab';
import FpTabPanel from './fp-tab-panel/fp-tab-panel';
import FpTab from './fp-tab/fp-tab';

export type TabGroupOverflow = 'auto' | 'clip' | 'hidden' | 'inherit' | 'initial' | 'overlay' | 'revert' | 'scroll' | 'unset' | 'visible';
export type TabGroupBorderRadius = 'n' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';

/**
 * @tag fp-tab-group
 * @summary Finpro Tab group component
 */
@customElement('fp-tab-group')
export default class FpTabGroup extends LitElement {
  static get styles(): CSSResultGroup {
    return [style];
  }

  /**
   * Sets the tab group overflow-x
  */
  @property({ type: String, reflect: true })
  overflowX: TabGroupOverflow = 'auto';
  /**
   * Sets the tab group overflow-y
  */
  @property({ type: String, reflect: true })
  overflowY: TabGroupOverflow = 'auto';
  /**
   * Sets the tab group border radius
  */
  @property({ type: String, reflect: true })
  borderRadius: TabGroupBorderRadius = 'l'

  private _connectedTabs: FpTab[] = [];
  private _connectedPanels: FpTabPanel[] = [];

  get tabs() {
    return this._connectedTabs;
  }

  get panels() {
    return this._connectedPanels;
  }

  /**
   * This method is used by `tab` component to register them self to the tab group.
   * @param tab FpTab reference to be registered
   */
  registerTab(tab: FpTab) {
    const isFirstAndNotDisabled =
      this._connectedTabs.filter(t => !t.disabled).length === 0 && !tab.disabled;
    this._connectedTabs.push(tab);

    if ((!tab.disabled && tab.selected) || isFirstAndNotDisabled) {
      this.selectedTabName = tab.name;
    }
  }

  /**
   * This method is used by `tab` component to unregister them self to the tab group.
   * @param tab FpTab reference to be unregistered
   */
  unregisterTab(tab: FpTab) {
    this._connectedTabs.splice(this._connectedTabs.indexOf(tab), 1);
    if (tab.selected) {
      this._connectedTabs.find(t => !t.disabled)?.select();
    }
  }

  /**
   * This method is used by `tab-panel` component to register them self to the tab group.
   * @param panel FpTabPanel reference to be registered
   */
  registerTabPanel(panel: FpTabPanel) {
    panel.visible = panel.tab === this.selectedTabName;
    this._connectedPanels.push(panel);
  }

  /**
   * This method is used by `tab-panel` component to unregister them self to the tab group.
   * @param panel FpTabPanel reference to be unregistered
   */
  unregisterTabPanel(panel: FpTabPanel) {
    this._connectedTabs.splice(this._connectedPanels.indexOf(panel), 1);
  }


  private _selectedTabName: string;

  get selectedTabName() {
    return this._selectedTabName;
  }

  set selectedTabName(name: string) {
    this._selectedTabName = name;
    this._connectedTabs.forEach(t => {
      t.selected = name === t.name;
    });
    this._connectedPanels.forEach(p => {
      p.visible = p.tab === this._selectedTabName;
    });
  }

  private _handleTabSelected(e: CustomEvent) {
    this.selectedTabName = e.detail;
  }

  render(): TemplateResult {
    return html` <div class="container" @fp-tab-selected="${this._handleTabSelected}">
      <div role="tablist" class="tabs-list">
        <div class="tabs">
          <slot name="tabs"></slot>
        </div>
      </div>
      <div role="tabpanel" class="panels">
        <slot></slot>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fp-tab-group': FpTabGroup;
  }
}
