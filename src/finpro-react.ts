/* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-nocheck
    import React from 'react';
import { createComponent } from '@lit-labs/react';
import type FpAlertType from "./components/fp-alert/fp-alert";
import type FpAnchorType from "./components/fp-anchor/fp-anchor";
import type FpBadgeType from "./components/fp-badge/fp-badge";
import type FpBreadcrumbsType from "./components/fp-breadcrumb/fp-breadcrumbs";
import type FpButtonType from "./components/fp-button/fp-button";
import type FpCheckboxGroupType from "./components/fp-checkbox-group/fp-checkbox-group";
import type FpDialogType from "./components/fp-dialog/fp-dialog";
import type FpCardType from "./components/fp-card/fp-card";
import type FpDividerType from "./components/fp-divider/fp-divider";
import type FpDrawerType from "./components/fp-drawer/fp-drawer";
import type FpDropdownType from "./components/fp-dropdown/fp-dropdown";
import type FpIconType from "./components/fp-icon/fp-icon";
import type FpInputType from "./components/fp-input/fp-input";
import type FpMenuType from "./components/fp-menu/fp-menu";
import type FpPaginationType from "./components/fp-pagination/fp-pagination";
import type FpPopoverType from "./components/fp-popover/fp-popover";
import type FpProgressIndicatorType from "./components/fp-progress-indicator/fp-progress-indicator";
import type FpQrCodeType from "./components/fp-qr-code/fp-qr-code";
import type FpRadioGroupType from "./components/fp-radio-group/fp-radio-group";
import type FpSelectType from "./components/fp-select/fp-select";
import type FpSkeletonType from "./components/fp-skeleton/fp-skeleton";
import type FpSpinnerType from "./components/fp-spinner/fp-spinner";
import type FpSwitchType from "./components/fp-switch/fp-switch";
import type FpTabGroupType from "./components/fp-tab-group/fp-tab-group";
import type FpTextareaType from "./components/fp-text-area/fp-text-area";
import type FpTooltipType from "./components/fp-tooltip/fp-tooltip";
import type FpCheckboxType from "./components/fp-checkbox-group/fp-checkbox/fp-checkbox";
import type FpDropdownGroupType from "./components/fp-dropdown/fp-group/fp-dropdown-group";
import type FpDropdownItemType from "./components/fp-dropdown/fp-item/fp-dropdown-item";
import type FpMenuItemType from "./components/fp-menu/fp-menu-item/fp-menu-item";
import type FpMenuLabelType from "./components/fp-menu/fp-menu-label/fp-menu-label";
import type FpRadioType from "./components/fp-radio-group/fp-radio/fp-radio";
import type FpSelectOptionType from "./components/fp-select/fp-select-option/fp-select-option";
import type FpTabType from "./components/fp-tab-group/fp-tab/fp-tab";
import type FpTabPanelType from "./components/fp-tab-group/fp-tab-panel/fp-tab-panel";
    
  export const FpAlert = React.lazy(() =>
    customElements.whenDefined('fp-alert').then(elem => ({
        default: createComponent<FpAlertType>(
          {
            react: React,
            tagName: 'fp-alert',
            elementClass: elem,
            events:{"onClose":"fp-close"}
          }
      )
      })
 ));
   


  export const FpAnchor = React.lazy(() =>
    customElements.whenDefined('fp-anchor').then(elem => ({
        default: createComponent<FpAnchorType>(
          {
            react: React,
            tagName: 'fp-anchor',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpBadge = React.lazy(() =>
    customElements.whenDefined('fp-badge').then(elem => ({
        default: createComponent<FpBadgeType>(
          {
            react: React,
            tagName: 'fp-badge',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpBreadcrumbs = React.lazy(() =>
    customElements.whenDefined('fp-breadcrumbs').then(elem => ({
        default: createComponent<FpBreadcrumbsType>(
          {
            react: React,
            tagName: 'fp-breadcrumbs',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpButton = React.lazy(() =>
    customElements.whenDefined('fp-button').then(elem => ({
        default: createComponent<FpButtonType>(
          {
            react: React,
            tagName: 'fp-button',
            elementClass: elem,
            events:{"onClick":"fp-click"}
          }
      )
      })
 ));
   


  export const FpCheckboxGroup = React.lazy(() =>
    customElements.whenDefined('fp-checkbox-group').then(elem => ({
        default: createComponent<FpCheckboxGroupType>(
          {
            react: React,
            tagName: 'fp-checkbox-group',
            elementClass: elem,
            events:{"onChange":"fp-checkbox-group-change"}
          }
      )
      })
 ));
   


  export const FpDialog = React.lazy(() =>
    customElements.whenDefined('fp-dialog').then(elem => ({
        default: createComponent<FpDialogType>(
          {
            react: React,
            tagName: 'fp-dialog',
            elementClass: elem,
            events:{"onOpen":"fp-dialog-open","onClose":"fp-dialog-close"}
          }
      )
      })
 ));
   


  export const FpCard = React.lazy(() =>
    customElements.whenDefined('fp-card').then(elem => ({
        default: createComponent<FpCardType>(
          {
            react: React,
            tagName: 'fp-card',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpDivider = React.lazy(() =>
    customElements.whenDefined('fp-divider').then(elem => ({
        default: createComponent<FpDividerType>(
          {
            react: React,
            tagName: 'fp-divider',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpDrawer = React.lazy(() =>
    customElements.whenDefined('fp-drawer').then(elem => ({
        default: createComponent<FpDrawerType>(
          {
            react: React,
            tagName: 'fp-drawer',
            elementClass: elem,
            events:{"onOpen":"fp-drawer-open","onClose":"fp-drawer-close"}
          }
      )
      })
 ));
   


  export const FpDropdown = React.lazy(() =>
    customElements.whenDefined('fp-dropdown').then(elem => ({
        default: createComponent<FpDropdownType>(
          {
            react: React,
            tagName: 'fp-dropdown',
            elementClass: elem,
            events:{"onOpen":"fp-dropdown-open","onClose":"fp-dropdown-close"}
          }
      )
      })
 ));
   


  export const FpIcon = React.lazy(() =>
    customElements.whenDefined('fp-icon').then(elem => ({
        default: createComponent<FpIconType>(
          {
            react: React,
            tagName: 'fp-icon',
            elementClass: elem,
            events:{"onLoad":"fp-load","onError":"fp-error"}
          }
      )
      })
 ));
   


  export const FpInput = React.lazy(() =>
    customElements.whenDefined('fp-input').then(elem => ({
        default: createComponent<FpInputType>(
          {
            react: React,
            tagName: 'fp-input',
            elementClass: elem,
            events:{"onChange":"fp-change","onInput":"fp-input","onInvalid":"fp-invalid"}
          }
      )
      })
 ));
   


  export const FpMenu = React.lazy(() =>
    customElements.whenDefined('fp-menu').then(elem => ({
        default: createComponent<FpMenuType>(
          {
            react: React,
            tagName: 'fp-menu',
            elementClass: elem,
            events:{"onSelect":"fp-select"}
          }
      )
      })
 ));
   


  export const FpPagination = React.lazy(() =>
    customElements.whenDefined('fp-pagination').then(elem => ({
        default: createComponent<FpPaginationType>(
          {
            react: React,
            tagName: 'fp-pagination',
            elementClass: elem,
            events:{"onChange":"fp-change"}
          }
      )
      })
 ));
   


  export const FpPopover = React.lazy(() =>
    customElements.whenDefined('fp-popover').then(elem => ({
        default: createComponent<FpPopoverType>(
          {
            react: React,
            tagName: 'fp-popover',
            elementClass: elem,
            events:{"onShow":"fp-popover-show","onHide":"fp-popover-hide"}
          }
      )
      })
 ));
   


  export const FpProgressIndicator = React.lazy(() =>
    customElements.whenDefined('fp-progress-indicator').then(elem => ({
        default: createComponent<FpProgressIndicatorType>(
          {
            react: React,
            tagName: 'fp-progress-indicator',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpQrCode = React.lazy(() =>
    customElements.whenDefined('fp-qr-code').then(elem => ({
        default: createComponent<FpQrCodeType>(
          {
            react: React,
            tagName: 'fp-qr-code',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpRadioGroup = React.lazy(() =>
    customElements.whenDefined('fp-radio-group').then(elem => ({
        default: createComponent<FpRadioGroupType>(
          {
            react: React,
            tagName: 'fp-radio-group',
            elementClass: elem,
            events:{"onChange":"fp-radio-change"}
          }
      )
      })
 ));
   


  export const FpSelect = React.lazy(() =>
    customElements.whenDefined('fp-select').then(elem => ({
        default: createComponent<FpSelectType>(
          {
            react: React,
            tagName: 'fp-select',
            elementClass: elem,
            events:{"onSelect":"fp-select"}
          }
      )
      })
 ));
   


  export const FpSkeleton = React.lazy(() =>
    customElements.whenDefined('fp-skeleton').then(elem => ({
        default: createComponent<FpSkeletonType>(
          {
            react: React,
            tagName: 'fp-skeleton',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpSpinner = React.lazy(() =>
    customElements.whenDefined('fp-spinner').then(elem => ({
        default: createComponent<FpSpinnerType>(
          {
            react: React,
            tagName: 'fp-spinner',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpSwitch = React.lazy(() =>
    customElements.whenDefined('fp-switch').then(elem => ({
        default: createComponent<FpSwitchType>(
          {
            react: React,
            tagName: 'fp-switch',
            elementClass: elem,
            events:{"onToggle":"fp-switch-toggle"}
          }
      )
      })
 ));
   


  export const FpTabGroup = React.lazy(() =>
    customElements.whenDefined('fp-tab-group').then(elem => ({
        default: createComponent<FpTabGroupType>(
          {
            react: React,
            tagName: 'fp-tab-group',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpTextarea = React.lazy(() =>
    customElements.whenDefined('fp-textarea').then(elem => ({
        default: createComponent<FpTextareaType>(
          {
            react: React,
            tagName: 'fp-textarea',
            elementClass: elem,
            events:{"onInput":"fp-input","onChange":"fp-change","onInvalid":"fp-invalid"}
          }
      )
      })
 ));
   


  export const FpTooltip = React.lazy(() =>
    customElements.whenDefined('fp-tooltip').then(elem => ({
        default: createComponent<FpTooltipType>(
          {
            react: React,
            tagName: 'fp-tooltip',
            elementClass: elem,
            events:{"onShow":"fp-tooltip-show","onHide":"fp-tooltip-hide"}
          }
      )
      })
 ));
   


  export const FpCheckbox = React.lazy(() =>
    customElements.whenDefined('fp-checkbox').then(elem => ({
        default: createComponent<FpCheckboxType>(
          {
            react: React,
            tagName: 'fp-checkbox',
            elementClass: elem,
            events:{"onChange":"fp-checkbox-change","onFocus":"fp-focus","onBlur":"fp-blur"}
          }
      )
      })
 ));
   


  export const FpDropdownGroup = React.lazy(() =>
    customElements.whenDefined('fp-dropdown-group').then(elem => ({
        default: createComponent<FpDropdownGroupType>(
          {
            react: React,
            tagName: 'fp-dropdown-group',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpDropdownItem = React.lazy(() =>
    customElements.whenDefined('fp-dropdown-item').then(elem => ({
        default: createComponent<FpDropdownItemType>(
          {
            react: React,
            tagName: 'fp-dropdown-item',
            elementClass: elem,
            events:{"onClick":"fp-dropdown-item-click"}
          }
      )
      })
 ));
   


  export const FpMenuItem = React.lazy(() =>
    customElements.whenDefined('fp-menu-item').then(elem => ({
        default: createComponent<FpMenuItemType>(
          {
            react: React,
            tagName: 'fp-menu-item',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpMenuLabel = React.lazy(() =>
    customElements.whenDefined('fp-menu-label').then(elem => ({
        default: createComponent<FpMenuLabelType>(
          {
            react: React,
            tagName: 'fp-menu-label',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));
   


  export const FpRadio = React.lazy(() =>
    customElements.whenDefined('fp-radio').then(elem => ({
        default: createComponent<FpRadioType>(
          {
            react: React,
            tagName: 'fp-radio',
            elementClass: elem,
            events:{"onChecked":"fp-checked","onFocus":"fp-focus","onBlur":"fp-blur"}
          }
      )
      })
 ));
   


  export const FpSelectOption = React.lazy(() =>
    customElements.whenDefined('fp-select-option').then(elem => ({
        default: createComponent<FpSelectOptionType>(
          {
            react: React,
            tagName: 'fp-select-option',
            elementClass: elem,
            events:{"onOption":"fp-select-option"}
          }
      )
      })
 ));
   


  export const FpTab = React.lazy(() =>
    customElements.whenDefined('fp-tab').then(elem => ({
        default: createComponent<FpTabType>(
          {
            react: React,
            tagName: 'fp-tab',
            elementClass: elem,
            events:{"onSelected":"fp-tab-selected"}
          }
      )
      })
 ));
   


  export const FpTabPanel = React.lazy(() =>
    customElements.whenDefined('fp-tab-panel').then(elem => ({
        default: createComponent<FpTabPanelType>(
          {
            react: React,
            tagName: 'fp-tab-panel',
            elementClass: elem,
            events:{}
          }
      )
      })
 ));