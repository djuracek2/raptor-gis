System.register(["jimu-core","jimu-ui","jimu-ui/advanced/setting-components","jimu-core/react","jimu-ui/basic/list-tree","jimu-arcgis"],(function(e,t){var a={},s={},o={},n={},i={},r={};return{setters:[function(e){a.React=e.React,a.classNames=e.classNames,a.css=e.css,a.defaultMessages=e.defaultMessages,a.getAppStore=e.getAppStore,a.hooks=e.hooks,a.jsx=e.jsx,a.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){s.AdvancedSelect=e.AdvancedSelect,s.Button=e.Button,s.Card=e.Card,s.Label=e.Label,s.Loading=e.Loading,s.LoadingType=e.LoadingType,s.Radio=e.Radio,s.TextInput=e.TextInput,s.defaultMessages=e.defaultMessages},function(e){o.MapWidgetSelector=e.MapWidgetSelector,o.SettingRow=e.SettingRow,o.SettingSection=e.SettingSection,o.SidePopper=e.SidePopper},function(e){n.Fragment=e.Fragment},function(e){i.List=e.List,i.TreeItemActionType=e.TreeItemActionType},function(e){r.basemapUtils=e.basemapUtils}],execute:function(){e((()=>{var e={748:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5c0 .527-.074 1.036-.212 1.518l.912.438a6.5 6.5 0 1 0-6.586 4.533l-.077-1.008A5.5 5.5 0 1 1 12 6.5m-9 0a3.501 3.501 0 0 0 2.88 3.445L5.8 8.901a2.501 2.501 0 1 1 3.194-2.224l.949.456A3.5 3.5 0 1 0 3 6.5M15.5 11l-5 1-3 4-1-9.5zm-5.57.094-1.702 2.269-.542-5.152 4.76 2.38z" clip-rule="evenodd"></path></svg>'},73982:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M7.5 1.5a.5.5 0 0 1 1 0v2.8a.5.5 0 0 1-1 0zm6.028.874a.5.5 0 0 1 .062.705l-1.414 1.685a.5.5 0 1 1-.766-.643l1.414-1.685a.5.5 0 0 1 .704-.062m-10.352.062a.5.5 0 1 0-.766.643l1.414 1.685a.5.5 0 0 0 .766-.643zM6.244 10.6zH5.43zM.961 9.8h4.88c.211 0 .359.19.359.4a1.8 1.8 0 0 0 3.555.4h.814a2.6 2.6 0 0 1-5.139 0H.8v3.6h14.4v-3.6H9.755c.03-.129.045-.263.045-.4 0-.21.148-.4.358-.4h4.881l-2.267-3.4H3.228zm11.81-4.2a.8.8 0 0 1 .666.356l2.429 3.642a.8.8 0 0 1 .134.444V14.2a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1-.8-.8v-4.158a.8.8 0 0 1 .134-.444l2.429-3.642a.8.8 0 0 1 .665-.356z" clip-rule="evenodd"></path></svg>'},55339:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m8.745 8 6.1 6.1a.527.527 0 1 1-.745.746L8 8.746l-6.1 6.1a.527.527 0 1 1-.746-.746l6.1-6.1-6.1-6.1a.527.527 0 0 1 .746-.746l6.1 6.1 6.1-6.1a.527.527 0 0 1 .746.746z"></path></svg>'},30224:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707z" clip-rule="evenodd"></path></svg>'},26826:e=>{"use strict";e.exports=r},48891:e=>{"use strict";e.exports=a},51315:e=>{"use strict";e.exports=n},30726:e=>{"use strict";e.exports=s},77756:e=>{"use strict";e.exports=o},59587:e=>{"use strict";e.exports=i}},t={};function l(a){var s=t[a];if(void 0!==s)return s.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,l),o.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var c={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(c),l.d(c,{__set_webpack_public_path__:()=>P,default:()=>B});var e,t=l(48891),a=l(30726),s=l(77756);!function(e){e.Organization="ORGANIZATION",e.Custom="CUSTOM"}(e||(e={}));const o={baseMapSettings:"Basemap settings",groupBasemaps:"Synchronize with the basemap gallery settings of your organization",customBasemaps:"Configure custom basemaps",importBasemaps:"Import",importTips:'Click the "Import" button to add basemaps for the Map widget.',sideTitle:"Import basemaps",chooseWebmaps:"Select a group where web maps can be used as basemaps."};var n=l(51315),i=l(748),r=l.n(i);const m=e=>{const a=window.SVG,{className:s}=e,o=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(e);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(e,s[o])&&(a[s[o]]=e[s[o]])}return a}(e,["className"]),n=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:n,src:r()},o)):t.React.createElement("svg",Object.assign({className:n},o))},d=t.css`
  flex-direction: column;
  font-size: 0.875rem;
  text-align: center;
  color: var(--dark-500);
  span {
    padding: 0 1rem;
  }
`,p=e=>{const{text:a,icon:s,style:o}=e;return(0,t.jsx)("div",{css:d,style:o,className:"d-flex align-items-center justify-content-center"},s||(0,t.jsx)(m,{size:48,color:"var(--dark-200)"}),(0,t.jsx)("span",{className:"mt-4"},a))};var u=l(55339),g=l.n(u);const f=e=>{const a=window.SVG,{className:s}=e,o=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(e);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(e,s[o])&&(a[s[o]]=e[s[o]])}return a}(e,["className"]),n=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:n,src:g()},o)):t.React.createElement("svg",Object.assign({className:n},o))};var v=l(59587);const b=t.css`
  .jimu-tree-item__body {
    padding: 0.5rem 0.5rem 0.5rem 0;
    cursor: move;
    .jimu-tree-item__icon {
      padding: 0 !important;
      img {
        width: 5rem;
        height: 3.75rem;
      }
    }
    .jimu-tree-item__title {
      margin: 0 0.5rem 0 0.25rem;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 0.8125rem;
      line-height: 1.0625rem;
      font-weight: 400;
    }
    .del-btn {
      opacity: 0;
      &:focus, &:active {
        opacity: 1;
      }
    }
    &:hover, &:focus, &:active {
      .del-btn {
        opacity: 1;
      }
    }
  }
`,y=e=>{const{customBasemaps:s,token:o,onChange:n}=e,i=t.hooks.useTranslation(t.defaultMessages),r=e=>{n(s.asMutable().filter((t=>t.id!==e)))};return(0,t.jsx)(v.List,{size:"default",className:"px-4",css:b,itemsJson:s.asMutable().map(((e,t)=>({itemStateDetailContent:e,itemKey:e.id,itemStateIcon:{icon:`${e.thumbnailUrl}?token=${o}`},itemStateTitle:e.title}))),dndEnabled:!0,onDidDrop:(e,t)=>{const{itemJsons:a}=t.props,[,o]=a,i=o.map((e=>e.itemStateDetailContent));i.map((e=>e.id)).join(",")!==s.map((e=>e.id)).join(",")&&n(i)},overrideItemBlockInfo:({itemBlockInfo:e})=>({name:v.TreeItemActionType.RenderOverrideItem,children:[{name:v.TreeItemActionType.RenderOverrideItemDroppableContainer,children:[{name:v.TreeItemActionType.RenderOverrideItemDraggableContainer,children:[{name:v.TreeItemActionType.RenderOverrideItemBody,children:[{name:v.TreeItemActionType.RenderOverrideItemDragHandle},{name:v.TreeItemActionType.RenderOverrideItemIcon},{name:v.TreeItemActionType.RenderOverrideItemTitle},{name:v.TreeItemActionType.RenderOverrideItemCommands}]}]}]}]}),renderOverrideItemCommands:(e,s)=>{const{itemJsons:o}=s.props,n=o[0].itemKey;return(0,t.jsx)(a.Button,{size:"sm",type:"tertiary",icon:!0,className:"del-btn p-0 border-0",title:i("delete"),"aria-label":i("delete"),onClick:e=>{e.stopPropagation(),r(n)},onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.stopPropagation(),r(n))}},(0,t.jsx)(f,null))}})};var h=l(26826),x=l(30224),j=l.n(x);const w=e=>{const a=window.SVG,{className:s}=e,o=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(e);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(e,s[o])&&(a[s[o]]=e[s[o]])}return a}(e,["className"]),n=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:n,src:j()},o)):t.React.createElement("svg",Object.assign({className:n},o))};var S=l(73982),O=l.n(S);const I=e=>{const a=window.SVG,{className:s}=e,o=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(s=Object.getOwnPropertySymbols(e);o<s.length;o++)t.indexOf(s[o])<0&&Object.prototype.propertyIsEnumerable.call(e,s[o])&&(a[s[o]]=e[s[o]])}return a}(e,["className"]),n=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:n,src:O()},o)):t.React.createElement("svg",Object.assign({className:n},o))};var N=function(e,t,a,s){return new(a||(a=Promise))((function(o,n){function i(e){try{l(s.next(e))}catch(e){n(e)}}function r(e){try{l(s.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,r)}l((s=s.apply(e,t||[])).next())}))};const R=t.css`
  display: flex;
  flex-direction: column;
  .search-row {
    margin-top: 0.75rem !important;
  }
  .card-list-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.625rem;
    padding: 0 0 1rem;
    li {
      width: calc(50% - 0.75rem);
      margin: 0 0.375rem 0.625rem 0.375rem;
      list-style: none;
    }
    .card {
      border: 0;
      background-color: var(--light-500);
      &.card-active, &:hover {
        box-shadow: none;
        border: 0;
        outline: 0.125rem solid var(--primary-600);
      }
      .card-checkmark {
        line-height: 0;
        background-color: var(--primary-600);
        border-radius: 0 0 0 0.125rem;
      }
      img {
        width:100%;
        height: 5.0625rem;
        background-color: var(--light-600);
      }
      .content {
        box-sizing: content-box;
        height: 2.0625rem;
        margin: 0.25rem 0.25rem 0.5rem;
        overflow: hidden;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 400;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: var(--dark-800);
      }
    }
  }
`,T=e=>{var n;const{portalUrl:i,portalSelf:r,token:l,config:c,onCustomBasemapsChange:m}=e,{customBasemaps:d}=c,u=t.hooks.useTranslation(o,t.defaultMessages,a.defaultMessages),g=t.React.useRef(),[f,v]=t.React.useState();t.React.useEffect((()=>{(0,t.loadArcGISJSAPIModules)(["esri/portal/Portal","esri/request"]).then((e=>{const[t,a]=e;g.current=a;const s=new t({url:i,sourceJSON:r});s.load().then((()=>{v(s),M(s)}))}))}),[]);const[b,y]=t.React.useState([]),x=t.React.useMemo((()=>b.length?b:[{id:"",title:u("esriDefault")}]),[b,u]),[j,S]=t.React.useState(""),[O,T]=t.React.useState(!0),M=e=>N(void 0,void 0,void 0,(function*(){var a,s,o;const n=yield h.basemapUtils.getBasemapGroup(e,r,!0),i=yield h.basemapUtils.getBasemapGroup(e,r,!1),l={id:null==n?void 0:n.id,title:u("esriDefault")},c={id:null==i?void 0:i.id,title:u("organizationDefault")},m=null===(s=null===(a=(0,t.getAppStore)())||void 0===a?void 0:a.getState())||void 0===s?void 0:s.user,d=(null===(o=null==m?void 0:m.groups)||void 0===o?void 0:o.asMutable().map((e=>({id:e.id,title:e.title}))))||[];y([l,c,...d]),S((null==n?void 0:n.id)||"")})),[k,C]=t.React.useState([]),[B,P]=t.React.useState(""),z=t.React.useMemo((()=>B?k.filter((e=>e.title.toUpperCase().includes(B.toUpperCase()))):k),[k,B]);t.React.useEffect((()=>{var e;j&&(P(""),T(!0),C([]),(e=j,N(void 0,void 0,void 0,(function*(){const t=yield h.basemapUtils.getBasemapItemsByGroupId(f,i,e);C(t)}))).then((()=>{T(!1)})))}),[j]);const A=(e,t)=>{const a=d.asMutable({deep:!0})||[];m(t?[...a,e]:a.filter((t=>t.id!==e.id)))};return(0,t.jsx)("div",{className:"h-100",css:R},(0,t.jsx)(s.SettingSection,{className:"pt-0 border-0",title:u("chooseWebmaps")},(0,t.jsx)(s.SettingRow,null,(0,t.jsx)(a.AdvancedSelect,{size:"sm","aria-label":u("chooseWebmaps"),buttonProps:{disabled:!b.length},isMultiple:!1,isEmptyOptionHidden:!0,selectedValues:[{label:null===(n=x.find((e=>e.id===j)))||void 0===n?void 0:n.title,value:j}],staticValues:x.map((e=>({label:e.title,value:e.id}))),onChange:e=>{var t;S((null===(t=null==e?void 0:e[0])||void 0===t?void 0:t.value)||"")}})),(0,t.jsx)(s.SettingRow,{className:"search-row"},(0,t.jsx)(a.TextInput,{size:"sm",className:"py-0 w-100",prefix:(0,t.jsx)(w,{size:"m",color:"var(--dark)"}),placeholder:u("search"),"aria-label":u("search"),value:B,disabled:O,allowClear:!!B,onChange:e=>{P(e.target.value)}}))),O?(0,t.jsx)(a.Loading,{type:a.LoadingType.Secondary}):z.length?(0,t.jsx)("ul",{className:"card-list-container",role:"listbox"},z.map((e=>{const s=!!d.find((t=>t.id===e.id));return(0,t.jsx)("li",{key:e.id},(0,t.jsx)(a.Card,{button:!0,active:s,role:"option","aria-selected":s,tabIndex:0,onClick:()=>{A(e,!s)},onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),A(e,!s))}},(0,t.jsx)("img",{src:`${e.thumbnailUrl}?token=${l}`}),(0,t.jsx)("div",{className:"content",title:e.title},e.title)))}))):(0,t.jsx)(p,{text:u("noItemFoundWarning"),icon:(0,t.jsx)(I,{size:48,color:"var(--dark-200)"}),style:{flex:1}}))},M=e=>{const n=t.hooks.useTranslation(o,t.defaultMessages,a.defaultMessages),i=t.React.useRef(),[r,l]=t.React.useState(!1);return(0,t.jsx)(t.React.Fragment,null,(0,t.jsx)(a.Button,{className:"w-100",type:"primary","aria-description":n("importTips"),ref:i,onClick:()=>{r||l(!0)}},n("importBasemaps")),(0,t.jsx)(s.SidePopper,{position:"right",title:n("sideTitle"),"aria-label":n("sideTitle"),isOpen:r,toggle:()=>{r&&l(!1)},trigger:i.current},(0,t.jsx)(T,Object.assign({},e))))},k=Object.assign({},o,t.defaultMessages,a.defaultMessages),C=t.css`
  display: flex;
  flex-flow: column;
  overflow-y: hidden;
  .custom-list-container {
    position: relative;
    flex: 1;
    overflow: auto;
  }
`,B=o=>{const{id:i,token:r,onSettingChange:l,config:c,useMapWidgetIds:m}=o,{basemapsType:d,customBasemaps:u}=c,g=t.hooks.useTranslation(k),f=(e,t)=>{t!==c[e]&&l({id:i,config:c.set(e,t)})},v=t.React.useMemo((()=>!(null==m?void 0:m.length)),[m]),b=t.React.useMemo((()=>d===e.Custom),[d]);return(0,t.jsx)("div",{className:"jimu-widget-setting jimu-widget-basemap-setting h-100",css:C},(0,t.jsx)(s.SettingSection,{className:(0,t.classNames)({"border-bottom-0":v}),title:g("selectMapWidget")},(0,t.jsx)(s.SettingRow,null,(0,t.jsx)(s.MapWidgetSelector,{onSelect:e=>{l({id:i,useMapWidgetIds:e})},useMapWidgetIds:m}))),v?(0,t.jsx)(p,{text:g("selectMapHint"),style:{height:"calc(100% - 6rem)"}}):(0,t.jsx)(n.Fragment,null,(0,t.jsx)(s.SettingSection,{className:(0,t.classNames)({"border-0":!b||!u.length}),title:g("baseMapSettings"),role:"group","aria-label":g("baseMapSettings")},(0,t.jsx)(s.SettingRow,{flow:"wrap",role:"radiogroup",className:"mb-4"},(0,t.jsx)(a.Label,{className:"d-flex align-items-center"},(0,t.jsx)(a.Radio,{className:"mr-2",name:"basemapsType",checked:d===e.Organization,onChange:()=>{f("basemapsType",e.Organization)}}),g("groupBasemaps")),(0,t.jsx)(a.Label,{className:"d-flex align-items-center"},(0,t.jsx)(a.Radio,{className:"mr-2",name:"basemapsType",checked:d===e.Custom,onChange:()=>{f("basemapsType",e.Custom)}}),g("customBasemaps"))),b&&(0,t.jsx)(M,Object.assign({},o,{onCustomBasemapsChange:e=>{f("customBasemaps",e)}}))),b&&(0,t.jsx)("div",{className:"custom-list-container"},(0,t.jsx)("div",{className:"h-100 py-4"},u.length?(0,t.jsx)(y,{customBasemaps:u,token:r,onChange:e=>{f("customBasemaps",e)}}):(0,t.jsx)(p,{text:g("importTips"),style:{height:"100% "}})))))};function P(e){l.p=e}})(),c})())}}}));