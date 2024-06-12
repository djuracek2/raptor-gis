System.register(["jimu-core","jimu-for-builder","jimu-layouts/layout-builder","jimu-ui","jimu-ui/advanced/setting-components"],(function(e,t){var o={},a={},n={},r={},i={};return{setters:[function(e){o.BrowserSizeMode=e.BrowserSizeMode,o.DialogMode=e.DialogMode,o.ErrorBoundary=e.ErrorBoundary,o.GridItemType=e.GridItemType,o.LayoutItemType=e.LayoutItemType,o.LayoutParentType=e.LayoutParentType,o.LayoutType=e.LayoutType,o.PagePart=e.PagePart,o.PageType=e.PageType,o.React=e.React,o.ReactRedux=e.ReactRedux,o.appActions=e.appActions,o.classNames=e.classNames,o.css=e.css,o.getAppStore=e.getAppStore,o.hooks=e.hooks,o.jsx=e.jsx,o.utils=e.utils},function(e){a.builderAppSync=e.builderAppSync,a.getAppConfigAction=e.getAppConfigAction},function(e){n.getLabelOfGridTab=e.getLabelOfGridTab},function(e){r.Button=e.Button,r.Dropdown=e.Dropdown,r.DropdownButton=e.DropdownButton,r.DropdownItem=e.DropdownItem,r.DropdownMenu=e.DropdownMenu,r.Icon=e.Icon,r.Popper=e.Popper,r.Switch=e.Switch,r.Tooltip=e.Tooltip,r.defaultMessages=e.defaultMessages,r.styleUtils=e.styleUtils},function(e){i.changeCurrentDialog=e.changeCurrentDialog,i.changeCurrentPage=e.changeCurrentPage}],execute:function(){e((()=>{var e={9203:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 1H8v3H7V1H1v6h3v1H1v6h6v-3h1v3h6V8h-3V7h3zM1 0a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" clip-rule="evenodd"></path></svg>'},3626:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 1v13H1V7.46l2.138 2.348a.508.508 0 0 0 .752-.684L2.867 8H6V7H2.794l1.023-1.124a.508.508 0 0 0-.752-.685L1 7.46V1zm0-1a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zm-1.867 7L11.11 5.876a.508.508 0 1 1 .752-.684L14 7.54l-2.065 2.268a.508.508 0 0 1-.751-.684L12.206 8H9V7z" clip-rule="evenodd"></path></svg>'},3273:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M4.653 13.854a.485.485 0 0 1 0-.708L10.24 8 4.653 2.854a.485.485 0 0 1 0-.708.538.538 0 0 1 .738 0l5.956 5.5a.485.485 0 0 1 0 .708l-5.956 5.5a.538.538 0 0 1-.738 0" clip-rule="evenodd"></path></svg>'},8992:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M0 7.5A.5.5 0 0 1 .5 7h14a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"></path></svg>'},4750:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5"></path></svg>'},8866:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16m0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd"></path></svg>'},8891:e=>{"use strict";e.exports=o},3137:e=>{"use strict";e.exports=a},7282:e=>{"use strict";e.exports=n},726:e=>{"use strict";e.exports=r},7756:e=>{"use strict";e.exports=i}},t={};function s(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,s),n.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="";var l={};return s.p=window.jimuConfig.baseUrl,(()=>{"use strict";s.r(l),s.d(l,{__set_webpack_public_path__:()=>E,default:()=>A});var e=s(8891),t=s(726),o=s(3137),a=s(7756);function n(o){const{pageId:a,label:n,isInFolder:r,isFolder:i,isActive:s,hasSubPage:l,onSelect:p}=o,c=e.React.useCallback((()=>{p(a)}),[a,p]);return(0,e.jsx)(t.DropdownItem,{className:(0,e.classNames)({"page-item":!i||l,"in-folder":r,folder:i&&!l,"has-subpage":l,active:s}),active:s,header:i&&!l,onClick:c},(0,e.jsx)("div",{className:"text-truncate w-100",title:n},n))}function r(e){(0,a.changeCurrentPage)(e)}function i(t){const a=e.ReactRedux.useSelector((e=>{var t,o;return null===(o=null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appConfig)||void 0===o?void 0:o.pageStructure})),i=[];if(a){const t=(0,o.getAppConfigAction)().appConfig.pages;a.forEach((o=>{var a,n;const r=Object.keys(o)[0],s=t[r];if(s.type===e.PageType.Normal)if((null===(a=o[r])||void 0===a?void 0:a.length)>0){const a=[];o[r].forEach((o=>{const n=t[o];n.type===e.PageType.Normal&&a.push({pageId:o,label:n.label,isInFolder:!0})})),a.length>0?(i.push({pageId:r,label:s.label,isFolder:!0,hasSubPage:!0}),i.push(...a)):i.push({pageId:r,label:s.label})}else i.push({pageId:r,label:s.label});else if(s.type===e.PageType.Folder){const a=[];(null===(n=o[r])||void 0===n?void 0:n.length)>0&&o[r].forEach((o=>{const n=t[o];n.type===e.PageType.Normal&&a.push({pageId:o,label:n.label,isInFolder:!0})})),a.length>0&&(i.push({pageId:r,label:s.label,isFolder:!0}),i.push(...a))}}))}return(0,e.jsx)(e.React.Fragment,null,i.map((o=>(0,e.jsx)(n,Object.assign({key:o.pageId,onSelect:r,isActive:o.pageId===t.currentPageId},o)))))}function p(e){(0,a.changeCurrentDialog)(e)}function c(o){const a=e.ReactRedux.useSelector((e=>{var t,o;return null===(o=null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appConfig)||void 0===o?void 0:o.dialogs}));if(!a||0===Object.keys(a).length)return null;const n=[],r=[];return Object.keys(a).forEach((t=>{var o,i;const s=a[t];s.mode===e.DialogMode.Fixed?n.push({id:t,label:s.label,index:null!==(o=s.index)&&void 0!==o?o:0}):s.mode===e.DialogMode.Anchored&&r.push({id:t,label:s.label,index:null!==(i=s.index)&&void 0!==i?i:0})})),n.sort(((e,t)=>e.index-t.index)),r.sort(((e,t)=>e.index-t.index)),(0,e.jsx)(e.React.Fragment,null,(0,e.jsx)(t.DropdownItem,{header:!0,className:"page-header"},o.formatMessage("dialog")),(0,e.jsx)(t.DropdownItem,{className:"folder",header:!0},o.formatMessage("fixedWindows")),n.map((a=>(0,e.jsx)(t.DropdownItem,{key:a.id,className:(0,e.classNames)("page-item in-folder",{active:o.currentDialogId===a.id}),active:o.currentDialogId===a.id,onClick:()=>{p(a.id)}},(0,e.jsx)("div",{className:"text-truncate w-100",title:a.label},a.label)))),(0,e.jsx)(t.DropdownItem,{className:"folder",header:!0},o.formatMessage("anchoredWindows")),r.map((a=>(0,e.jsx)(t.DropdownItem,{key:a.id,className:(0,e.classNames)("page-item in-folder",{active:o.currentDialogId===a.id}),active:o.currentDialogId===a.id,onClick:()=>{p(a.id)}},(0,e.jsx)("div",{className:"text-truncate w-100",title:a.label},a.label)))))}var d=s(8992),u=s.n(d);const g=t=>{const o=window.SVG,{className:a}=t,n=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(o[a[n]]=e[a[n]])}return o}(t,["className"]),r=(0,e.classNames)("jimu-icon jimu-icon-component",a);return o?e.React.createElement(o,Object.assign({className:r,src:u()},n)):e.React.createElement("svg",Object.assign({className:r},n))};var m=s(4750),h=s.n(m);const v=t=>{const o=window.SVG,{className:a}=t,n=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(o[a[n]]=e[a[n]])}return o}(t,["className"]),r=(0,e.classNames)("jimu-icon jimu-icon-component",a);return o?e.React.createElement(o,Object.assign({className:r,src:h()},n)):e.React.createElement("svg",Object.assign({className:r},n))};var f=s(3626),y=s.n(f);const x=t=>{const o=window.SVG,{className:a}=t,n=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(o[a[n]]=e[a[n]])}return o}(t,["className"]),r=(0,e.classNames)("jimu-icon jimu-icon-component",a);return o?e.React.createElement(o,Object.assign({className:r,src:y()},n)):e.React.createElement("svg",Object.assign({className:r},n))};var b=s(9203),w=s.n(b);const j=t=>{const o=window.SVG,{className:a}=t,n=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(o[a[n]]=e[a[n]])}return o}(t,["className"]),r=(0,e.classNames)("jimu-icon jimu-icon-component",a);return o?e.React.createElement(o,Object.assign({className:r,src:w()},n)):e.React.createElement("svg",Object.assign({className:r},n))};var S=s(8866),I=s.n(S);const P=t=>{const o=window.SVG,{className:a}=t,n=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(o[a[n]]=e[a[n]])}return o}(t,["className"]),r=(0,e.classNames)("jimu-icon jimu-icon-component",a);return o?e.React.createElement(o,Object.assign({className:r,src:I()},n)):e.React.createElement("svg",Object.assign({className:r},n))},k={fixedLayoutTip:"Auto-calculate element tab orders in fixed layouts",fixedLayoutDesc:"For widgets in full-screen pages or fixed layouts (e.g., Fixed Panel, Card, List, etc.), turning on this option will automatically calculate their tab orders based on positions so that they sync up with the visual order for a better experience when it comes to accessibility support. This option will affect the overlay of widgets, so you may want to move certain elements forward or backward for desired results."};function O(a){const{open:n,reference:r,onToggle:i}=a,s=e.hooks.useTranslation(k),l=e.ReactRedux.useSelector((e=>{var t,o;return null===(o=null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appConfig)||void 0===o?void 0:o.useAutoSortInFixedLayout})),p=e.React.useCallback((e=>{(0,o.getAppConfigAction)().setUseAutoSortInFixedLayout(e.target.checked).exec()}),[]);return(0,e.jsx)(t.Popper,{open:n,reference:r,placement:"top-end",offset:[0,10],toggle:i,css:e.css`
        width: 300px;
        padding: 16px;
        background-color: var(--light-400);
        color: var(--dark-800);
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        border: 1px solid var(--light-600);;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        border-radius: 3px;
      `},(0,e.jsx)("div",{className:"builder-setting-content d-flex align-items-center"},(0,e.jsx)("div",{className:"flex-grow-1"},s("fixedLayoutTip")),(0,e.jsx)("div",{className:"d-flex align-items-center ml-auto"},(0,e.jsx)(t.Tooltip,{title:s("fixedLayoutDesc")},(0,e.jsx)(t.Button,{icon:!0,type:"tertiary"},(0,e.jsx)(P,null))),(0,e.jsx)(t.Switch,{checked:l,onChange:p}))))}var N=s(7282),T=s(3273),C=s.n(T);const R=t=>{const o=window.SVG,{className:a}=t,n=function(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(o[a[n]]=e[a[n]])}return o}(t,["className"]),r=(0,e.classNames)("jimu-icon jimu-icon-component",a);return o?e.React.createElement(o,Object.assign({className:r,src:C()},n)):e.React.createElement("svg",Object.assign({className:r},n))};function M(a){const{layoutId:n,layoutItemId:r}=a,i=e.hooks.useTranslation(t.defaultMessages),s=e.ReactRedux.useSelector((t=>function(t,o,a,n){const r=t.layouts[o].content[a];switch(r.type){case e.LayoutItemType.Widget:{const e=r.widgetId;return e?t.widgets[e].label:n("placeholder")}case e.LayoutItemType.Section:const o=r.sectionId;return t.sections[o].label;case e.LayoutItemType.ScreenGroup:const a=r.screenGroupId;return t.screenGroups[a].label}const i=t.layouts[o];if(i.type===e.LayoutType.GridLayout){const o=r,s=i.content[r.parent];return(null==s?void 0:s.gridType)!==e.GridItemType.Tab||o.gridType!==e.GridItemType.Column&&o.gridType!==e.GridItemType.Row?o.gridType===e.GridItemType.Column?n("gridCol"):o.gridType===e.GridItemType.Row?n("gridRow"):n("tab"):(0,N.getLabelOfGridTab)(t,{layoutId:i.id,layoutItemId:a},n)}return n("none")}(t.appStateInBuilder.appConfig,n,r,i)),e.ReactRedux.shallowEqual),l=e.React.useCallback((()=>{o.builderAppSync.publishChangeSelectionToApp({layoutId:n,layoutItemId:r})}),[n,r]);return(0,e.jsx)(t.Button,{type:"tertiary",className:"h-100 bread-node text-truncate",onClick:l},(0,e.jsx)("span",{className:"sep"},(0,e.jsx)(R,{size:"s",autoFlip:!0})),(0,e.jsx)("span",{className:"bread-label"},s))}function z(){const t=e.ReactRedux.useSelector((e=>{var t,o;return null===(o=null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appRuntimeInfo)||void 0===o?void 0:o.selection}),e.ReactRedux.shallowEqual),a=e.ReactRedux.useSelector((o=>{var a;if(t){const{layoutId:n}=t,r=null===(a=o.appStateInBuilder)||void 0===a?void 0:a.appConfig.layouts[n];return r.type===e.LayoutType.GridLayout?r:null}return null}),e.ReactRedux.shallowEqual),n=e.ReactRedux.useSelector((e=>{var t;return null===(t=e.appStateInBuilder)||void 0===t?void 0:t.browserSizeMode})),r=e.React.useCallback(((t,o)=>{var a,i,s;if(!o.parent)return null;const{type:l,id:p}=o.parent,{mainSizeMode:c}=t;switch(l){case e.LayoutParentType.View:{const e=t.views[p],o=t.sections[e.parent],i=null!==(a=o.parent[n])&&void 0!==a?a:o.parent[c];if(1===i.length)return i[0];const s=i[0].layoutId,l=t.layouts[s];return r(t,l)}case e.LayoutParentType.Screen:{const e=t.screens[p],o=t.screenGroups[e.parent];return null!==(i=o.parent[n])&&void 0!==i?i:o.parent[c]}case e.LayoutParentType.Widget:{const e=t.widgets[p],o=null!==(s=e.parent[n])&&void 0!==s?s:e.parent[c];if(1===o.length)return o[0];const a=o[0].layoutId,i=t.layouts[a];return r(t,i)}default:return null}}),[n]),i=e.React.useCallback(((t,o)=>{const a=[];let n=t.content[o].parent;for(;null!=n;){const o=t.content[n];o.gridType===e.GridItemType.Row||(o.gridType,e.GridItemType.Column),a.push({layoutId:t.id,layoutItemId:n}),n=o.parent}return a}),[]),s=e.React.useCallback(((t,a)=>{const{layoutId:n,layoutItemId:s}=t,l=(0,o.getAppConfigAction)().appConfig,p=[];let c=l.layouts[n];if(p.push(t),c.type===e.LayoutType.GridLayout){const e=i(c,s);e.length>0&&p.push(...e)}let d=r(l,c);for(;null!=d;){if(c=l.layouts[d.layoutId],p.push(d),c.type===e.LayoutType.GridLayout){const e=i(c,d.layoutItemId);e.length>0&&p.push(...e)}d=r(l,c)}return p.reverse().map(((t,o)=>(0,e.jsx)(M,{key:o,layoutId:t.layoutId,layoutItemId:t.layoutItemId})))}),[r,i]),l=e.css`
    margin-left: 32px;
    max-width: calc(100% - 550px);

    .nav {
      display: flex;
      white-space: nowrap;
      overflow: hidden;
    }

    .bread-node {
      flex: 0 auto;
      flex-shrink: 1000;
      display: inline-block;
      line-height: 16px;

      &:hover {
        flex: 1 0 auto;
        .sep svg {
          transform: translatex(4px);
          transition: transform ease-in-out .3s;
        }
      }

      &:first-of-type {
        flex: 0 0 auto;
        flex-shrink: 0.5;
        .sep {
          display: none;
        }
      }

      &:last-of-type {
        flex: 1 0 auto !important;
        &:hover {
          flex: 1 0 auto !important;
        }
      }

      .bread-label {
        font-size: 13px;
        flex: 0 1 auto;
      }

      .sep {
        padding-left: 4px;
        padding-right: 4px;
      }
    }
  `;return null==(null==t?void 0:t.layoutId)||null==t.layoutItemId?null:(0,e.jsx)("div",{className:"breadcrumb d-flex",css:l},(0,e.jsx)("nav",{className:"nav"},(0,e.jsx)(e.ErrorBoundary,null,s(t,a))))}const B="right-sidebar",L=.5;class D extends e.React.PureComponent{constructor(a){super(a),this.formatMessage=(e,t)=>this.props.intl.formatMessage({id:e},t),this.onPreviewScaleChange=e=>{e.stopPropagation();const t=this.fromRangeToZoomScale(Number(e.currentTarget.value));this.updateScale(t)},this.zoomout=e=>{e.stopPropagation();const{zoomScale:t}=this.props,o=Math.round(100*t),a=10*Math.floor(o/10);let n;n=o===a?t-.1:a/100,n=Math.round(10*n)/10,n=Math.max(L,n),this.updateScale(n)},this.zoomin=e=>{e.stopPropagation();const{zoomScale:t}=this.props,o=Math.round(100*t),a=10*Math.ceil(o/10);let n;n=o===a?t+.1:a/100,n=Math.round(10*n)/10,n=Math.min(2,n),this.updateScale(n)},this.zoomToFit=e=>{e.stopPropagation();const{viewportSize:t}=this.props;let o=this.calAvailableWidth()/t.width;o=Math.floor(100*o)/100,o=Math.max(.5,Math.min(2,o)),this.updateScale(o)},this.zoomToNormal=e=>{e.stopPropagation(),this.updateScale(1)},this.stopPropgation=e=>{e.stopPropagation()},this.toggleSettingPanel=()=>{(0,e.getAppStore)().dispatch(e.appActions.widgetStatePropChange(B,"collapse",!this.props.settingPanelVisible))},this.toggleTabConfigPopper=()=>{this.setState({isTabConfigPopperOpen:!this.state.isTabConfigPopperOpen})},this.onDropDownToggle=e=>{const{isPageListOpen:t}=this.state;this.setState({isPageListOpen:!t}),e.stopPropagation()},this.handlePageListItemClick=(e,t)=>{e.stopPropagation();const{currentPageId:a}=this.props;t!==a&&(o.builderAppSync.publishChangeSelectionToApp(null),o.builderAppSync.publishPageChangeToApp(t))},this.getDropdownStyle=()=>e.css`
      padding: unset;
      max-width: 240px;

      .page-header {
        height: 2rem;
        background-color: var(--light-700);
        color: var(--dark-800) !important;
        font-size: 14px;
        line-height: 2rem;
        display: flex !important;
        align-items: center;
      }

      .page-item {
        font-size: 13px;
        color: var(--black) !important;
        padding: 0 24px !important;
        height: 2rem;

        &:not(.active):hover {
          background: var(--light-600) !important;
        }

        &.active {
          background: var(--primary);
        }
      }

      .folder {
        font-size: 13px;
        color: var(--dark-500) !important;
        padding: 0 !important;
        margin: 0 24px;
        height: 2rem;
        line-height: 2rem;
      }

      .page-header,
      .folder {
        &:focus {
          outline: none;
        }
      }

      .in-folder {
        padding-left: 2.25rem !important;
      }
    `,this.renderPageList=()=>{var o;const{isPageListOpen:a}=this.state,{pages:n,currentPageId:r,currentDialogId:s,currentDialogLabel:l}=this.props,p=s?l:null===(o=null==n?void 0:n[r])||void 0===o?void 0:o.label;return(0,e.jsx)("div",{className:"d-flex page-list align-items-center ml-4"},(0,e.jsx)("div",{className:"page-label"},s?this.formatMessage("dialog"):this.formatMessage("page"),":"),(0,e.jsx)(t.Dropdown,{direction:"up",size:"sm",toggle:this.onDropDownToggle,isOpen:a,menuItemCheckMode:"singleCheck"},(0,e.jsx)(t.DropdownButton,{className:"text-truncate",title:p,css:e.css`max-width: 240px; font-size: 12px`,size:"sm",type:"tertiary"},p),(0,e.jsx)(t.DropdownMenu,{css:this.getDropdownStyle()},(0,e.jsx)(t.DropdownItem,{header:!0,className:"page-header"},this.formatMessage("page")),(0,e.jsx)(i,{currentPageId:s?null:r}),(0,e.jsx)(c,{currentDialogId:s,formatMessage:this.formatMessage}))))},this.state={isPageListOpen:!1,isTabConfigPopperOpen:!1}}calAvailableWidth(){const e=document.querySelector('div[data-widgetid="app-loader"]').getBoundingClientRect();let o=parseFloat(t.styleUtils.remToPixel("3rem"));return isNaN(o)&&(o=48),e.width-o-10}updateScale(e){o.builderAppSync.publichChangeZoomScaleToApp(e)}percentageZoomScale(){const{zoomScale:t}=this.props;return e.utils.formatPercentageNumber(`${Math.round(100*t)}%`)}mapStep(){return.1}fromZoomScaleToRange(e){return e<1?50*(e-L)/.5+0:e>1?50*(e-1)/1+50:50}fromRangeToZoomScale(e){return e<50?.5*(e-0)/50+L:e>50?1*(e-50)/50+1:1}calBackground(){const t=100*(this.fromZoomScaleToRange(this.props.zoomScale)-0)/100+"%",o=`linear-gradient(to right, var(--dark-600) 0%, var(--dark-600) ${t}, var(--light-800) ${t}, var(--light-600))`;return e.css`
      &::-webkit-slider-runnable-track {
        background: ${o} !important;
      }
      &::-moz-range-track {
        background: ${o} !important;
      }
      &::-ms-track {
        background: ${o} !important;
      }
    `}render(){const{zoomScale:o,settingPanelVisible:a,useAutoSortInFixedLayout:n,activePagePart:r}=this.props;return(0,e.jsx)("div",{css:(i=this.props.theme,e.css`
    overflow: hidden;
    height: 100%;
    background-color: var(--secondary);
    border-top: 1px solid var(--light-800);

    .zoom-section {
      .percentage-label {
        width: 4rem;
        color: var(--dark-800);
      }
      .form-control-range {
        margin: 0 8px 1px;
      }
    }

    .a11y-btn {
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      &.active {
        background-color: var(--primary) !important;
      }
    }

    .btn {
      padding: 0 0 2px;

      .jimu-icon {
        margin-right: 0;
        margin-left: 0;
      }
    }

    .setting-panel-visible {
      background-color: var(--light-700);
      .btn {
        color: var(--black);
      }
    }

    .jimu-dropdown .jimu-icon {
      transform: rotate(180deg);
    }

    .page-list {
      .page-label {
        color: var(--dark-800);
        font-size: 12px;
        margin-right: 8px;
      }
      .icon-btn {
        color: var(--dark-800);
        &:hover {
          color: var(--black);
        }
        .jimu-icon {
          margin-left: 6px;
        }
      }
    }

    input[type='range'] {
      -webkit-appearance: none;
      background: transparent;
    }
    input[type='range']:focus {
      outline: none;
    }
    input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: var(--light-800);
      border-radius: 2px;
    }
    input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 12px;
      width: 12px;
      border-radius: 6px;
      cursor: pointer;
      background: var(--light-300);
      border: 2px solid var(--dark-600);
      margin-top: -5px;

      &:hover {
        border-color: var(--black);
      }
    }
    input[type='range']:focus::-webkit-slider-runnable-track {
      background: var(--light-800);
    }
    input[type='range']::-moz-range-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: var(--light-800);
      border-radius: 2px;
    }
    input[type='range']::-moz-range-thumb {
      height: 10px;
      width: 10px;
      border-radius: 8px;
      cursor: pointer;
      background: var(--light-300);
      border: 2px solid var(--dark-600);
      margin-top: -5px;
      &:hover {
        border-color: var(--black);
      }
    }
    input[type='range']::-ms-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      background: ${null===(l=null===(s=null==i?void 0:i.colors)||void 0===s?void 0:s.palette)||void 0===l?void 0:l.light[800]};
      border-radius: 2px;
    }
    input[type='range']::-ms-thumb {
      height: 10px;
      width: 10px;
      border-radius: 8px;
      cursor: pointer;
      background: ${null===(c=null===(p=null==i?void 0:i.colors)||void 0===p?void 0:p.palette)||void 0===c?void 0:c.light[300]};
      border: 2px solid ${null===(u=null===(d=null==i?void 0:i.colors)||void 0===d?void 0:d.palette)||void 0===u?void 0:u.dark[600]};
      margin-top: 0px;
      &:hover {
        border-color: ${null===(m=null==i?void 0:i.colors)||void 0===m?void 0:m.black};
      }
    }
  `),className:"jimu-widget widget-status-bar d-flex"},r===e.PagePart.Body&&this.renderPageList(),(0,e.jsx)(z,null),(0,e.jsx)("div",{className:"zoom-section flex-grow-1 d-flex justify-content-end align-items-center"},(0,e.jsx)(t.Button,{type:"tertiary",onClick:this.toggleTabConfigPopper,className:(0,e.classNames)("a11y-btn mr-2 px-1",{active:n}),ref:e=>{this.a11yBtn=e}},"A11Y"),(0,e.jsx)(O,{open:this.state.isTabConfigPopperOpen,reference:this.a11yBtn,onToggle:this.toggleTabConfigPopper}),(0,e.jsx)(t.Button,{type:"tertiary",disabled:o<=L,title:this.formatMessage("zoomOut"),onClick:this.zoomout},(0,e.jsx)(g,{size:"s"})),(0,e.jsx)("input",{css:this.calBackground(),type:"range",className:"form-control-range",min:0,max:100,step:this.mapStep(),value:this.fromZoomScaleToRange(o),onClick:this.stopPropgation,onChange:this.onPreviewScaleChange}),(0,e.jsx)(t.Button,{type:"tertiary",disabled:o>=2,title:this.formatMessage("zoomIn"),onClick:this.zoomin},(0,e.jsx)(v,{size:"s"})),(0,e.jsx)(t.Dropdown,{direction:"up",size:"sm",className:"ml-2"},(0,e.jsx)(t.DropdownButton,{icon:!0,size:"sm",type:"tertiary"},this.percentageZoomScale()),(0,e.jsx)(t.DropdownMenu,{css:e.css`min-width: 5rem;`},[200,175,150,125,100,75,50].map((o=>(0,e.jsx)(t.DropdownItem,{className:"justify-content-center",key:o,onClick:()=>{this.updateScale(o/100)}},e.utils.formatPercentageNumber(`${o}%`)))))),(0,e.jsx)(t.Button,{type:"tertiary",className:"ml-2",onClick:this.zoomToNormal,title:this.formatMessage("zoomToNormal")},(0,e.jsx)(j,{size:"s",className:"m-0"})),(0,e.jsx)(t.Button,{type:"tertiary",className:"ml-2",onClick:this.zoomToFit,title:this.formatMessage("zoomToFit")},(0,e.jsx)(x,{size:"s",className:"m-0"}))),(0,e.jsx)("div",{className:(0,e.classNames)("setting-panel-section d-flex justify-content-center align-items-center ml-5 mr-2",{"setting-panel-visible":a})},(0,e.jsx)(t.Button,{type:"tertiary",title:a?this.formatMessage("closeSettingPanel"):this.formatMessage("openSettingPanel"),className:"px-2",onClick:this.toggleSettingPanel},(0,e.jsx)(t.Icon,{icon:"./widgets/status-bar/dist/runtime/assets/setting-panel.svg",width:12,height:12,className:"m-0",autoFlip:!0}))));var i,s,l,p,c,d,u,m}}D.mapExtraStateProps=(t,o)=>{var a,n,r,i,s,l,p,c,d,u,g,m,h,v,f,y,x,b,w,j,S,I,P;const k=null!==(r=null===(n=null===(a=t.appStateInBuilder)||void 0===a?void 0:a.appRuntimeInfo)||void 0===n?void 0:n.zoomScale)&&void 0!==r?r:1,O=null!==(s=null===(i=t.appStateInBuilder)||void 0===i?void 0:i.browserSizeMode)&&void 0!==s?s:e.BrowserSizeMode.Large,N=e.utils.findViewportSize(null===(l=t.appStateInBuilder)||void 0===l?void 0:l.appConfig,O),T=null===(c=null===(p=null==t?void 0:t.appStateInBuilder)||void 0===p?void 0:p.appConfig)||void 0===c?void 0:c.pages,C=null===(u=null===(d=null==t?void 0:t.appStateInBuilder)||void 0===d?void 0:d.appConfig)||void 0===u?void 0:u.useAutoSortInFixedLayout,R=null===(m=null===(g=null==t?void 0:t.appStateInBuilder)||void 0===g?void 0:g.appConfig)||void 0===m?void 0:m.pageStructure,M=null===(v=null===(h=null==t?void 0:t.appStateInBuilder)||void 0===h?void 0:h.appRuntimeInfo)||void 0===v?void 0:v.currentPageId,z=null===(y=null===(f=null==t?void 0:t.appStateInBuilder)||void 0===f?void 0:f.appRuntimeInfo)||void 0===y?void 0:y.currentDialogId,L=z?null===(x=null==t?void 0:t.appStateInBuilder)||void 0===x?void 0:x.appConfig.dialogs[z].label:null,D=null!==(w=null===(b=null==t?void 0:t.appStateInBuilder)||void 0===b?void 0:b.appRuntimeInfo.activePagePart)&&void 0!==w?w:e.PagePart.Body;return{zoomScale:k,viewportSize:N,settingPanelVisible:null===(I=null===(S=null===(j=t.widgetsState)||void 0===j?void 0:j[B])||void 0===S?void 0:S.collapse)||void 0===I||I,pages:T,pageStructure:R,currentPageId:M,currentDialogId:z,currentDialogLabel:L,activePagePart:D,useAutoSortInFixedLayout:C,locale:null===(P=null==t?void 0:t.appContext)||void 0===P?void 0:P.locale}};const A=D;function E(e){s.p=e}})(),l})())}}}));