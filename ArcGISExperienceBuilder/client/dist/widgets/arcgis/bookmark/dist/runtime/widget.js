System.register(["jimu-core","jimu-ui","jimu-core/react","jimu-arcgis","jimu-layouts/layout-runtime"],(function(e,t){var i={},a={},o={},s={},r={};return{setters:[function(e){i.AppMode=e.AppMode,i.BaseVersionManager=e.BaseVersionManager,i.BrowserSizeMode=e.BrowserSizeMode,i.Immutable=e.Immutable,i.React=e.React,i.TransitionContainer=e.TransitionContainer,i.appActions=e.appActions,i.classNames=e.classNames,i.css=e.css,i.defaultMessages=e.defaultMessages,i.getAppStore=e.getAppStore,i.indexedDBUtils=e.indexedDBUtils,i.jsx=e.jsx,i.polished=e.polished,i.utils=e.utils},function(e){a.Button=e.Button,a.Card=e.Card,a.CardBody=e.CardBody,a.Dropdown=e.Dropdown,a.DropdownButton=e.DropdownButton,a.DropdownItem=e.DropdownItem,a.DropdownMenu=e.DropdownMenu,a.ImageFillMode=e.ImageFillMode,a.ImageWithParam=e.ImageWithParam,a.NavButtonGroup=e.NavButtonGroup,a.Select=e.Select,a.TextInput=e.TextInput,a.defaultMessages=e.defaultMessages},function(e){o.Fragment=e.Fragment},function(e){s.JimuMapViewComponent=e.JimuMapViewComponent,s.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){r.LayoutEntry=e.LayoutEntry,r.ViewVisibilityContext=e.ViewVisibilityContext}],execute:function(){e((()=>{var e={74138:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M6.25 5.621a.6.6 0 0 1 .933-.5l3.568 2.38a.6.6 0 0 1 0 .998l-3.568 2.38a.6.6 0 0 1-.933-.5z" clip-rule="evenodd"></path></svg>'},25603:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m2.556 4.75.297 9.75c0 .398.164.78.455 1.06.292.282.688.44 1.1.44h7.184c.412 0 .808-.158 1.1-.44.291-.28.455-.662.455-1.06l.297-9.75zm4.333 8.222a.778.778 0 1 1-1.556 0V7.778a.778.778 0 1 1 1.556 0zm3.667 0a.778.778 0 1 1-1.556 0V7.778a.778.778 0 1 1 1.556 0zM12.058 2.5a1 1 0 0 1-.766-.357l-.659-.786A1 1 0 0 0 9.867 1H6.133a1 1 0 0 0-.766.357l-.659.786a1 1 0 0 1-.766.357H2a1 1 0 0 0-1 1V4h14v-.5a1 1 0 0 0-1-1z"></path></svg>'},20864:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M13 6.133c0 .598-.28 1.46-.825 2.51-.53 1.02-1.247 2.102-1.981 3.102A45.718 45.718 0 0 1 8 14.492a48.01 48.01 0 0 1-2.194-2.747c-.734-1-1.451-2.081-1.98-3.102C3.28 7.593 3 6.731 3 6.133 3 3.277 5.26 1 8 1s5 2.277 5 5.133m1 0c0 2.685-3.768 7.311-5.332 9.115C8.258 15.722 8 16 8 16s-.258-.279-.668-.751C5.768 13.444 2 8.817 2 6.133 2 2.746 4.686 0 8 0s6 2.746 6 6.133M10 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m1 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0" clip-rule="evenodd"></path></svg>'},59788:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .538.538 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.538.538 0 0 1 0-.738" clip-rule="evenodd"></path></svg>'},11407:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M11.347 2.146a.485.485 0 0 1 0 .708L5.76 8l5.587 5.146a.486.486 0 0 1 0 .708.538.538 0 0 1-.738 0l-5.956-5.5a.485.485 0 0 1 0-.708l5.956-5.5a.538.538 0 0 1 .738 0" clip-rule="evenodd"></path></svg>'},3273:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M4.653 13.854a.485.485 0 0 1 0-.708L10.24 8 4.653 2.854a.485.485 0 0 1 0-.708.538.538 0 0 1 .738 0l5.956 5.5a.485.485 0 0 1 0 .708l-5.956 5.5a.538.538 0 0 1-.738 0" clip-rule="evenodd"></path></svg>'},96009:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M13.854 11.347a.486.486 0 0 1-.708 0L8 5.76l-5.146 5.587a.485.485 0 0 1-.708 0 .538.538 0 0 1 0-.738l5.5-5.956a.485.485 0 0 1 .708 0l5.5 5.956a.538.538 0 0 1 0 .738" clip-rule="evenodd"></path></svg>'},57986:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M5 1H4v14h1zm7 0h-1v14h1z" clip-rule="evenodd"></path></svg>'},34750:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5"></path></svg>'},25153:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M4 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m1.5-.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1zM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2m1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0m1-4a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8A.5.5 0 0 1 5 8m.5 3.5a.5.5 0 0 0 0 1h8a.5.5 0 0 0 0-1z" clip-rule="evenodd"></path></svg>'},42231:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjU2cHgiIHZpZXdCb3g9IjAgMCAyNTYgMjU2IiB2ZXJzaW9uPSIxLjEiPg0KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPg0KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTY3LjAwMDAwMCwgLTY1Ny4wMDAwMDApIiBmaWxsPSIjQzVDNUM1Ij4NCiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2Ny4wMDAwMDAsIDY1Ny4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTczLjcxNDI4Niw4OSBMMjU2LDE5OCBMMCwxOTggTDY0LDExNi4yNSBMMTA5LjcxNDI4NiwxNzAuNzUgTDE3My43MTQyODYsODkgWiBNOTksNTggQzEwNy44MzY1NTYsNTggMTE1LDY1LjE2MzQ0NCAxMTUsNzQgQzExNSw4Mi44MzY1NTYgMTA3LjgzNjU1Niw5MCA5OSw5MCBDOTAuMTYzNDQ0LDkwIDgzLDgyLjgzNjU1NiA4Myw3NCBDODMsNjUuMTYzNDQ0IDkwLjE2MzQ0NCw1OCA5OSw1OCBaIi8+DQogICAgICAgICAgICA8L2c+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4="},26826:e=>{"use strict";e.exports=s},48891:e=>{"use strict";e.exports=i},51315:e=>{"use strict";e.exports=o},74758:e=>{"use strict";e.exports=r},30726:e=>{"use strict";e.exports=a}},t={};function n(i){var a=t[i];if(void 0!==a)return a.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var l={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(l),n.d(l,{Widget:()=>Q,__set_webpack_public_path__:()=>X,default:()=>q});var e,t,i,a,o,s,r=n(48891),d=n(30726);!function(e){e.Horizon="HORIZON",e.Vertical="VERTICAL"}(e||(e={})),function(e){e.Scroll="SCROLL",e.Paging="PAGING"}(t||(t={})),function(e){e.All="ALL",e.Selected="SELECTED"}(i||(i={})),function(e){e.Card="CARD",e.List="LIST",e.Slide1="SLIDE1",e.Slide2="SLIDE2",e.Slide3="SLIDE3",e.Gallery="GALLERY",e.Navigator="NAVIGATOR",e.Custom1="CUSTOM1",e.Custom2="CUSTOM2"}(a||(a={})),function(e){e.Default="DEFAULT",e.Regular="REGULAR",e.Hover="HOVER"}(o||(o={})),function(e){e.Snapshot="SNAPSHOT",e.Custom="CUSTOM"}(s||(s={}));const p=r.utils.getLocalStorageAppKey(),c=(e,t)=>`${p}-${e}-${t||"default"}-RtBmArray`,m=(e,t)=>`${p}-bookmark-${e}-bookmarks-${t||"default"}`,u=(e,t)=>{const i=c(e,t),a=m(e,t);return JSON.parse(r.utils.readLocalStorage(a)||r.utils.readLocalStorage(i))||[]},h={_widgetLabel:"Bookmark",_widgetDescription:"A widget identify specific geographic locations and save to refer later.",addBookmark:"Add bookmark",layoutTips:"This is the customizable area",bookmarkList:"Bookmark list",graphicLayer:"Bookmark graphics layer"};var g=n(51315),v=n(26826),y=n(74758);class k extends r.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.2.0",description:"1.2.0",upgrader:e=>{let t=e;return t.bookmarks?(t.bookmarks.forEach(((e,i)=>{Object.keys(e.layersConfig||{}).forEach((a=>{const o=e.layersConfig[a];t=t.setIn(["bookmarks",i,"layersConfig",a],{visibility:o})}))})),t):t}}]}}const x=new k;var b=n(25153),w=n.n(b);const f=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:w()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var j=n(74138),S=n.n(j);const N=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:S()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var I=n(57986),C=n.n(I);const M=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:C()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var O=n(20864),P=n.n(O);const B=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:P()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var A=n(34750),L=n.n(A);const T=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:L()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var z=n(59788),V=n.n(z);const D=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:V()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var $=n(96009),E=n.n($);const R=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:E()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var F=n(3273),W=n.n(F);const H=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:W()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var G=n(11407),J=n.n(G);const U=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:J()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var K=n(25603),_=n.n(K);const Y=e=>{const t=window.SVG,{className:i}=e,a=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(e);o<a.length;o++)t.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(e,a[o])&&(i[a[o]]=e[a[o]])}return i}(e,["className"]),o=(0,r.classNames)("jimu-icon jimu-icon-component",i);return t?r.React.createElement(t,Object.assign({className:o,src:_()},a)):r.React.createElement("svg",Object.assign({className:o},a))};var Z=function(e,t,i,a){return new(i||(i=Promise))((function(o,s){function r(e){try{l(a.next(e))}catch(e){s(e)}}function n(e){try{l(a.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,n)}l((a=a.apply(e,t||[])).next())}))};class Q extends r.React.PureComponent{constructor(l){var p;super(l),this.Graphic=null,this.GraphicsLayer=null,this.Extent=null,this.Viewpoint=null,this.Basemap=null,this.autoOffCondition=e=>{var i,a;const{config:o,appMode:s,browserSizeMode:n}=this.props,{pageStyle:l,autoPlayAllow:d,autoInterval:p,autoLoopAllow:c}=o,m=n!==e.browserSizeMode,u=p!==(null===(i=e.config)||void 0===i?void 0:i.autoInterval)||c!==(null===(a=e.config)||void 0===a?void 0:a.autoLoopAllow);return s===r.AppMode.Design||l===t.Scroll||!d||u||m},this.settingLayout=()=>{const{layoutId:e,layoutItemId:t,id:i,selectionIsSelf:a}=this.props,{isSetLayout:o}=this.state;e&&i&&t&&!o&&a&&(this.props.dispatch(r.appActions.widgetStatePropChange(i,"layoutInfo",{layoutId:e,layoutItemId:t})),this.setState({isSetLayout:!0}))},this.formatMessage=(e,t)=>{const i=Object.assign({},h,d.defaultMessages,r.defaultMessages);return this.props.intl.formatMessage({id:e,defaultMessage:i[e]},t)},this.isEditing=()=>{const{appMode:e,config:t,selectionIsSelf:i,selectionIsInSelf:a}=this.props;return!!window.jimuConfig.isInBuilder&&(i||a)&&window.jimuConfig.isInBuilder&&e!==r.AppMode.Run&&t.isTemplateConfirm},this.handleRuntimeAdd=()=>Z(this,void 0,void 0,(function*(){this.rtBookmarkId++;const{jimuMapView:e}=this.state;if(!e)return;const t=e.view,{appMode:i,id:a}=this.props;if(i===r.AppMode.Run){const i=t.map.layers.toArray(),o=JSON.parse(JSON.stringify(t.map)).operationalLayers,n=[];i.forEach((e=>{for(const t in o){const i=o[t];if(e.id===i.id){n.push(e);break}}}));const l=this.getLayersConfig(n),d=`${r.utils.getLocalStorageAppKey()}-bookmark-${a}-bookmark-${r.utils.getUUID()}`,{dataUrl:p}=yield t.takeScreenshot({width:148,height:120});this.runtimeSnapCache.put(d,p),this.runtimeSnaps[d]=p;const c={id:d,name:`${this.formatMessage("_widgetLabel")}(${this.rtBookmarkId})`,title:`${this.formatMessage("_widgetLabel")}-${this.rtBookmarkId}`,type:t.type,imgSourceType:s.Snapshot,extent:t.extent.toJSON(),viewpoint:t.viewpoint.toJSON(),showFlag:!0,runTimeFlag:!0,mapViewId:e.id,mapDataSourceId:e.dataSourceId,layersConfig:l};"3d"===t.type&&(c.environment=JSON.parse(JSON.stringify(t.environment)));const h=m(this.props.id,this.props.mapWidgetId),g=u(this.props.id,this.props.mapWidgetId);r.utils.setLocalStorage(h,JSON.stringify(g.concat(`${d}`))),r.utils.setLocalStorage(`${d}`,JSON.stringify(c)),this.setState({runtimeBmArray:g.concat(`${d}`)})}})),this.getLayersConfig=e=>{const t=(e,i)=>(e.forEach((e=>{i[e.id]={layers:{}};const a=void 0===(null==e?void 0:e.visibility)&&!!(null==e?void 0:e.visible);i[e.id].visibility=a;const o=e.layers||e.sublayers||e.allSublayers;o&&o.length>0&&t(o,i[e.id].layers)})),i);return t(e,{})},this.shouldChangeLayerVisibility=e=>"hide"!==(null==e?void 0:e.listMode),this.showLayersConfig=(e,t,i=[],a=!1)=>{if(a)return;const o=(e,t)=>{e.forEach((e=>{var a,s,r;const n=!(i.findIndex((t=>t.id===e.id))>-1);this.shouldChangeLayerVisibility(e)&&(e.visible=void 0===(null===(a=t[e.id])||void 0===a?void 0:a.visibility)?n:null===(s=t[e.id])||void 0===s?void 0:s.visibility);const l=e.layers||e.sublayers||e.allSublayers,d=null===(r=null==t?void 0:t[e.id])||void 0===r?void 0:r.layers;l&&l.length>0&&d&&Object.keys(d).length>0&&o(l.toArray(),d)}))};o(e,t)},this.showMapOrgLayer=(e,t)=>{const i=(e,t)=>{e.forEach((e=>{if(this.shouldChangeLayerVisibility(e))for(const i in t){const a=t[i];if(e.visible=!1,e.id===a.id){e.visible=!0;break}}e.layers&&e.layers.length>0&&i(e.layers.toArray(),t)}))};i(e,t)},this.onViewBookmark=(e,t,i)=>{var a,o;if(!e)return;const{jimuMapView:s,viewGroup:n}=this.state,{id:l,useMapWidgetIds:d}=this.props,p=(null===(o=null===(a=this.props)||void 0===a?void 0:a.stateProps)||void 0===o?void 0:o.activeBookmarkId)||0;t?this.setState({highLightIndex:-1,runtimeHighLightIndex:i}):void 0!==t&&this.setState({highLightIndex:i,runtimeHighLightIndex:-1});const c=document.querySelectorAll(`.widget-bookmark.useMapWidgetId-${null==d?void 0:d[0]}`),m=`bookmark-widget-${l}`;c.forEach((e=>{if(!e.classList.contains(m)){const t=e.querySelector(".bookmark-container .active-bookmark-item");null==t||t.classList.remove("active-bookmark-item")}})),t||i!==this.state.highLightIndex||c.forEach((e=>{e.classList.contains(m)&&e.querySelectorAll(".bookmark-container .bookmark-pointer,.bookmark-only-pointer,.bookmark-custom-pointer")[i].classList.add("active-bookmark-item")})),t&&i===this.state.runtimeHighLightIndex&&c.forEach((e=>{e.classList.contains(m)&&e.querySelectorAll(".bookmark-container .bookmark-pointer.runtime-bookmark")[i].classList.add("active-bookmark-item")})),e&&!e.runTimeFlag&&p!==e.id&&this.props.dispatch(r.appActions.widgetStatePropChange(l,"activeBookmarkId",e.id)),d&&0!==d.length&&(0,r.getAppStore)().dispatch(r.appActions.requestAutoControlMapWidget(d[0],l)),s&&(e&&s.dataSourceId!==e.mapDataSourceId?n&&n.switchMap().then((()=>{this.viewBookmark(e)})):this.viewBookmark(e))},this.isNumber=e=>!isNaN(parseFloat(e))&&isFinite(e)&&"[object Number]"===Object.prototype.toString.call(e),this.viewBookmark=e=>{var t,a,o,s,n;const{appMode:l,config:d}=this.props,{jimuMapView:p}=this.state,{extent:c,viewpoint:m}=e,u={duration:1e3};if(l===r.AppMode.Run&&p&&p.view){"3d"===p.view.type?p.view.goTo({target:this.Viewpoint.fromJSON(m)},u):p.view.goTo({extent:this.Extent.fromJSON(c)},u),e.baseMap&&(p.view.map.basemap=this.Basemap.fromJSON(e.baseMap));const r=null===(t=null==e?void 0:e.ground)||void 0===t?void 0:t.transparency;(null==e?void 0:e.ground)&&this.isNumber(r)?p.view.map.ground.opacity=(100-r)/100:p.view.map.ground.opacity=this.mapOpacity;const l=p.view.map.layers.toArray(),h=(null===(o=null===(a=p.view.map)||void 0===a?void 0:a.resourceInfo)||void 0===o?void 0:o.operationalLayers)||[],g=null===(s=null==e?void 0:e.environment)||void 0===s?void 0:s.lighting.asMutable({deep:!0});(null==e?void 0:e.environment)&&g&&(p.view.environment.lighting={type:g.type,date:g.datetime,directShadows:g.directShadows,displayUTCOffset:g.displayUTCOffset});const v=null===(n=null==e?void 0:e.environment)||void 0===n?void 0:n.weather;(null==e?void 0:e.environment)&&v&&(p.view.environment.weather=v.asMutable({deep:!0}));const y=p.dataSourceId!==e.mapDataSourceId;e.mapOriginFlag?this.showMapOrgLayer(l,e.visibleLayers):this.showLayersConfig(l,e.layersConfig,h,y);const k=e.graphics&&e.graphics.length>0;if(this.graphicsLayerCreated[p.id]){const t=p.view.map.findLayerById(this.graphicsLayerId[p.id]);d.displayType===i.Selected?(null==t||t.removeAll(),k&&t&&e.graphics.forEach((e=>{t.graphics.push(this.Graphic.fromJSON(e))}))):this.graphicsPainted[p.id][e.id]?k&&(e.graphics.forEach((e=>{const i=t.graphics.find((t=>t.attributes.jimuDrawId===e.attributes.jimuDrawId));t.remove(i)})),e.graphics.forEach((e=>{t.graphics.push(this.Graphic.fromJSON(e))}))):(k&&e.graphics.forEach((e=>{t.graphics.push(this.Graphic.fromJSON(e))})),this.graphicsPainted[p.id][e.id]=!0)}else{const t=(new Date).getTime(),i=`bookmark-layer-${p.id}-${t}`,a=new this.GraphicsLayer({id:i,listMode:"hide",title:this.formatMessage("graphicLayer"),elevationInfo:{mode:"relative-to-scene"}});k&&e.graphics.forEach((e=>{a.graphics.push(this.Graphic.fromJSON(e))})),p.view.map.add(a),this.graphicsPainted[p.id]={},this.graphicsPainted[p.id][e.id]=!0,this.graphicsLayerId[p.id]=a.id,this.graphicsLayerCreated[p.id]=!0}}},this.getStyle=i=>{const{id:o,appMode:s,config:l}=this.props,d=[a.Custom1,a.Custom2];return r.css`
      ${"&.bookmark-widget-"+o} {
        overflow: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run?"hidden":"auto"};
        height: 100%;
        width: 100%;
        .bookmark-title-height{
          height: 45px;
        }
        .bookmark-list-height {
          height: calc(100% - 45px);
          overflow-y: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run?"hidden !important":"auto"};
        }
        .bookmark-title {
          flex-grow: 1;
          padding: 0 15px;
          line-height: 45px;
          font-size: ${r.polished.rem(16)};
        }
        .bookmark-btn-container {
          width: 32px;
          height: 32px;
        }
        .bookmark-btn {
          font-weight: bold;
          font-size: ${r.polished.rem(12)};
        }
        .bookmark-view-auto {
          overflow-y: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run&&!d.includes(l.templateType)?"hidden":"auto"};
          align-content: flex-start;
        }
        .gallery-card-add {
          cursor: pointer;
          min-width: 200px;
          height: 189px;
          display: grid;
          border: 1px solid ${i.colors.secondary};
          background: ${i.colors.white};
          margin: ${l.direction===e.Horizon?r.polished.rem(12):r.polished.rem(16)};
        }
        .card-add {
          cursor: pointer;
          height: 159px;
          display: inline-flex;
          border: 1px solid ${i.colors.palette.light[400]};
          background: ${i.colors.white};
          width: 150px;
          margin: 15px 10px;
          position: relative;
          .add-placeholder {
            height: 120px;
          }
        }
        .list-add {
          cursor: pointer;
          height: 37px;
          display: inline-flex;
          border: 1px solid ${i.colors.palette.light[400]};
          background: ${i.colors.white};
          width: calc(100% - 30px);
          margin: 0 15px 15px;
          position: relative;
        }
        .gallery-add-icon {
          position: relative;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin-top: -${r.polished.rem(10)};
          margin-left: -${r.polished.rem(10)};
        }
        .bookmark-runtimeSeparator {
          margin: 10px 10px 0;
          border: 1px dashed ${i.colors.secondary};
          width: 100%;
          height: 1px;
          &:last-of-type, &:first-of-type {
            display: none;
          }
        }
        .bookmark-container {
          ${l.templateType!==a.Card&&l.templateType!==a.List&&"height: 100%"};
          width: 100%;
          color: ${i.colors.black};
          .widget-card-content {
            padding: 8px 9px !important;
          }
          .bookmark-card-col {
            width: 170px;
            padding: 10px 10px 0;
            position: relative;
            .widget-card-image-inner {
              width: 148px;
              height: 120px;
              img {
                vertical-align: unset;
              }
            }
            .card-inner {
              transition: all 0.5s;
            }
          }
          .bookmark-list-col {
            padding: ${r.polished.rem(8)} 0;
            align-items: center !important;
            margin: 8px 15px 0;
          }
          .bookmark-pointer {
            cursor: pointer;
            &:hover {
              background: ${i.colors.palette.light[200]} !important;
            }
          }
          .active-bookmark-item {
            border: 1px solid var(--primary-500) !important;
          }
          .bookmark-only-pointer {
            cursor: pointer;
          }
          .bookmark-custom-pointer {
            cursor: pointer;
            border: 1px solid ${i.colors.light};
            width: 100%;
            ${l.direction===e.Vertical&&"position: absolute;"}
            ${l.direction===e.Vertical&&`height: calc(100% - ${l.space}px) !important;`}
          }
          .layout-height{
            height: ${l.pageStyle===t.Paging?"calc(100% - 49px)":"100%"} !important;
          }
          .border-none {
            border: none !important;
          }
          .runtime-bookmarkCard {
            .runtimeBookmarkCard-upload,
            .runtimeBookmarkCard-operation {
              display: none;
            }
            &:hover {
              .runtimeBookmarkCard-operation {
                display: block;
                position: absolute;
                right: 10px;
                background: ${i.colors.secondary};
                opacity: 0.9;
              }
              .runtimeBookmarkCard-upload {
                display: block;
                position: absolute;
                right: 10px;
                bottom: 48px;
                background: ${i.colors.secondary};
                opacity: 0.9;
              }
            }
          }
          .runtime-bookmarkList {
            display: inline-block !important;
            width: calc(100% - 30px);
            padding: 4px 0;
            margin: 8px 15px 0;
            align-items: center !important;
            .runtimeBookmarkList-operation {
              margin-right: 15px;
              display: none;
              height: 28px;
            }
            &:hover {
              .runtimeBookmarkList-operation {
                display: block;
              }
            }
          }
          .runtime-title-con {
            padding: 4px 0 !important;
          }
          .runtime-title {
            width: auto;
            display: inline-block !important;
            height: 29px;
            .input-wrapper {
              border: none;
              background-color: transparent;
            }
          }
          .suspension-drop-btn{
            border-radius: 12px;
            border: 0;
          }
          .suspension-drop-placeholder{
            width: 32px;
          }
          .suspension-nav-placeholder1{
            height: 32px;
            width: 60px;
          }
          .suspension-nav-placeholder2{
            height: 24px;
            width: 100px;
          }
          .suspension-noborder-btn{
            border: 0;
            padding-left: ${r.polished.rem(7)};
          }
          .suspension-tools-top {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${r.polished.rem(2)};
            }
          }
          .suspension-top-number {
            position: absolute;
            top: 5px;
            right: 5px;
            background: ${i.colors.white};
            border-radius: 10px;
            opacity: 0.8;
            width: 40px;
            text-align: center;
            z-index: 1;
          }
          .suspension-tools-middle {
            display: flex;
            width: 100%;
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            top: 50%;
            margin-top: ${l.direction===e.Horizon?"-13px":"-26px"};
            z-index: 1;
            .middle-nav-group button {
              background: ${i.colors.white};
              opacity: 0.8;
              border-radius: 50%;
            }
          }
          .suspension-middle-play {
            position: absolute;
            right: 5px;
            bottom: 20px;
            z-index: 2;
          }
          .suspension-navbar {
            display: flex;
            width: 100%;
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            top: 50%;
            z-index: 1;
            .navbar-btn-pre{
              position: absolute;
              left: 5px;
              border-radius: 50%;
            }
            .navbar-btn-next{
              position: absolute;
              right: 5px;
              border-radius: 50%;
            }
          }
          .suspension-navbar-verticle {
            display: flex;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            z-index: 1;
            margin-left: -13px;
            .navbar-btn-pre{
              position: absolute;
              top: 5px;
              border-radius: 50%;
            }
            .navbar-btn-next{
              position: absolute;
              bottom: 5px;
              border-radius: 50%;
            }
          }
          .suspension-tools-text {
            display: flex;
            width: 100%;
            padding: ${r.polished.rem(8)};
            position: absolute;
            border-top: 1px solid ${i.colors.secondary};
            bottom: 0;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${r.polished.rem(2)};
            }
            .nav-btn-text {
              width: 100px;
            }
          }
          .suspension-tools-bottom {
            display: flex;
            width: 100%;
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            bottom: 5px;
            z-index: 1;
            .jimu-dropdown {
              width: 32px;
            }
            .caret-icon {
              margin-left: ${r.polished.rem(3)};
            }
            .scroll-navigator {
              .btn {
                border-radius: ${i.borderRadiuses.circle};
              }
            }
            .nav-btn-bottom {
              width: ${l.autoPlayAllow?"100px":"60px"};
              border-radius: 16px;
              opacity: 0.8;
              background: ${i.colors.white};
            }
            .number-count {
              border-radius: 10px;
              opacity: 0.8;
              background: ${i.colors.white};
              width: 40px;
              text-align: center;
            }
          }
          .bookmark-slide {
            position: absolute;
            bottom: ${l.templateType===a.Slide3?"1px":"unset"};
            opacity: 0.8;
            background: ${i.colors.white};
            width: calc(100% - 2px);
            z-index: 1;
            padding: ${r.polished.rem(8)};
            .bookmark-slide-title {
              font-size: ${r.polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-slide-description {
              font-size: ${r.polished.rem(13)};
              max-height: 80px;
              overflow-y: auto;
            }
          }
          .bookmark-slide-gallery {
            position: absolute;
            bottom: ${l.templateType===a.Slide3?0:"unset"};
            opacity: 0.8;
            background: ${i.colors.white};
            width: 100%;
            z-index: 1;
            padding: ${r.polished.rem(8)};
            .bookmark-slide-title {
              font-size: ${r.polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-slide-description {
              max-height: 60px;
              overflow-y: auto;
              font-size: ${r.polished.rem(13)};
            }
          }
          .bookmark-text {
            background: ${i.colors.white};
            width: calc(100% - 2px);
            height: 60%;
            z-index: 1;
            padding: ${r.polished.rem(8)};
            .bookmark-text-title {
              font-size: ${r.polished.rem(16)};
              font-weight: bold;
            }
            .bookmark-text-description {
              height: calc(100% - 75px);
              overflow-y: auto;
              font-size: ${r.polished.rem(14)};
            }
          }
          .gallery-card {
            min-width: 200px;
            min-height: 180px;
            height: auto;
            position: relative;
            padding: ${l.direction===e.Horizon?"unset":r.polished.rem(16)};
            margin: ${l.direction===e.Horizon?r.polished.rem(12):"unset"};
            .gallery-card-inner {
              transition: all 0.5s;
              &:hover {
                transform: scale(1.05);
              }
            }
            .gallery-card-operation {
              display: none;
            }
            &:hover {
              .gallery-card-operation {
                display: block;
                position: absolute;
                top: ${l.direction===e.Horizon?0:r.polished.rem(20)};
                right: ${l.direction===e.Horizon?0:r.polished.rem(20)};
                background: ${i.colors.light};
                opacity: 0.9;
              }
            }
            .gallery-img {
              width: 198px;
              height: 150px;
              display: inline-flex;
            }
            .gallery-img-vertical {
              width: 100%;
              height: 200px;
            }
          }
          .gallery-slide-card {
            ${l.direction===e.Horizon&&`width: ${l.itemWidth}px !important`};
            ${l.direction===e.Horizon?`min-width: ${l.itemWidth}px !important`:`height: ${l.itemHeight}px !important`};
            height: calc(100% - ${r.polished.rem(32)});
            position: relative;
            margin: ${l.direction===e.Horizon?`${r.polished.rem(16)} 0`:`0 ${r.polished.rem(16)}`};
            padding-top: ${l.direction===e.Horizon?"unset":r.polished.rem(l.space)};
            ${l.direction===e.Horizon&&`margin-left: ${r.polished.rem(l.space)}`};
            &:first-of-type {
              margin-top: ${l.direction===e.Horizon?r.polished.rem(16):r.polished.rem(10)};
              padding-top: ${l.direction===e.Horizon?"unset":r.polished.rem(10)};
            }
            &:last-of-type {
              ${l.direction===e.Horizon?`padding-right: ${r.polished.rem(16)}`:`margin-bottom: ${r.polished.rem(20)}`};
            }
            .gallery-slide-inner {
              transition: all 0.5s;
              &:hover {
                transform: scale(1.05);
                .bookmark-slide-gallery {
                  width: 100%;
                }
              }
            }
          }
          .gallery-slide-lastItem {
            padding-right: 16px;
            margin-bottom: 16px;
          }
          .nav-bar {
            height: 48px;
            width: 280px;
            min-width: 280px;
            border: 1px solid ${i.colors.secondary};
            background: ${i.colors.light};
            padding: 0 ${r.polished.rem(8)};
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -24px;
            margin-left: -140px;
            .scroll-navigator {
              .btn {
                border-radius: ${i.borderRadiuses.circle};
              }
            }
            .navbtn {
              width: 100px;
            }
          }
          .example-tips {
            margin-top: -10px;
            top: 50%;
            position: relative;
            text-align: center;
          }
        }
        .bookmark-container::-webkit-scrollbar {
          display: none;
        }
        .gallery-container {
          display: inline-flex !important;
          overflow-x: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run&&!d.includes(l.templateType)?"hidden":"auto"};
        }
        .gallery-container-ver {
          overflow-y: ${window.jimuConfig.isInBuilder&&s!==r.AppMode.Run&&!d.includes(l.templateType)?"hidden":"auto"};
        }
        .horizon-line {
          margin: 10px 15px;
          border-bottom: 1px solid ${i.colors.secondary};
        }
        .vertical-line {
          margin: 10px 15px;
          border-right: 1px solid ${i.colors.secondary};
        }
        .vertical-border {
          padding-right: ${r.polished.rem(16)};
        }
        .default-img {
          width: 100%;
          height: 100%;
          background: ${i.colors.palette.light[200]} url(${n(42231)}) center center no-repeat;
          background-size: 50% 50%;
        }
        .edit-mask {
          height: calc(100% - 49px);
          z-index: 2;
        }
      }
    `},this.onActiveViewChange=e=>{var t,i,a;const{appMode:o,config:s}=this.props;if(this.setState({jimuMapView:e}),this.mapOpacity=(null===(a=null===(i=null===(t=null==e?void 0:e.view)||void 0===t?void 0:t.map)||void 0===i?void 0:i.ground)||void 0===a?void 0:a.opacity)||1,e&&o===r.AppMode.Run&&s.initBookmark&&!this.alreadyActiveLoading){const t=this.getMapBookmarks(e)||[],i=s.displayFromWeb?s.bookmarks.concat(t):s.bookmarks;i.length>0&&(this.alreadyActiveLoading=!0,e.view.when((()=>{this.setState({bookmarkOnViewId:i[0].id}),this.onViewBookmark(i[0])})))}},this.handleViewGroupCreate=e=>{this.setState({viewGroup:e})},this.typedImgExist=e=>{var t,i;return e.imgSourceType===s.Snapshot?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url},this.renderSlideViewTop=e=>{var t,i;const a=e.imgSourceType===s.Snapshot,o=a?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url;return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1 border-0",onClick:()=>{this.onViewBookmark(e)},key:e.id||`webmap-${e.name}`,role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))}},(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.name),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)),o?(0,r.jsx)(d.ImageWithParam,{imageParam:a?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"}))},this.renderSlideViewText=e=>{var t,i;const a=e.imgSourceType===s.Snapshot,o=a?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url;return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1 border-0",onClick:()=>{this.onViewBookmark(e)},key:e.id||`webmap-${e.name}`,role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))}},(0,r.jsx)("div",{className:"w-100",style:{height:"40%"}},o?(0,r.jsx)(d.ImageWithParam,{imageParam:a?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)("div",{className:"bookmark-text"},(0,r.jsx)("div",{className:"bookmark-text-title"},e.name),(0,r.jsx)("div",{className:"bookmark-text-description"},e.description)))},this.renderSlideViewBottom=e=>{var t,i;const a=e.imgSourceType===s.Snapshot,o=a?null===(t=e.snapParam)||void 0===t?void 0:t.url:null===(i=e.imgParam)||void 0===i?void 0:i.url;return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1 border-0",onClick:()=>{this.onViewBookmark(e)},key:e.id||`webmap-${e.name}`},o?(0,r.jsx)(d.ImageWithParam,{imageParam:a?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"}),(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.name),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)))},this.renderCustomContents=e=>{const t=this.getLayoutEntry(),{layouts:i}=this.props;return e.layoutName?(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1 border-0",onClick:()=>{this.onViewBookmark(e)},key:e.id,role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))}},(0,r.jsx)(t,{isRepeat:!0,layouts:i[e.layoutName],isInWidget:!0,className:"layout-height"})):(0,r.jsx)("div",null)},this.renderCustomExample=()=>{const e=this.getLayoutEntry(),{layouts:t}=this.props;if(t[o.Default])return(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1 border-0"},(0,r.jsx)(e,{isRepeat:!0,layouts:t[o.Default],isInWidget:!0,className:"layout-height"}))},this.handleArrowChange=e=>{const{config:t}=this.props,{jimuMapView:i}=this.state,a=this.getMapBookmarks(i)||[],o=t.displayFromWeb?t.bookmarks.concat(a):t.bookmarks,s=o.length;if(0===s)return;const{bookmarkOnViewId:r}=this.state;let n=o.findIndex((e=>e.id===r))>-1?o.findIndex((e=>e.id===r)):0;n!==s-1||e?0===n&&e?n=s-1:e&&n>0?n--:e||n++:n=0,this.setState({bookmarkOnViewId:o[n].id}),this.onViewBookmark(o[n])},this.handleOnViewChange=e=>{const{appMode:t,config:i}=this.props,{jimuMapView:a}=this.state,o=this.getMapBookmarks(a)||[],s=i.displayFromWeb?i.bookmarks.concat(o):i.bookmarks,n=s.findIndex((t=>t.id===e))>-1?s.findIndex((t=>t.id===e)):0;this.setState({bookmarkOnViewId:e}),t===r.AppMode.Run&&this.onViewBookmark(s[n])},this.getBookmarksOptions=e=>{const t=[];return e.forEach((e=>{t.push((0,r.jsx)("option",{key:e.id,value:e.id},e.name))})),t},this.getBookmarksDropdownItems=e=>{const{bookmarkOnViewId:t}=this.state,i=[];return e.forEach((e=>{i.push((0,r.jsx)(d.DropdownItem,{key:e.id,active:e.id===t},e.name))})),i},this.handleAutoPlay=()=>{const{config:e,useMapWidgetIds:t,id:i}=this.props,{bookmarkOnViewId:a,autoPlayStart:o,playTimer:s,jimuMapView:n}=this.state,l=this.getMapBookmarks(n)||[],d=e.displayFromWeb?e.bookmarks.concat(l):e.bookmarks;if(0===d.length)return;if(o)return s&&clearInterval(s),void this.setState({autoPlayStart:!1,playTimer:void 0});t&&0!==t.length&&(0,r.getAppStore)().dispatch(r.appActions.requestAutoControlMapWidget(t[0],i));const{autoInterval:p,autoLoopAllow:c}=e;let m=d.findIndex((e=>e.id===a));-1!==m&&m!==d.length-1||(m=0),this.setState({bookmarkOnViewId:d[m].id}),this.onViewBookmark(d[m]);const u=setInterval((()=>{if(m++,c)m>=d.length&&(m=0);else if(m>=d.length)return clearInterval(u),s&&clearInterval(s),void this.setState({autoPlayStart:!1,playTimer:void 0});this.setState({bookmarkOnViewId:d[m].id}),this.onViewBookmark(d[m])}),1e3*p+1e3);this.setState({autoPlayStart:!0,playTimer:u})},this.renderBottomTools=e=>{const{config:t}=this.props,{jimuMapView:i}=this.state,o=this.getMapBookmarks(i)||[],s=t.displayFromWeb?t.bookmarks.concat(o):t.bookmarks,n=s.length,{bookmarkOnViewId:l,autoPlayStart:p}=this.state;let c=1;return c=e?0:s.findIndex((e=>e.id===l))>-1?s.findIndex((e=>e.id===l))+1:1,(e=>{let i;switch(e){case a.Slide1:i=(0,r.jsx)("div",{className:"suspension-tools-bottom align-items-center justify-content-around"},s.length>1?(0,r.jsx)(d.Dropdown,{size:"sm",activeIcon:!0},(0,r.jsx)(d.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"default",className:"suspension-drop-btn",title:this.formatMessage("bookmarkList")},(0,r.jsx)(f,{autoFlip:!0,className:"suspension-drop-btn"})),(0,r.jsx)(d.DropdownMenu,null,s.map((e=>{const t=e.id===l;return(0,r.jsx)(d.DropdownItem,{key:e.id,active:t,onClick:()=>{this.handleOnViewChange(e.id)}},e.name)})))):(0,r.jsx)("div",{className:"suspension-drop-placeholder"}),s.length>1?(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",vertical:!1,onChange:this.handleArrowChange,className:"nav-btn-bottom",previousTitle:this.formatMessage("previous"),nextTitle:this.formatMessage("next")},(0,r.jsx)("div",{className:"bookmark-btn-container"},t.autoPlayAllow&&(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"link",onClick:this.handleAutoPlay,title:this.formatMessage("autoPlay"),"data-testid":"triggerAuto"},p?(0,r.jsx)(M,{className:"mr-1",size:"l"}):(0,r.jsx)(N,{className:"mr-1",size:"l"})))):(0,r.jsx)("div",{className:"suspension-nav-placeholder1"}),(0,r.jsx)("span",{className:"number-count"},this.isRTL?`${n}/${c}`:`${c}/${n}`));break;case a.Slide2:case a.Custom1:case a.Custom2:i=s.length>1?(0,r.jsx)("div",{className:"suspension-tools-text align-items-center justify-content-around"},(0,r.jsx)(d.Dropdown,{size:"sm",activeIcon:!0},(0,r.jsx)(d.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"default",className:"suspension-drop-btn",title:this.formatMessage("bookmarkList")},(0,r.jsx)(f,{autoFlip:!0,className:"suspension-drop-btn"})),(0,r.jsx)(d.DropdownMenu,null,s.map((e=>{const t=e.id===l;return(0,r.jsx)(d.DropdownItem,{key:e.id,active:t,onClick:()=>{this.handleOnViewChange(e.id)}},e.name)})))),(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",vertical:!1,onChange:this.handleArrowChange,className:"nav-btn-text",previousTitle:this.formatMessage("previous"),nextTitle:this.formatMessage("next")},(0,r.jsx)("span",null,c,"/",n)),(0,r.jsx)("div",{className:"bookmark-btn-container"},t.autoPlayAllow&&(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"link",onClick:this.handleAutoPlay,title:this.formatMessage("autoPlay")},p?(0,r.jsx)(M,{className:"mr-1",size:"l"}):(0,r.jsx)(N,{className:"mr-1",size:"l"})))):(0,r.jsx)("div",{className:"align-items-center"});break;case a.Slide3:i=(0,r.jsx)(g.Fragment,null,(0,r.jsx)("div",{className:"suspension-tools-top align-items-center justify-content-around"},s.length>1?(0,r.jsx)(d.Dropdown,{size:"sm",activeIcon:!0},(0,r.jsx)(d.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"default",className:"suspension-drop-btn",title:this.formatMessage("bookmarkList")},(0,r.jsx)(f,{autoFlip:!0,className:"suspension-drop-btn"})),(0,r.jsx)(d.DropdownMenu,null,s.map((e=>{const t=e.id===l;return(0,r.jsx)(d.DropdownItem,{key:e.id,active:t,onClick:()=>{this.handleOnViewChange(e.id)}},e.name)})))):(0,r.jsx)("div",{className:"suspension-drop-placeholder"})),(0,r.jsx)("span",{className:"suspension-top-number"},c,"/",n),(0,r.jsx)("div",{className:"suspension-tools-middle"},s.length>1&&(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",vertical:!1,onChange:this.handleArrowChange,className:"middle-nav-group",previousTitle:this.formatMessage("previous"),nextTitle:this.formatMessage("next")})),t.autoPlayAllow&&(0,r.jsx)("div",{className:"suspension-middle-play"},(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"link",onClick:this.handleAutoPlay,title:this.formatMessage("autoPlay")},p?(0,r.jsx)(M,{className:"mr-1",size:30}):(0,r.jsx)(N,{className:"mr-1",size:30}))))}return i})(t.templateType)},this.renderSlideScroll=e=>{const t=e.map(((e,t)=>{var i,a;const o=e.imgSourceType===s.Snapshot,n=o?null===(i=e.snapParam)||void 0===i?void 0:i.url:null===(a=e.imgParam)||void 0===a?void 0:a.url,l=t===this.state.highLightIndex;return(0,r.jsx)("div",{className:"gallery-slide-card",key:t},(0,r.jsx)("div",{className:(0,r.classNames)("w-100 h-100 bookmark-pointer gallery-slide-inner surface-1 border-0",{"active-bookmark-item":l}),onClick:()=>{this.onViewBookmark(e,!1,t)},role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))}},(0,r.jsx)("div",{className:"bookmark-slide-gallery"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.name),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)),n?(0,r.jsx)(d.ImageWithParam,{imageParam:o?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"})))})),i=(0,r.jsx)("div",{className:"gallery-slide-lastItem",key:"last"});return t.asMutable({deep:!0}).concat(i)},this.renderCustomScroll=e=>{const t=this.getLayoutEntry(),{layouts:i}=this.props,a=e.map(((e,a)=>{const o=a===this.state.highLightIndex;return(0,r.jsx)("div",{className:"gallery-slide-card",key:a},(0,r.jsx)("div",{className:(0,r.classNames)("w-100 h-100 bookmark-custom-pointer surface-1 border-0",{"active-bookmark-item":o}),onClick:()=>{this.onViewBookmark(e,!1,a)}},(0,r.jsx)(t,{isRepeat:!0,layouts:i[e.layoutName],isInWidget:!0,className:"layout-height"})))})),o=(0,r.jsx)("div",{className:"gallery-slide-lastItem",key:"last"});return a.asMutable({deep:!0}).concat(o)},this.scrollContainer=e=>{this.containerRef.current.scrollBy(e)},this.handleScroll=(t="next")=>{const{config:i}=this.props,{itemHeight:a=280,itemWidth:o=210,space:s=0}=i,r=i.direction===e.Horizon;if(this.containerRef.current&&"next"===t){const e=r?{top:0,left:this.isRTL?-(o+s):o+s,behavior:"smooth"}:{top:a,left:0,behavior:"smooth"};this.scrollContainer(e)}else if(this.containerRef.current&&"previous"===t){const e=r?{top:0,left:this.isRTL?o+s:-(o+s),behavior:"smooth"}:{top:-a,left:0,behavior:"smooth"};this.scrollContainer(e)}},this.renderNavbar=t=>{const{config:i}=this.props;return(0,r.jsx)("div",{key:"navBar",className:(i.direction===e.Horizon?"suspension-navbar":"suspension-navbar-verticle")+" align-items-center justify-content-between"},(0,r.jsx)(d.Button,{title:this.formatMessage("previous"),type:"primary",size:"sm",icon:!0,onClick:()=>{this.handleScroll("previous")},className:"navbar-btn-pre"},t?(0,r.jsx)(U,{autoFlip:!0,size:"s"}):(0,r.jsx)(R,{autoFlip:!0,size:"s"})),(0,r.jsx)(d.Button,{title:this.formatMessage("next"),type:"primary",size:"sm",icon:!0,onClick:()=>{this.handleScroll("next")},className:"navbar-btn-next"},t?(0,r.jsx)(H,{autoFlip:!0,size:"s"}):(0,r.jsx)(D,{autoFlip:!0,size:"s"})))},this.getMapBookmarks=e=>{var t,i;if(e&&(null==e?void 0:e.dataSourceId)){const a=e.view;if(!a)return;const o=null===(t=e.view)||void 0===t?void 0:t.map;let s=[];return"3d"===a.type?s=(null===(i=o.presentation)||void 0===i?void 0:i.slides)?JSON.parse(JSON.stringify(o.presentation.slides)):[]:"2d"===a.type&&(s=(null==o?void 0:o.bookmarks)?JSON.parse(JSON.stringify(o.bookmarks)):[]),s.map(((t,i)=>{var a,o;return t.id=`maporigin-${i}`,t.runTimeFlag=!0,t.mapOriginFlag=!0,t.mapDataSourceId=e.dataSourceId,(null===(a=t.thumbnail)||void 0===a?void 0:a.url)?t.imgParam={url:t.thumbnail.url}:t.imgParam={},(null===(o=t.title)||void 0===o?void 0:o.text)&&(t.name=t.title.text),t.imagePosition=d.ImageFillMode.Fill,t}))}},this.renderBookmarkList=i=>{const{appMode:o,config:n,selectionIsSelf:l,selectionIsInSelf:p}=this.props,{transitionInfo:c}=n,{bookmarkOnViewId:m,autoPlayStart:h,jimuMapView:v}=this.state,y=this.getMapBookmarks(v)||[];n.displayFromWeb&&(i=i.concat(y));const k=i.findIndex((e=>e.id===m))>-1?i.findIndex((e=>e.id===m)):0,x=0===k?1:Math.max(0,k-1),b=n.direction===e.Horizon,w=[a.Slide1,a.Slide2,a.Slide3,a.Custom1,a.Custom2],f=(l||p?null==c?void 0:c.previewId:null)||null,j=n.templateType===a.Gallery||w.includes(n.templateType)&&n.pageStyle===t.Scroll;return(0,r.jsx)("div",{className:"bookmark-container "+(j?b?"gallery-container":"gallery-container-ver":""),ref:this.containerRef},(l=>{var p,v,y,w,j,S,I,C;let O;switch(l){case a.Card:O=i.map(((e,t)=>{var i,a;const n=e.imgSourceType===s.Snapshot,l=n?null===(i=e.snapParam)||void 0===i?void 0:i.url:null===(a=e.imgParam)||void 0===a?void 0:a.url,p=t===this.state.highLightIndex;return(0,r.jsx)(g.Fragment,{key:t},(0,r.jsx)("div",{className:"d-inline-flex bookmark-card-col"},(0,r.jsx)(d.Card,{onClick:()=>{this.onViewBookmark(e,!1,t)},className:(0,r.classNames)("card-inner surface-1",{"bookmark-pointer":o===r.AppMode.Run,"active-bookmark-item":p}),button:!0,tabIndex:"0",onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))}},(0,r.jsx)("div",{className:"widget-card-image"},(0,r.jsx)("div",{className:"widget-card-image-inner"},l?(0,r.jsx)(d.ImageWithParam,{imageParam:n?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"}))),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:e.name},e.name)))))}));break;case a.List:O=i.map(((e,t)=>{const i=t===this.state.highLightIndex;return(0,r.jsx)("div",{key:t,onClick:()=>{this.onViewBookmark(e,!1,t)},className:(0,r.classNames)("d-flex bookmark-list-col surface-1",{"bookmark-pointer":o===r.AppMode.Run,"active-bookmark-item":i}),role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))}},(0,r.jsx)(B,{className:"ml-4"}),(0,r.jsx)("div",{className:"ml-2"},e.name))}));break;case a.Slide1:const l=i.map((e=>this.renderSlideViewTop(e)));return(0,r.jsx)(g.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:x,currentIndex:k,transitionType:null===(p=null==c?void 0:c.transition)||void 0===p?void 0:p.type,direction:null===(v=null==c?void 0:c.transition)||void 0===v?void 0:v.direction,playId:f},l):this.renderSlideScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools());case a.Slide2:const P=i.map((e=>this.renderSlideViewText(e)));return(0,r.jsx)(g.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:x,currentIndex:k,transitionType:null===(y=null==c?void 0:c.transition)||void 0===y?void 0:y.type,direction:null===(w=null==c?void 0:c.transition)||void 0===w?void 0:w.direction,playId:f},P):this.renderSlideScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools());case a.Slide3:const A=i.map((e=>this.renderSlideViewBottom(e)));return(0,r.jsx)(g.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:x,currentIndex:k,transitionType:null===(j=null==c?void 0:c.transition)||void 0===j?void 0:j.type,direction:null===(S=null==c?void 0:c.transition)||void 0===S?void 0:S.direction,playId:f},A):this.renderSlideScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools());case a.Gallery:const L=u(this.props.id,this.props.mapWidgetId),z=i.map(((e,t)=>{var i,a;const n=e.imgSourceType===s.Snapshot,l=n?null===(i=e.snapParam)||void 0===i?void 0:i.url:null===(a=e.imgParam)||void 0===a?void 0:a.url,p=t===this.state.highLightIndex;return(0,r.jsx)("div",{className:"gallery-card",key:t},(0,r.jsx)(d.Card,{onClick:()=>{this.onViewBookmark(e,!1,t)},button:!0,tabIndex:"0",onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),this.onViewBookmark(e))},className:(0,r.classNames)("gallery-card-inner surface-1",{"bookmark-pointer":o===r.AppMode.Run,"active-bookmark-item":p})},(0,r.jsx)("div",{className:"widget-card-image bg-light-300 "+(b?"gallery-img":"gallery-img-vertical")},l?(0,r.jsx)(d.ImageWithParam,{imageParam:n?e.snapParam:e.imgParam,altText:e.name,useFadein:!0,imageFillMode:e.imagePosition}):(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:e.name},e.name))))})),V=L.map(((e,t)=>{var i;const a=JSON.parse(r.utils.readLocalStorage(e));a.snapParam={url:this.runtimeSnaps[a.id]};const s=null===(i=a.snapParam)||void 0===i?void 0:i.url,n=r.React.createRef(),l=t===this.state.runtimeHighLightIndex;return(0,r.jsx)("div",{className:"gallery-card",key:`RuntimeGallery-${e}`},(0,r.jsx)(d.Card,{onClick:()=>{this.onViewBookmark(a,!0,t)},className:(0,r.classNames)("gallery-card-inner surface-1 runtime-bookmark",{"bookmark-pointer":o===r.AppMode.Run,"active-bookmark-item":l}),button:!0,tabIndex:"0",onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:e=>{"Enter"!==e.key&&" "!==e.key||(e.stopPropagation(),this.onViewBookmark(a))}},(0,r.jsx)("div",{className:"widget-card-image bg-light-300 "+(b?"gallery-img":"gallery-img-vertical")},s?(0,r.jsx)(d.ImageWithParam,{imageParam:a.snapParam,altText:a.name,useFadein:!0,imageFillMode:a.imagePosition}):(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate runtime-title-con"},(0,r.jsx)(d.TextInput,{className:"runtime-title w-100",ref:n,size:"sm",title:a.name,defaultValue:a.name||"",onClick:e=>{e.stopPropagation()},onKeyDown:e=>{this.handleKeydown(e,n)},onAcceptValue:t=>{this.onRuntimeBookmarkNameChange(e,t)}}))),(0,r.jsx)("span",{className:"gallery-card-operation float-right"},(0,r.jsx)(d.Button,{title:this.formatMessage("deleteOption"),onClick:()=>{this.handleRuntimeDelete(e)},type:"tertiary",icon:!0},(0,r.jsx)(Y,{size:"s"}))))})),D=n.runtimeAddAllow?(0,r.jsx)(g.Fragment,{key:"galleryAdd"},(0,r.jsx)("div",{className:"gallery-card-add",onClick:this.handleRuntimeAdd,title:this.formatMessage("addBookmark"),role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:e=>{"Enter"!==e.key&&" "!==e.key||(e.stopPropagation(),this.handleRuntimeAdd())}},(0,r.jsx)("div",{className:"gallery-add-icon"},(0,r.jsx)(T,{className:"mr-1",size:"l"}))),(0,r.jsx)("div",{className:"vertical-border"})):(0,r.jsx)("div",{className:"vertical-border",key:"last"}),$=z.asMutable({deep:!0}).concat(V),E=this.renderNavbar(n.direction===e.Horizon);$.push(D),$.push(E),O=$;break;case a.Navigator:const R=n.bookmarks.length,F=n.bookmarks.findIndex((e=>e.id===m))>-1?n.bookmarks.findIndex((e=>e.id===m))+1:1;return(0,r.jsx)("div",{className:"nav-bar d-flex align-items-center justify-content-around"},(0,r.jsx)(d.Select,{size:"sm",value:m,onChange:this.handleOnViewChange,style:{width:32}},this.getBookmarksOptions(i)),(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"tertiary",onClick:this.handleRuntimeAdd},(0,r.jsx)(T,{className:"mr-1",size:"l"})),(0,r.jsx)(d.NavButtonGroup,{type:"tertiary",circle:!0,vertical:!1,onChange:this.handleArrowChange,className:"navbtn"},(0,r.jsx)("span",null,F,"/",R)),(0,r.jsx)(d.Button,{icon:!0,className:"bookmark-btn",type:"tertiary",onClick:this.handleAutoPlay,disabled:!n.autoPlayAllow},h?(0,r.jsx)(M,{className:"mr-1",size:"l"}):(0,r.jsx)(N,{className:"mr-1",size:"l"})));case a.Custom1:case a.Custom2:const W=this.isEditing(),H=i.map((e=>this.renderCustomContents(e)));return(0,r.jsx)(g.Fragment,null,n.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:x,currentIndex:k,transitionType:null===(I=null==c?void 0:c.transition)||void 0===I?void 0:I.type,direction:null===(C=null==c?void 0:c.transition)||void 0===C?void 0:C.direction,playId:f},H):this.renderCustomScroll(i),n.pageStyle===t.Scroll&&this.renderNavbar(n.direction===e.Horizon),n.pageStyle===t.Paging&&this.renderBottomTools(),!W&&n.pageStyle===t.Paging&&o===r.AppMode.Design&&(0,r.jsx)("div",{className:"edit-mask position-absolute w-100"}))}return O})(n.templateType))},this.renderExampleSlideScroll=e=>(0,r.jsx)("div",{className:"gallery-slide-card"},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1 border-0"},(0,r.jsx)("div",{className:"bookmark-slide-gallery"},(0,r.jsx)("div",{className:"bookmark-slide-title"},e.title),(0,r.jsx)("div",{className:"bookmark-slide-description"},e.description)),(0,r.jsx)("div",{className:"default-img"}))),this.renderBookmarkExample=i=>{const{appMode:o,config:s}=this.props,n=s.direction===e.Horizon,l=s.templateType===a.Gallery;return(0,r.jsx)("div",{className:"bookmark-container "+(l?n?"gallery-container":"gallery-container-ver":""),ref:this.containerRef},(l=>{let p;switch(l){case a.Card:p=new Array(3).fill(1).map(((e,t)=>(0,r.jsx)("div",{className:"d-inline-flex bookmark-card-col",key:t},(0,r.jsx)(d.Card,{className:"surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300"},(0,r.jsx)("div",{className:"widget-card-image-inner"},(0,r.jsx)("div",{className:"default-img"}))),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:i.name},i.name))))));break;case a.List:p=new Array(3).fill(1).map(((e,t)=>(0,r.jsx)("div",{className:"d-flex bookmark-list-col surface-1",key:t},(0,r.jsx)(B,{className:"ml-4"}),(0,r.jsx)("div",{className:"ml-2"},i.name))));break;case a.Slide1:p=(0,r.jsx)(g.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1 border-0"},(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},i.title),(0,r.jsx)("div",{className:"bookmark-slide-description"},i.description)),(0,r.jsx)("div",{className:"default-img"}))):this.renderExampleSlideScroll(i),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0));break;case a.Slide2:p=(0,r.jsx)(g.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-only-pointer surface-1 border-0"},(0,r.jsx)("div",{className:"w-100",style:{height:"40%"}},(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)("div",{className:"bookmark-text"},(0,r.jsx)("div",{className:"bookmark-text-title"},i.title),(0,r.jsx)("div",{className:"bookmark-text-description"},i.description)))):this.renderExampleSlideScroll(i),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0));break;case a.Slide3:p=(0,r.jsx)(g.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},(0,r.jsx)("div",{className:"w-100 h-100 bookmark-pointer surface-1 border-0"},(0,r.jsx)("div",{className:"default-img"}),(0,r.jsx)("div",{className:"bookmark-slide"},(0,r.jsx)("div",{className:"bookmark-slide-title"},i.title),(0,r.jsx)("div",{className:"bookmark-slide-description"},i.description)))):this.renderExampleSlideScroll(i),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0));break;case a.Gallery:p=new Array(3).fill(1).map(((e,t)=>(0,r.jsx)("div",{className:"gallery-card",key:t},(0,r.jsx)(d.Card,{className:(o===r.AppMode.Run?"bookmark-pointer":"")+" surface-1"},(0,r.jsx)("div",{className:"widget-card-image bg-light-300 "+(n?"gallery-img":"gallery-img-vertical")},(0,r.jsx)("div",{className:"default-img"})),(0,r.jsx)(d.CardBody,{className:"widget-card-content text-truncate"},(0,r.jsx)("span",{className:"text-capitalize",title:i.name},i.name))))));break;case a.Custom1:case a.Custom2:const l=this.isEditing(),c=this.renderCustomExample();p=(0,r.jsx)(g.Fragment,null,s.pageStyle===t.Paging?(0,r.jsx)(r.TransitionContainer,{previousIndex:1,currentIndex:0,transitionType:s.transition,direction:s.transitionDirection},c):(0,r.jsx)("div",{className:"gallery-slide-card"},c),s.pageStyle===t.Scroll&&this.renderNavbar(s.direction===e.Horizon),s.pageStyle===t.Paging&&this.renderBottomTools(!0),!l&&s.pageStyle===t.Paging&&o===r.AppMode.Design&&(0,r.jsx)("div",{className:"edit-mask position-absolute w-100 h-100"}))}return p})(s.templateType))},this.onRuntimeBookmarkNameChange=(e,t)=>{const i=JSON.parse(r.utils.readLocalStorage(e));i.name=t,r.utils.setLocalStorage(e,JSON.stringify(i))},this.handleKeydown=(e,t)=>{"Enter"===e.key&&t.current.blur()},this.handleRuntimeDelete=e=>{const t=m(this.props.id,this.props.mapWidgetId),i=u(this.props.id,this.props.mapWidgetId),a=i.findIndex((t=>t===e));a>-1&&i.splice(a,1),r.utils.setLocalStorage(t,JSON.stringify(i)),r.utils.removeFromLocalStorage(e),this.runtimeSnapCache.delete(e),this.setState({runtimeBmArray:i})},this.renderRuntimeBookmarkList=()=>{const{appMode:e,config:t}=this.props,i=u(this.props.id,this.props.mapWidgetId);return(0,r.jsx)("div",{className:"bookmark-container"},(()=>{let o;switch(t.templateType){case a.Card:o=i.map(((t,i)=>{var a;let o=(0,r.Immutable)(JSON.parse(r.utils.readLocalStorage(t)));o=o.set("snapParam",{url:this.runtimeSnaps[o.id]});const s=null===(a=null==o?void 0:o.snapParam)||void 0===a?void 0:a.url,n=r.React.createRef(),l=i===this.state.runtimeHighLightIndex;return(0,r.jsx)(g.Fragment,{key:t},(0,r.jsx)("div",{className:"d-inline-flex bookmark-card-col runtime-bookmarkCard"},(0,r.jsx)(d.Card,{onClick:()=>{this.onViewBookmark(o,!0,i)},className:(0,r.classNames)("surface-1 runtime-bookmark",{"bookmark-pointer":e===r.AppMode.Run,"active-bookmark-item":l}),button:!0,tabIndex:"0",onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:e=>{"Enter"!==e.key&&" "!==e.key||(e.stopPropagation(),this.onViewBookmark(o))}},(0,r.jsx)("div",{className:"widget-card-image bg-light-300"},(0,r.jsx)("div",{className:"widget-card-image-inner"},s?(0,r.jsx)(d.ImageWithParam,{imageParam:o.snapParam,altText:o.name,useFadein:!0,imageFillMode:o.imagePosition}):(0,r.jsx)("div",{className:"default-img"}))),(0,r.jsx)(d.CardBody,{className:"widget-card-content runtime-title-con"},(0,r.jsx)(d.TextInput,{className:"runtime-title w-100",ref:n,size:"sm",title:o.name,defaultValue:o.name||"",onClick:e=>{e.stopPropagation()},onKeyDown:e=>{this.handleKeydown(e,n)},onAcceptValue:e=>{this.onRuntimeBookmarkNameChange(t,e)}}))),(0,r.jsx)("span",{className:"runtimeBookmarkCard-operation float-right"},(0,r.jsx)(d.Button,{title:this.formatMessage("deleteOption"),onClick:()=>{this.handleRuntimeDelete(t)},type:"tertiary",icon:!0},(0,r.jsx)(Y,{size:"s"})))))}));const s=(0,r.jsx)(g.Fragment,{key:"card-add"},(0,r.jsx)("div",{className:"card-add",onClick:this.handleRuntimeAdd,title:this.formatMessage("addBookmark"),role:"button",tabIndex:0,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation())},onKeyUp:e=>{"Enter"!==e.key&&" "!==e.key||(e.stopPropagation(),this.handleRuntimeAdd())}},(0,r.jsx)("div",{className:"add-placeholder"}),(0,r.jsx)("div",{className:"gallery-add-icon"},(0,r.jsx)(T,{className:"mr-1",size:"l"}))),(0,r.jsx)("div",{className:"vertical-border"}));t.runtimeAddAllow&&o.push(s);break;case a.List:o=i.map(((t,i)=>{const a=JSON.parse(r.utils.readLocalStorage(t)),o=r.React.createRef(),s=i===this.state.runtimeHighLightIndex;return(0,r.jsx)("div",{key:t,onClick:()=>{this.onViewBookmark(a,!0,i)},className:(0,r.classNames)("d-flex runtime-bookmark runtime-bookmarkList surface-1",{"bookmark-pointer":e===r.AppMode.Run,"active-bookmark-item":s})},(0,r.jsx)(B,{className:"ml-4"}),(0,r.jsx)(d.TextInput,{className:"runtime-title",ref:o,size:"sm",title:a.name,defaultValue:a.name||"",onKeyDown:e=>{this.handleKeydown(e,o)},onAcceptValue:e=>{this.onRuntimeBookmarkNameChange(t,e)}}),(0,r.jsx)("span",{className:"runtimeBookmarkList-operation float-right"},(0,r.jsx)(d.Button,{title:this.formatMessage("deleteOption"),onClick:()=>{this.handleRuntimeDelete(t)},type:"tertiary",icon:!0},(0,r.jsx)(Y,{size:"s"}))))}));const n=(0,r.jsx)(g.Fragment,{key:"list-add"},(0,r.jsx)("div",{className:"list-add",onClick:this.handleRuntimeAdd,title:this.formatMessage("addBookmark")},(0,r.jsx)("div",{className:"gallery-add-icon"},(0,r.jsx)(T,{className:"mr-1",size:"l"}))),(0,r.jsx)("div",{className:"vertical-border"}));t.runtimeAddAllow&&o.push(n)}return o})())};const c=(0,r.getAppStore)().getState(),v=u(this.props.id,this.props.mapWidgetId),y={jimuMapView:void 0,widgetRect:void 0,apiLoaded:!1,viewGroup:void 0,bookmarkOnViewId:1,autoPlayStart:!1,runtimeBmArray:v,playTimer:void 0,isSetLayout:!1,isSuspendMode:!1,highLightIndex:-1,runtimeHighLightIndex:-1,showInView:!0};let k=0;if(v.length>0){const e=v[v.length-1],{title:t}=JSON.parse(r.utils.readLocalStorage(e)),i=t.lastIndexOf("-");k=parseInt(t.substring(i+1))}this.state=y,this.graphicsLayerCreated={},this.graphicsPainted={},this.graphicsLayerId={},this.runtimeReference=void 0,this.containerRef=r.React.createRef(),this.rtBookmarkId=k,this.alreadyActiveLoading=!1,this.mapOpacity=1,this.isRTL=null===(p=null==c?void 0:c.appContext)||void 0===p?void 0:p.isRTL,this.runtimeSnaps={},this.runtimeSnapCache=new r.indexedDBUtils.IndexedDBCache(l.id,"bookmark","runtime-snap"),this.intersectionObserver=null}getLayoutEntry(){return window.jimuConfig.isInBuilder&&this.props.appMode===r.AppMode.Design?this.props.builderSupportModules.LayoutEntry:y.LayoutEntry}initRuntimeSnaps(){return Z(this,void 0,void 0,(function*(){this.runtimeSnapCache.initialized()||(yield this.runtimeSnapCache.init());const e=yield this.runtimeSnapCache.getAllKeys(),t=yield this.runtimeSnapCache.getAll();this.runtimeSnaps={},e.forEach(((e,i)=>{this.runtimeSnaps[e]=t[i]}))}))}static getDerivedStateFromProps(e,t){if(!e||0===Object.keys(e).length||!t||0===Object.keys(t).length)return null;const{autoPlayStart:i,playTimer:a}=t;return e.autoplayActiveId!==e.id?(i&&a&&clearInterval(a),{autoPlayStart:!1,playTimer:void 0}):null}componentDidMount(){this.state.apiLoaded||(0,v.loadArcGISJSAPIModules)(["esri/Graphic","esri/layers/GraphicsLayer","esri/geometry/Extent","esri/Viewpoint","esri/Basemap"]).then((e=>{[this.Graphic,this.GraphicsLayer,this.Extent,this.Viewpoint,this.Basemap]=e,this.setState({apiLoaded:!0})}))}getSnapshotBeforeUpdate(){return Z(this,void 0,void 0,(function*(){yield this.initRuntimeSnaps()}))}componentDidUpdate(e){var t,i,a,o,s,n;const{config:l,appMode:d,id:p,autoplayActiveId:u,isPrintPreview:h,mapWidgetId:g}=this.props,{autoPlayStart:v,playTimer:y,jimuMapView:k,isSuspendMode:x,showInView:b}=this.state,w=(null===(i=null===(t=this.props)||void 0===t?void 0:t.stateProps)||void 0===i?void 0:i.activeBookmarkId)||0;if(u&&k&&p!==u){const e=this.graphicsLayerId[k.id];if(!e)return;const t=k.view.map.findLayerById(e);t&&t.removeAll(),this.graphicsPainted[k.id]={}}if(e.appMode===r.AppMode.Design&&d===r.AppMode.Run&&k&&l.initBookmark){const e=this.getMapBookmarks(k)||[],t=l.displayFromWeb?l.bookmarks.concat(e):l.bookmarks;t.length>0&&b&&k.view.when((()=>{this.setState({bookmarkOnViewId:t[0].id}),this.onViewBookmark(t[0])}))}if(this.autoOffCondition(e)&&v)return y&&clearInterval(y),void this.setState({autoPlayStart:!1,playTimer:void 0});if(e.isPrintPreview!==h&&(v?(this.setState({isSuspendMode:!0}),this.handleAutoPlay()):x&&!v&&(this.setState({isSuspendMode:!1}),this.handleAutoPlay())),(null===(o=null===(a=this.props)||void 0===a?void 0:a.stateProps)||void 0===o?void 0:o.settingChangeBookmark)&&w){const e=l.bookmarks.findIndex((e=>e.id===w))>-1?l.bookmarks.findIndex((e=>e.id===w)):0;this.setState({bookmarkOnViewId:w}),this.props.dispatch(r.appActions.widgetStatePropChange(p,"settingChangeBookmark",!1)),d===r.AppMode.Run&&this.onViewBookmark(l.bookmarks[e],!1,e)}if(null===(n=null===(s=this.props)||void 0===s?void 0:s.stateProps)||void 0===n?void 0:n.lastFlag){this.props.dispatch(r.appActions.widgetStatePropChange(p,"lastFlag",!1));const e=k.view.map.findLayerById(this.graphicsLayerId[k.id]);e&&e.removeAll()}g!==e.mapWidgetId&&((e,t)=>{const i=c(e,t),a=m(e,t);r.utils.removeFromLocalStorage(a),r.utils.removeFromLocalStorage(i)})(p,e.mapWidgetId),this.settingLayout()}componentWillUnmount(){var e,t;const{jimuMapView:i}=this.state,a=(0,r.getAppStore)().getState().appConfig.widgets;if(this.runtimeSnapCache.initialized()&&this.runtimeSnapCache.clear(),!a[this.props.id]&&i){const a=null===(t=null===(e=null==i?void 0:i.view)||void 0===e?void 0:e.map)||void 0===t?void 0:t.findLayerById(this.graphicsLayerId[i.id]);a&&a.removeAll();const o=m(this.props.id,this.props.mapWidgetId),s=c(this.props.id,this.props.mapWidgetId);u(this.props.id,this.props.mapWidgetId).forEach((e=>{r.utils.removeFromLocalStorage(e)})),r.utils.removeFromLocalStorage(o),r.utils.removeFromLocalStorage(s)}this.intersectionObserver&&this.intersectionObserver.disconnect()}rootRefCallback(e){e&&(this.intersectionObserver&&this.intersectionObserver.disconnect(),this.intersectionObserver=new IntersectionObserver((e=>{var t;const i=(null===(t=e[0])||void 0===t?void 0:t.intersectionRatio)>.5;i&&(this.alreadyActiveLoading=!1),this.setState({showInView:i})}),{threshold:[0,.5,1]}),this.intersectionObserver.observe(e))}render(){const{config:e,id:t,useMapWidgetIds:i,theme:o,isPrintPreview:s}=this.props,{jimuMapView:n,apiLoaded:l,showInView:d}=this.state,{runtimeAddAllow:p}=e,c=(0,r.classNames)("jimu-widget","widget-bookmark","bookmark-widget-"+t,"useMapWidgetId-"+(null==i?void 0:i[0])),m=this.getMapBookmarks(n)||[],h=e.displayFromWeb?e.bookmarks.concat(m).length:e.bookmarks.length,k=u(this.props.id,this.props.mapWidgetId).length,x={id:99999,name:this.formatMessage("_widgetLabel"),title:this.formatMessage("_widgetLabel"),description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",type:"2d",mapViewId:"widget_egeditor-dataSource_eg",mapDataSourceId:"dataSource_eg"},b=[a.Slide1,a.Slide2,a.Slide3,a.Gallery,a.Custom1,a.Custom2];return(0,r.jsx)(y.ViewVisibilityContext.Consumer,null,(({isInView:t,isInCurrentView:n})=>{let m=!0;return m=!t||n,m||(this.alreadyActiveLoading=!1),(0,r.jsx)(g.Fragment,null,m&&(0,r.jsx)("div",{ref:this.rootRefCallback.bind(this),className:c,css:this.getStyle(o)},(0,r.jsx)(g.Fragment,null,(s||d)&&l&&(0,r.jsx)(v.JimuMapViewComponent,{useMapWidgetId:null==i?void 0:i[0],onActiveViewChange:this.onActiveViewChange,onViewGroupCreate:this.handleViewGroupCreate}),(p||0!==k||0!==h)&&(null==i?void 0:i[0])?(0,r.jsx)(g.Fragment,null,(0,r.jsx)("div",{className:"h-100 d-flex flex-wrap bookmark-view-auto"},(h>0||e.templateType===a.Gallery)&&this.renderBookmarkList(e.bookmarks),e.templateType!==a.Gallery&&(0,r.jsx)("div",{className:"bookmark-runtimeSeparator"}),(k>0||p)&&!b.includes(e.templateType)&&this.renderRuntimeBookmarkList())):(0,r.jsx)(g.Fragment,null,(0,r.jsx)("div",{className:"h-100 d-flex flex-wrap bookmark-view-auto"},this.renderBookmarkExample(x))))))}))}}Q.mapExtraStateProps=(e,t)=>{var i,a,o,s,n;const l=null==e?void 0:e.appConfig,{layouts:d,layoutId:p,layoutItemId:c,builderSupportModules:m,id:u,useMapWidgetIds:h}=t,g=null===(i=null==e?void 0:e.appRuntimeInfo)||void 0===i?void 0:i.selection,v=g&&m&&m.widgetModules&&m.widgetModules.selectionInBookmark(g,u,l,!1),y=null==e?void 0:e.mapWidgetsInfo,k=h&&0!==h.length?h[0]:void 0,x=(null==e?void 0:e.browserSizeMode)||r.BrowserSizeMode.Large;return{appMode:null===(a=null==e?void 0:e.appRuntimeInfo)||void 0===a?void 0:a.appMode,appConfig:l,layouts:d,selectionIsSelf:g&&g.layoutId===p&&g.layoutItemId===c,selectionIsInSelf:v,autoplayActiveId:k?null===(o=y[k])||void 0===o?void 0:o.autoControlWidgetId:void 0,mapWidgetId:k,browserSizeMode:x,isPrintPreview:null!==(n=null===(s=null==e?void 0:e.appRuntimeInfo)||void 0===s?void 0:s.isPrintPreview)&&void 0!==n&&n}},Q.versionManager=x;const q=Q;function X(e){n.p=e}})(),l})())}}}));