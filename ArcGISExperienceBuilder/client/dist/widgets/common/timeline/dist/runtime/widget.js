System.register(["jimu-core","jimu-arcgis","jimu-ui","jimu-core/dnd","jimu-theme"],(function(e,t){var n={},a={},i={},o={},s={};return{setters:[function(e){n.AllDataSourceTypes=e.AllDataSourceTypes,n.AppMode=e.AppMode,n.BaseVersionManager=e.BaseVersionManager,n.DataSourceManager=e.DataSourceManager,n.DataSourceStatus=e.DataSourceStatus,n.DataSourceTypes=e.DataSourceTypes,n.Immutable=e.Immutable,n.MultipleDataSourceComponent=e.MultipleDataSourceComponent,n.React=e.React,n.ReactRedux=e.ReactRedux,n.ReactResizeDetector=e.ReactResizeDetector,n.TimezoneConfig=e.TimezoneConfig,n.classNames=e.classNames,n.css=e.css,n.dataSourceUtils=e.dataSourceUtils,n.dateUtils=e.dateUtils,n.defaultMessages=e.defaultMessages,n.getAppStore=e.getAppStore,n.hooks=e.hooks,n.jsx=e.jsx,n.lodash=e.lodash,n.polished=e.polished,n.useIntl=e.useIntl,n.utils=e.utils},function(e){a.ArcGISDataSourceTypes=e.ArcGISDataSourceTypes,a.MapViewManager=e.MapViewManager,a.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){i.Alert=e.Alert,i.Button=e.Button,i.Dropdown=e.Dropdown,i.DropdownButton=e.DropdownButton,i.DropdownItem=e.DropdownItem,i.DropdownMenu=e.DropdownMenu,i.Icon=e.Icon,i.Label=e.Label,i.Popper=e.Popper,i.Switch=e.Switch,i.Tooltip=e.Tooltip,i.WidgetPlaceholder=e.WidgetPlaceholder,i.defaultMessages=e.defaultMessages},function(e){o.interact=e.interact},function(e){s.getThemeColorValue=e.getThemeColorValue}],execute:function(){e((()=>{var e={7586:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#000" d="m9 6.809 3.276 1.638.448-.894L10 6.19V3H9z"></path><path fill="#000" fill-rule="evenodd" d="M10.293 11.943A5.501 5.501 0 0 0 9.5 1a5.5 5.5 0 0 0-.792 10.943L9.5 13zM14 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M12 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" clip-rule="evenodd"></path><path fill="#000" d="M6 16H0v1h6zM13 16h6v1h-6z"></path></svg>'},43980:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4 16"><path fill="#282828" fill-rule="evenodd" d="M.322.03A.504.504 0 0 1 .96.305L4 8 .96 15.695a.504.504 0 0 1-.638.275.464.464 0 0 1-.29-.606L2.94 8 .031.636A.464.464 0 0 1 .322.03" clip-rule="evenodd"></path></svg>'},74695:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M8 3c1.175 0 2.27.337 3.195.92l.9-.598A7 7 0 0 0 2.5 13.33h10.999A6.97 6.97 0 0 0 15 9a6.968 6.968 0 0 0-1.256-4.002l-.603.906C13.686 6.808 14 7.867 14 9a5.968 5.968 0 0 1-1.008 3.33H3.008A6 6 0 0 1 8 3m-.183 6.9a1.322 1.322 0 0 1-.43-2.158L13 4 9.258 9.612a1.322 1.322 0 0 1-1.441.287" clip-rule="evenodd"></path></svg>'},59455:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0m1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" clip-rule="evenodd"></path></svg>'},83909:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2 2.22V1l1 .7 8.128 5.69L12 8l-.872.61L3 14.3 2 15v-1.22zM10.256 8 3 13.08V2.92zM14 1h-1v14h1z" clip-rule="evenodd"></path></svg>'},57986:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M5 1H4v14h1zm7 0h-1v14h1z" clip-rule="evenodd"></path></svg>'},56097:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="m2 1 12 7-12 7zm9.983 6.999L3 2.723v10.553z" clip-rule="evenodd"></path></svg>'},80272:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0m1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0M7.5 4.5a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3z" clip-rule="evenodd"></path></svg>'},10148:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 2.22V1l-1 .7-8.128 5.69L4 8l.872.61L13 14.3l1 .7v-1.22zM5.744 8 13 13.08V2.92zM2 1h1v14H2z" clip-rule="evenodd"></path></svg>'},88866:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16m0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd"></path></svg>'},26826:e=>{"use strict";e.exports=a},48891:e=>{"use strict";e.exports=n},54020:e=>{"use strict";e.exports=o},34796:e=>{"use strict";e.exports=s},30726:e=>{"use strict";e.exports=i}},t={};function l(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,l),i.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var r={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(r),l.d(r,{__set_webpack_public_path__:()=>be,default:()=>we});var e,t,n,a=l(48891),i=l(26826),o=l(30726);!function(e){e.Classic="CLASSIC",e.Modern="MODERN"}(e||(e={})),function(e){e.Slowest="SLOWEST",e.Slow="SLOW",e.Medium="MEDIUM",e.Fast="FAST",e.Fastest="FASTEST"}(t||(t={})),function(e){e.current="CURRENT",e.cumulatively="CUMULATIVE"}(n||(n={}));const s=["year","month","day"],c=["hour","minute","second"],u=4,d="d/M/y",m="h:mm:ss a";var p;!function(e){e[e.year=31536e3]="year",e[e.month=2592e3]="month",e[e.day=86400]="day",e[e.hour=3600]="hour",e[e.minute=60]="minute",e[e.second=1]="second"}(p||(p={}));const h={slowest:5e3,slow:4e3,medium:3e3,fast:2e3,fastest:1e3};function g(e){let n;const a=1e3*Math.ceil(e/1e3);return Object.keys(h).some((e=>h[e]===a&&(n=e.toUpperCase(),!0))),n||(a>h.slowest?n=t.Slowest:a<h.fastest&&(n=t.Fastest)),n}function f(e,t=!0){let n=null;if(e)if("number"==typeof e.value)n=e.value;else{const i=new Date;i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),e.value===a.dateUtils.VirtualDateType.Today?(i.setHours(0),n=i.getTime()+v(e),n=t?n:n+1e3*p.day):e.value===a.dateUtils.VirtualDateType.Now&&(n=i.getTime()+v(e),n=t?n:n+1e3*p.hour)}return n}function v(e){return e.offset?e.offset.val*p[e.offset.unit]*1e3:0}function y(e,t){let n=null;const o=Object.keys(e).map((t=>e[t]))[0];if(o.type===i.ArcGISDataSourceTypes.WebMap){const e=[];o.getAllChildDataSources().forEach((t=>{(t.type===a.DataSourceTypes.MapService&&t.supportTime()||t.type===a.DataSourceTypes.FeatureLayer&&null===a.dataSourceUtils.findMapServiceDataSource(t)&&t.supportTime())&&e.push(t)}));const i=(null==t?void 0:t.map((e=>e.dataSourceId)))||[];n={},e.forEach((e=>{(0===i.length||i.includes(e.id))&&(n[e.id]=e)}))}return n}function w(e,t,n=!1){let i;if(i=window.jimuConfig.isBuilder?(0,a.getAppStore)().getState().appStateInBuilder.appConfig.attributes.timezone:(0,a.getAppStore)().getState().appConfig.attributes.timezone,(null==i?void 0:i.type)===a.TimezoneConfig.Specific){const o=a.dataSourceUtils.getTimeZoneOffsetByName(i.value),s=a.dataSourceUtils.getLocalTimeOffset();n?(e=e-s+o,t=t-s+o):(e=e+s-o,t=t+s-o)}return{startTime:e,endTime:t}}function b(e,t){const n=[...s,...c],a=[],i=t-e;return n.forEach((e=>{i>=1e3*p[e]&&a.push(e)})),a}var x;function S(e,t){const n=e*t/u;let a;return n>=60?a=1:n>=12&&n<60?a=5:n>=6&&n<12?a=10:n>=4&&n<6?a=15:n>=2&&n<4?a=30:n<2&&(a=null),{value:a,tickWidth:e/(60/a)}}function M(e,t,n){let a=!1;const i=n.day.value;if(1!==i){const n=e.getMonth()+1;2===i?(2===n&&28===t||30===t)&&(a=!0):7===i?(2===n&&21===t||28===t)&&(a=!0):10===i?20===t&&(a=!0):15===i&&15===t&&(a=!0)}return a}function j(e,t,n,a,i){if(e){const o=a[a.length-1];if(!o)return!0;const s=E(o.label),l=E(t);s/(1===a.length?1:2)+l/2>(n-parseFloat(o.position)/100)*i&&(e=!1)}return e}function k(e,t,n=!1){let a="";return e.day?a=t.getFullYear():e.month?(a=t.getFullYear(),n&&(a+="/"+(t.getMonth()+1))):a=t.getFullYear(),a}function T(e,t){const n=t.getMonth()+1;let a="";return!e.day||e.hour&&1===e.hour.value?1!==n&&(a=n):a=n+"/"+t.getDate(),a}function D(e,t){let n=e.getDate();const a=e.getMonth()+1;return t.hour&&(n=a+"/"+n),n}function R(e,t){return e.getHours()+":00"}function O(e,t){let n=e.getMinutes();return t.second&&(n=e.getHours()+":"+(n<10?"0":"")+n),n}!function(e){e[e.year=1]="year",e[e.month=2]="month",e[e.day=3]="day",e[e.hour=4]="hour",e[e.minute=5]="minute",e[e.second=6]="second"}(x||(x={}));const C={};function E(e,t,n){const a=window;if(void 0===a.measureCanvasCTX){const e=document.createElement("canvas");a.measureCanvasCTX=e.getContext("2d")}if(C[e])return C[e];const i=a.measureCanvasCTX.measureText(e).width+10;return C[e]=i,i}function N(e,t,n){switch(e){case"year":t.setFullYear(t.getFullYear()+n);break;case"month":t.setMonth(t.getMonth()+n);break;case"day":t.setDate(t.getDate()+n);break;case"hour":t.setHours(t.getHours()+n);break;case"minute":t.setMinutes(t.getMinutes()+n);break;case"second":t.setSeconds(t.getSeconds()+n)}return t.getTime()}function L(e,t,n,a,i,o=!0){let s;const l=o?1:-1;if(i)s=n+1/i*(t-e)*l,s=Math.round(s),Math.abs(s-e)<1e4?s=e:Math.abs(s-t)<1e4&&(s=t);else{const e=new Date(n),t=a.val*l;switch(null==a?void 0:a.unit){case"year":e.setFullYear(e.getFullYear()+t);break;case"month":e.setMonth(e.getMonth()+t);break;case"day":e.setDate(e.getDate()+t);break;case"hour":e.setHours(e.getHours()+t);break;case"minute":e.setMinutes(e.getMinutes()+t);break;case"second":e.setSeconds(e.getSeconds()+t)}s=e.getTime()}return s}function I(e,t,n,a){let i=!1;const o=1/a/2*100;return n>=e-o&&n<=t+o&&(i=!0),i}function z(e,t,n){return(null==n?void 0:n.zoomLevel)===t&&0!==t?n.maxWidth/e:Math.pow(2,t)}function A(e,t,n){return e*z(e,t,n)}var P=l(54020);const W={_widgetLabel:"Timeline",overallTimeExtent:"Overall time extent",filteringApplied:"Timeline filtering applied",noTlFromHonoredMapWarning:"Oops! Seems like something went wrong with this map and we cannot get any valid time settings.",invalidTimeSpanWarning:"Please check the widget configurations to make sure the time span is valid.",timezoneWarning:"The Timeline widget is not available to use under the data time zone."};var V=l(80272),$=l.n(V);const F=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:$()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var U=l(59455),B=l.n(U);const H=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:B()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var Y=l(88866),_=l.n(Y);const G=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:_()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var X=l(56097),J=l.n(X);const q=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:J()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var Q=l(57986),Z=l.n(Q);const K=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:Z()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var ee=l(10148),te=l.n(ee);const ne=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:te()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var ae=l(83909),ie=l.n(ae);const oe=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:ie()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var se=l(74695),le=l.n(se);const re=e=>{const t=window.SVG,{className:n}=e,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n}(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:le()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var ce=l(34796);const ue=l(43980),de=Object.assign({},W,a.defaultMessages,o.defaultMessages),me=function(n){const{width:i,height:s,applied:l,timeStyle:r=e.Classic,foregroundColor:c,backgroundColor:g,sliderColor:f,theme:v,startTime:y,endTime:w,accuracy:b="year",stepLength:C,dividedCount:E,cumulatively:W=!1,enablePlayControl:V=!1,speed:$=t.Medium,autoPlay:U,updating:B=!1,onTimeChanged:Y,onApplyStateChanged:_}=n,[X,J]=a.React.useState(i),[Q,Z]=a.React.useState(s);a.React.useEffect((()=>{J(i-(r===e.Classic?64:80)),Z(r===e.Classic?52:80)}),[i,s,r]);const[ee,te]=a.React.useState(0),[ae,ie]=a.React.useState(null),se=(0,a.useIntl)(),le=(()=>{const e=(0,a.useIntl)();return a.React.useCallback(((t,n)=>e.formatMessage({id:t,defaultMessage:de[t]},n)),[e])})(),me=a.React.useMemo((()=>[{value:t.Slowest,label:le("slowest")},{value:t.Slow,label:le("slow")},{value:t.Medium,label:le("medium")},{value:t.Fast,label:le("fast")},{value:t.Fastest,label:le("fastest")}]),[]),[pe,he]=a.React.useState($);a.React.useEffect((()=>{he($)}),[$]);const[ge,fe]=a.React.useState(U||!1),ve=a.React.useRef(null),ye=a.React.useRef(null),[we,be]=a.React.useState(null),[xe,Se]=a.React.useState(0),[Me,je]=a.React.useState(y),[ke,Te]=a.React.useState(null),[De,Re]=a.React.useState(null),[Oe,Ce]=a.React.useState(null),[Ee,Ne]=a.React.useState(null),[Le,Ie]=a.React.useState(null),[ze,Ae]=a.React.useState(null),Pe=a.React.useRef(null),We=a.React.useRef(null),Ve=a.React.useRef(null),$e=a.React.useRef(null),Fe=a.React.useRef(null),[Ue,Be]=a.React.useState(!1),He=a.React.useRef(!1),Ye=e=>{window.jimuConfig.isInBuilder&&He.current&&e.key.includes("Arrow")&&e.preventDefault()};a.React.useEffect((()=>{function e(e){He.current=!0}function t(e){He.current=!1}function n(e){e.edges={left:!0},_e(e)}function a(e){e.edges={right:!0},_e(e)}return ve.current.addEventListener("mousedown",Ke),We.current.addEventListener("keyup",n,!0),Ve.current.addEventListener("keyup",a,!0),document.body.addEventListener("keydown",Ye,{passive:!1}),We.current.addEventListener("focus",e,!0),We.current.addEventListener("blur",t,!0),Ve.current.addEventListener("focus",e,!0),Ve.current.addEventListener("blur",t,!0),()=>{var i;null===(i=ve.current)||void 0===i||i.removeEventListener("mousedown",Ke),null==Le||Le.unset(),null==ze||ze.unset(),We.current&&Ve.current&&(We.current.removeEventListener("keyup",n,!0),Ve.current.removeEventListener("keyup",a,!0),document.body.removeEventListener("keydown",Ye),We.current.removeEventListener("focus",e,!0),We.current.removeEventListener("blur",t,!0),Ve.current.removeEventListener("focus",e,!0),Ve.current.removeEventListener("blur",t,!0))}}),[]);const _e=a.hooks.useEventCallback((e=>{if(e.key.includes("Arrow")){e.preventDefault();const t="ArrowLeft"===e.key||"ArrowTop"===e.key?-1:1,n=Je();let a=n.startValue,i=n.endValue;if(C)e.edges.left?a=N(C.unit,new Date(n.startValue),t*C.val):i=N(C.unit,new Date(n.endValue),t*C.val);else{const o=(n.extent[1]-n.extent[0])/E;e.edges.left?a+=t*o:i+=t*o}e.edges.left?(a=Math.max(n.extent[0],a),a=Math.min(a,i)):(i=Math.min(n.extent[1],i),i=Math.max(a,i)),ot(a,i)}}));a.React.useEffect((()=>{Pe.current&&(Ie(function(e,t,n,a,i){let o,s,l,r,c,u,d,m;return e(t).resizable({edges:{left:".resize-left",right:".resize-right"}}).on("resizestart",(e=>{e.stopPropagation(),l=n(),c=l.startValue,u=l.endValue,d=l.startValue,m=l.endValue,r=u-c,o=0;const a=t.getBoundingClientRect();s=a.width,t.style.minWidth="0px"})).on("resizemove",(e=>{const{extent:t}=l;e.stopPropagation();const n=e.deltaRect;o+=n.width;const i=r&&s+o,h=function(e,t,n,a,i,o){let s=e,l=t;const r=(n[1]-n[0])/a*i;return o.edges.left?s=e-r:l=t+r,{newStart:s,newEnd:l}}(d,m,t,i,o,e),g=function(e,t,n,a,i,o,s){const{width:l,extent:r,stepLength:c,accuracy:u,dividedCount:d}=n;let m=a,h=i;if(c){const n=Math.round((r[1]-r[0])*t/l/p[u]/1e3);e.edges.left?m=N(u,new Date(s),-n):h=N(u,new Date(o),n)}else{const n=(r[1]-r[0])/d,a=Math.round((r[1]-r[0])*t/l/n);e.edges.left?m=s-a*n:h=o+a*n}return e.edges.left?(m=Math.min(m,h),m=Math.max(r[0],m),m=Math.min(r[1],m)):(h=Math.max(m,h),h=Math.min(r[1],h),h=Math.max(r[0],h)),{newStart:m,newEnd:h}}(e,i||o,l,c,u,h.newStart,h.newEnd);a(g.newStart,g.newEnd),d=g.newStart,m=g.newEnd})).on("resizeend",(e=>{e.stopPropagation(),i(d,m)}))}(P.interact,Pe.current,Je,ot,st)),Ae(function(e,t,n,a,i){let o,s,l,r,c,u,d=null;return e(t).draggable({inertia:!1,modifiers:[],autoScroll:!0,onstart:e=>{e.stopPropagation(),e.preventDefault(),s=n(),l=s.startValue,r=s.endValue,c=s.startValue,u=s.endValue,o=0},onmove:e=>{e.stopPropagation(),e.preventDefault();const{extent:t,width:n}=s;o=e.clientX-e.clientX0;const i=function(e,t,n){return(e[1]-e[0])/t*n}(t,n,o),m=function(e,t,n,a,i,o,s){const{extent:l,stepLength:r,dividedCount:c}=t;let u=n,d=a;if(r){const t=Math.round(e/p[r.unit]/r.val/1e3);0!==t&&(u=N(r.unit,new Date(u),t*r.val),d=N(r.unit,new Date(d),t*r.val))}else{const t=(l[1]-l[0])/c,n=Math.round(e/t);0!==n&&(u+=n*t,d+=n*t)}return e>0?d>l[1]?r?u>=l[1]?(u=i,d=o):s=l[1]:(u=l[1]-(a-n),d=l[1]):s=null:(s=null,u<l[0]&&(u=l[0],d=u+(a-n))),{newStart:u,newEnd:d,newTempEnd:s}}(i,s,l,r,c,u,d);a(m.newStart,m.newEnd),c=m.newStart,u=m.newEnd,d=m.newTempEnd},onend:e=>{e.stopPropagation(),i(c,u,d)}})}(P.interact,Pe.current,qe,ot,st)))}),[r]),a.React.useEffect((()=>{ye.current={left:0,x:0},Be(!1),Se(0),te(0),fe(U),Re(null),je(y);const e=W?y:L(y,w,y,C,E);Te(e),Y(y,e)}),[U,V,y,W,w,b,C,E]),a.React.useEffect((()=>{const e=function(e){const{width:t,startTime:n,endTime:a,accuracy:i="hour"}=e,o=x[i],s={year:null,month:null,day:null,hour:null,minute:null,second:null},l=function(e,t,n){const a=n/u;let i,o;const s=(t.getTime()-e.getTime())/31536e6,l=a/s;return l>=1?(i=1,o=l*u):(l>=.2?i=5:l>=.1&&l<.2?i=10:l>=.02&&l<.1?i=50:l<.02&&(i=100),o=n/(s/i)),{value:i,tickWidth:o/n}}(new Date(n),new Date(a),t);if(s.year={value:l.value,tickWidth:l.tickWidth},x.month<=o&&1===l.value){const e=function(e,t){const n=e*t/u;let a=null;return n>=12?a=1:n>=4?a=3:n>=2&&(a=6),{value:a,tickWidth:e/(12/a)}}(l.tickWidth,t);if(null!==e.value&&(s.month={value:e.value,tickWidth:e.tickWidth},x.day<=o&&1===e.value)){const e=function(e,t,n){let a;const i=(t-e)/864e5,o=n/u/i;return a=o>=1?1:o>=.5&&o<1?2:o>=1/7&&o<.5?7:o>=.1&&o<1/7?10:o>=1/15&&o<.1?15:null,{value:a,tickWidth:1/(i/a)}}(n,a,t);if(null!==e.value&&(s.day={value:e.value,tickWidth:e.tickWidth},x.hour<=o&&1===e.value)){const n=function(e,t){const n=e*t/u;let a;return n>=24?a=1:n>=12&&n<24?a=2:n>=4&&n<12?a=6:n>=3&&n<4?a=8:n>=2&&n<3?a=12:n<2&&(a=null),{value:a,tickWidth:e/(24/a)}}(e.tickWidth,t);if(null!==n.value&&(s.hour={value:n.value,tickWidth:n.tickWidth},x.minute<=o&&1===n.value)){const e=S(n.tickWidth,t);if(null!==e.value&&(s.minute={value:e.value,tickWidth:e.tickWidth},x.second<=o)){const n=S(e.tickWidth,t);null!==n.value&&(s.second={value:n.value,tickWidth:n.tickWidth})}}}}}return s}({width:A(X,ee,ae),startTime:y,endTime:w,accuracy:b});be(e)}),[X,y,w,b,ee,ae]),a.React.useEffect((()=>{const e=function(e,t,n,a){if(e<0)return;const i=(n-t)/p[a]/1e3,o=Math.max(e,8*u*i);let s=0;for(;A(e,s)<o||30===s;)s++;return{maxWidth:o,zoomLevel:s}}(X,y,w,b);ie(e)}),[X,y,w,b]);const Ge=a.ReactRedux.useSelector((e=>{var t,n;return ge?(null===(t=e.appRuntimeInfo)||void 0===t?void 0:t.appMode)===a.AppMode.Design||(null===(n=e.appRuntimeInfo)||void 0===n?void 0:n.isPrintPreview):null})),Xe=a.React.useRef(Ge),Je=a.hooks.useEventCallback((()=>({startValue:Oe||Me,endValue:Ee||De||ke,extent:[y,w],width:A(X,ee,ae),accuracy:b,stepLength:C,dividedCount:E}))),qe=a.hooks.useEventCallback((()=>({startValue:Oe||Me,endValue:Ee||ke,extent:[y,w],width:A(X,ee,ae),accuracy:b,stepLength:C,dividedCount:E}))),Qe=a.hooks.useEventCallback((e=>{a.lodash.debounce((()=>{if(Oe)return;const t=z(X,ee,ae),n=e.clientX-ye.current.x;let a=ye.current.left-n/(t*X)*100;a=Math.min(a/100,(t-1)/t),a=a<0?0:a,Se(100*a)}),50)()})),Ze=a.hooks.useEventCallback((()=>{ve.current.style.cursor="grab",ve.current.style.removeProperty("user-select"),document.removeEventListener("mousemove",Qe),document.removeEventListener("mouseup",Ze)})),Ke=a.hooks.useEventCallback((e=>{0!==ee&&"BUTTON"!==e.target.tagName&&(ve.current.style.cursor="grabbing",ve.current.style.userSelect="none",ye.current={left:xe,x:e.clientX},document.addEventListener("mousemove",Qe),document.addEventListener("mouseup",Ze))})),et=a.React.useCallback(((e=Me,t=ke,n)=>{if(e<=y)return void Se(0);const a=w-y,i=a/z(X,ee,ae),o=y+xe/100*a,s=o+i;let l;if(n&&(t<=o||e>=s))l=Math.min(e,w-i);else{if(n||!(e>=s||t<=o))return;l=Math.max(y,t-i)}Se((l-y)/(w-y)*100)}),[ee,y,w,xe,Me,ke,X,ae]),tt=a.React.useCallback((e=>{const t=ee+(e?1:-1);if(0===t)return void Se(0);const n=w-y,a=z(X,ee,ae),i=z(X,t,ae),o=n/a,s=y+xe/100*n,l=s+o;let r=xe;const c=De||ke;if(c===w&&c===l)r=(i-1)/i*100;else if(Me<s&&c>s&&c<l)r=(c-(c-s)/(i/a)-y)/(w-y)*100;else if(Me>=l||ke<=s&&Me!==ke||Me<s&&ke>l)r=(Me+(ke-Me)/2-o*a/i/2-y)/(w-y)*100;else{const t=(Me-y)/(w-y)*100-xe;r=e?xe+t/2:xe-t}r=Math.max(0,r),r=Math.min(r,(i-1)/i*100),Se(r)}),[ee,y,w,xe,X,Me,ke,De,ae]),nt=a.React.useCallback((e=>{const t=L(y,w,ke,C,E,e);let n=y,a=w;if(W){const n=e&&ke>=w,i=!e&&y===ke;if(e&&t>w)(De||E)&&e?(a=y,Re(null)):(a=t,Re(w));else{if(i)return;a=n?y:t,Re(null)}}else{const i=L(y,w,Me,C,E,e),o=!e&&y===Me,s=!e&&i<y,l=e&&i>=w;if(i<w&&t>w)(De||E)&&e?(n=y,a=y+ke-Me,Re(null)):(n=i,a=t,Re(w));else{if(o)return;s||l?(n=y,a=y+ke-Me):(n=i,a=t),Re(null)}je(n)}Te(a),0!==ee&&et(n,a,e),Y(n,a)}),[E,w,ke,y,Me,C,W,Y,et]),at=a.React.useCallback((()=>{$e.current&&(clearInterval($e.current),$e.current=null)}),[]),it=a.React.useCallback((()=>{at(),$e.current=setInterval((()=>{B||nt(!0)}),h[pe.toLowerCase()])}),[pe,at,B,nt]);a.React.useEffect((()=>{if(!$e.current){if(Ge||!ge||B)return void at();it()}return()=>{at()}}),[ge,B,Ge,at,it]),a.React.useEffect((()=>{if(Xe.current!==Ge&&null!==Ge){if(Xe.current=Ge,Ge)return void at();ge&&!B&&it()}}),[Ge,it,at,ge,B]);const ot=(e,t)=>{Ce(e),Ne(t)},st=(e,t,n)=>{ot(null,null),je(e),Te(t),Re(n),Y(e,n||t)},lt=a.React.useMemo((()=>{if(!we)return null;const e=A(X,ee,ae),t=X/e*100+xe,n=e/X,i=function(e,t,n,a,i,o,s,l){const r=new Date(n),c=new Date(a),u=r.getFullYear(),d=c.getFullYear(),m=[],p=[],h={value:u,label:k(e,r,!0),position:0};I(i,o,0,s)&&(m.push(h),p.push(h));let g=function(e,t){let n=new Date(e).getFullYear(),a=null;for(;!a;)n%100%t==0&&(a=n),n++;return a}(n,e.year.value);g===u&&(g=u+e.year.value);for(let l=g;l<=d;l+=e.year.value){const r=new Date(l,0,1,0,0,0),c=(r.getTime()-n)/(a-n);if(!I(i,o,100*c,s))continue;let d=!1;const h=e.year.tickWidth*t/52;h>=1?d=!0:h<.03?d=l%50==0&&l-u>=49:h<.15?d=l%(10*e.year.value)==0&&l-u>=9:h<.3?d=l%(5*e.year.value)==0&&l-u>=4:h<1&&(d=l%2==0);const g=k(e,r);d=j(d,g,c,p,t);const f={value:l,label:d?g:null,position:100*c+"%"};d&&p.push(f),m.push(f)}return m}(we,e,y,w,xe,t,n),o=function(e,t,n,a,i,o,s){if(!e.month||e.month.tickWidth>1&&new Date(a).getMonth()===new Date(n).getMonth())return[];const l=new Date(n),r=new Date(a),c=l.getMonth()+1,u=r.getMonth()+1,d=l.getFullYear(),m=12-c+12*(r.getFullYear()-d-1)+u+1,p=[],h=[];let g=function(e,t){const n=new Date(e);n.setDate(1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0),e>n.getTime()&&n.setMonth(n.getMonth()+1);let a=n.getMonth(),i=null;for(;!i;)a%t!=0&&11!==a||(i=a),a++;return i+1}(n,e.month.value);g===c&&(g=c+e.month.value);let f=!1;for(let l=g-c;l<=m-1;l+=e.month.value){const r=new Date(d,c+l-1,1,0,0,0),u=(r.getTime()-n)/(a-n);if(!I(i,o,100*u,s))continue;if(!f||0===r.getMonth()){const t=new Date(r.getFullYear(),r.getMonth()-1,1,0,0,0),i=t.getTime()-n,o=Math.max(i,0)/(a-n);if(h.unshift({value:t.getFullYear(),label:k(e,t,!f),position:100*o+"%"}),f=!0,0===r.getMonth())continue}let m=!1;const g=e.month.tickWidth*t;e.year.tickWidth*t>58&&(m=g>=28||(g>=15?r.getMonth()%3==0:(r.getMonth()+1)%12==7));const v=T(e,r);m=j(m,v,u,h,t);const y={value:r.getMonth()+1,label:m?v:null,position:100*u+"%"};m&&h.push(y),p.push(y)}return p}(we,e,y,w,xe,t,n),s=function(e,t,n,a,i,o,s){if(!e.day)return[];const l=new Date(n),r=l.getDate(),c=l.getFullYear(),u=l.getMonth(),d=Math.ceil((a-n)/864e5)+1,m=[],p=[],h={value:r,label:T(e,l),position:0};p.push(h);let g=function(e,t){let n=new Date(e).getDate(),a=null;for(;!a;)(n-1)%t==0&&1!==n&&(a=n),n++;return a}(n,e.day.value);g===r&&(g=r+e.day.value);for(let l=g-r;l<=d-1;l+=e.day.value){const d=new Date(c,u,r+l,0,0,0),h=d.getDate();if(1===h)continue;const g=(d.getTime()-n)/(a-n);if(!I(i,o,100*g,s))continue;let f=!1;const v=e.day.tickWidth*t;e.month.tickWidth*t>100&&(v>=30?f=!0:v>=15?f=h%2==0:v>=8?f=(h-1)%7==0:v>=3&&(f=11===h||21===h));const y=D(d,e);f=j(f,y,g,p,t);const w={value:h,label:f?y:"",position:100*g+"%"};if(f&&p.push(w),m.push(w),M(d,h,e)){const e=new Date(d.getTime());e.setDate(1),e.setMonth(e.getMonth()+1),l+=(e.getTime()-d.getTime())/864e5-1}}return m}(we,e,y,w,xe,t,n),l=function(e,t,n,a,i,o,s){if(!e.hour)return[];const l=new Date(n),r=l.getHours(),c=l.getFullYear(),u=l.getMonth(),d=l.getDate(),m=Math.ceil((a-n)/36e5)+1,p=[],h=[],g={value:r,label:D(l,e),position:0};h.push(g);let f=function(e,t){let n=new Date(e).getHours(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.hour.value);f===r&&(f=r+e.hour.value);for(let l=f-r;l<=m-1;l+=e.hour.value){const m=new Date(c,u,d,r+l,0,0),g=m.getHours();if(0===g)continue;if(m.getTime()>a)break;const f=(m.getTime()-n)/(a-n);if(!I(i,o,100*f,s))continue;let v=!1;const y=e.day.tickWidth*t,w=e.hour.tickWidth*t;y<60?v=!1:y<100?v=g%12==0:w>=40?v=!0:w>=20?v=g%2==0:w>=6.67?v=g%6==0:w>=5?v=g%8==0:w>=3.3&&(v=g%12==0);const b=R(m);v=j(v,b,f,h,t);const x={value:g,label:v?b:"",position:100*f+"%"};v&&h.push(x),p.push(x)}return p}(we,e,y,w,xe,t,n),r=function(e,t,n,a,i,o,s){if(!e.minute)return[];const l=new Date(n),r=l.getMinutes(),c=l.getFullYear(),u=l.getMonth(),d=l.getDate(),m=l.getHours(),p=(a-n)/6e4+1,h=[],g=[],f={value:r,label:R(l),position:0};g.push(f);let v=function(e,t){let n=new Date(e).getMinutes(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.minute.value);v===r&&(v=r+e.minute.value);for(let l=v-r;l<=p-1;l+=e.minute.value){const p=new Date(c,u,d,m,r+l,0),f=p.getMinutes();if(0===p.getMinutes())continue;const v=(p.getTime()-n)/(a-n);if(!I(i,o,100*v,s))continue;let y=!1;const w=e.hour.tickWidth*t,b=e.minute.tickWidth*t;w<60?y=!1:w<=160?y=f%30==0:w<300?y=f%15==0:b>28?y=!0:b>20?y=f%2==0:w>15?y=f%5==0:w>10&&(y=f%10==0);const x=O(p,e);y=j(y,x,v,g,t);const S={value:p.getMinutes(),label:y?x:"",position:100*v+"%"};y&&g.push(S),h.push(S)}return h}(we,e,y,w,xe,t,n),c=function(e,t,n,a,i,o,s){if(!e.second)return[];const l=new Date(n),r=l.getSeconds(),c=l.getFullYear(),u=l.getMonth(),d=l.getDate(),m=l.getHours(),p=l.getMinutes(),h=(a-n)/1e3+1,g=[],f=[],v={value:r,label:O(l,e),position:0};f.push(v);let y=function(e,t){let n=new Date(e).getSeconds(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.second.value);y===r&&(y=r+e.second.value);for(let l=y-r;l<=h-1;l+=e.second.value){const h=new Date(c,u,d,m,p,r+l),v=h.getSeconds();if(0===h.getSeconds())continue;const y=(h.getTime()-n)/(a-n);if(!I(i,o,100*y,s))continue;let w=!1;const b=e.minute.tickWidth*t,x=e.second.tickWidth*t;b<60?w=!1:b<=160?w=v%30==0:b<300?w=v%15==0:x>28?w=!0:x>20?w=v%2==0:b>15?w=v%5==0:b>10&&(w=v%10==0);const S=h.getSeconds();w=j(w,S,y,f,t);const M={value:h.getSeconds(),label:w?S:"",position:100*y+"%"};w&&f.push(M),g.push(M)}return g}(we,e,y,w,xe,t,n),u=function(e,t,n,a,i,o,s){const l={labels:{},ticks:{}},r=[];t.length>1&&r.push("year"),n.length>1&&r.push("month"),a.length>1&&r.push("day"),i.length>1&&r.push("hour"),o.length>1&&r.push("minute"),s.length>1&&r.push("second");const c=r[r.length-1],u=Object.keys(e).filter((t=>e[t]));if(1===r.length)u.forEach((e=>{l.ticks[e]="medium",l.labels[e]="short"}));else{if(2===r.length)l.ticks[c]="medium",u.forEach((e=>{e!==c&&(l.ticks[e]="long")}));else{const e=r[r.length-2];l.ticks[c]="short",l.ticks[e]="medium",u.forEach((t=>{t!==c&&t!==e&&(l.ticks[t]="long")}))}l.labels=l.ticks}return l}(we,i,o,s,l,r,c),d=["year","month","day","hour","minute","second"];return(0,a.jsx)("div",{className:"timeline-ticks"},[i,o,s,l,r,c].map(((e,t)=>e.map(((e,n)=>{const i=e.position,o=d[t];return(0,a.jsx)("div",{key:`item-${t}-${n}`,className:"timeline-tick-container","data-unit":o,style:{left:i}},e.label&&(0,a.jsx)("div",{className:`timeline-tick_label ${u.labels[o]}-label ${"year"===o&&0===n&&0===xe?"timeline-first_label":""}`},e.label),(0,a.jsx)("div",{key:n,className:(0,a.classNames)(`timeline-tick ${u.ticks[o]}-tick`,e.label?"has-label":"no-label")}))})))))}),[we,ee,xe]),rt=a.React.useMemo((()=>function(e,t,n,i,o){const s=(0,a.getAppStore)().getState().appContext.isRTL;return n=(0,ce.getThemeColorValue)(n||e.colors.black,e),i=i||e.colors.white,o=(0,ce.getThemeColorValue)(o||e.colors.palette.primary[600]),a.css`
    color: red;
    height: fit-content;
    color: ${n};

    // Common style
    .timeline-header, .timeline-footer {
      height: 16px;
      display: flex;
      flex-direction: ${s?"row-reverse":"row"};
      align-items: center;
      justify-content: space-between;
      .zoom-container {
        min-width: 36px;
        display: flex;
        flex-direction: ${s?"row-reverse":"row"};
      }
      .range-label {
        display: flex;
        align-items: center;
        font-size: ${a.polished.rem(12)};
        font-weight: 500;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .range-label-badge {
          width: 8px;
          height: 8px;
          min-width: 8px;
          border-radius: 4px;
          margin-right: 0.25rem;
        }
      }
    }
    .timeline-content {
      overflow-x: hidden;

      .timeline-whole {
        .timeline-ticks {
          position: relative;
          .timeline-tick-container {
            position: absolute;
            user-select: none;
            .timeline-tick {
              width: 1px;
              background: ${a.polished.rgba(n,.5)};
            }
            .timeline-tick_label {
              font-size: ${a.polished.rem(11)};
              font-weight: 400;
              line-height: 15px;
              width: max-content;
              transform: translate(${s?"50%":"-50%"});
              color: foregroundColor;
              &.long-label {
                font-weight: 600;
              }
              &.medium-label {
                font-weight: 500;
              }
              &.short-label {
                font-weight: 400;
              }
              &.timeline-first_label {
                /* transform: ${"translate(-7px)"}; */
                transform: translate(0);
              }
            }
          }
        }
      }

      .timeline-range-container {
        height: 8px;
        /* width: ${"calc(100% - 14px)"}; */
        width: 100%;
        border-radius: 4px;
        background-color: ${a.polished.rgba(n,.2)};
        .resize-handlers {
          height: 100%;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          background-color: ${o};

          .resize-handler {
            width: 8px;
            height: 8px;
            padding: 0;
            overflow: visible;
            border-radius: 8px;
            background: ${o};
            border: 2px solid ${o};
          }

          &:hover {
            .resize-handler {
              background: ${i};
            }
          }
        }
      }
      .timeline-arrow {
        position: absolute;
        &.left-arrow{
          transform: scaleX(-1);
        }
      }
    }
    .jimu-btn {
        color: ${n};
        border-radius: 16px;
        &:hover:not(:disabled) {
          color: ${n};
          background-color: ${a.polished.rgba(n,.2)};
        }
        &.disabled {
          color: ${a.polished.rgba(n,.2)};
          &:hover {
            color: ${a.polished.rgba(n,.2)};
          }
        }
        .jimu-icon {
          margin: 0
        }

        .icon-btn-sizer {
          min-width: 0;
          min-height: 0;
        }
    }

    .jimu-dropdown-button {
      &:not(:disabled):not(.disabled):active,
      &[aria-expanded="true"]{
        border-color: transparent !important;
        color: unset !important;
      }
    }

    // Clasic style
    &.timeline-classic {
      padding: 1rem 1.5rem;
      .timeline-header .range-label {
        .range-label-badge {
          background-color: ${o};
        }
        .range-label-context {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .timeline-content {
        margin: 1rem 0.5rem;
        .timeline-whole {
          .timeline-ticks {
            padding-top: 0.75rem;
            .timeline-tick-container {
              .timeline-tick {
                &.long-tick {
                  height: 12px;
                  &.no-label {
                    margin-top: 19px;
                  }
                  &.has-label {
                    margin-top: 0;
                  }
                }
                &.medium-tick {
                  height: 8px;
                  &.no-label {
                    margin-top: 23px;
                  }
                  &.has-label {
                    margin-top: 8px;
                  }
                }
                &.short-tick {
                  height: 4px;
                  &.no-label {
                    margin-top: 27px;
                  }
                  &.has-label {
                    margin-top: 12px;
                  }
                }
              }
              .timeline-tick_label {
                margin-bottom: 4px;
              }
            }
          }
          .timeline-arrow {
            top: 78px;
            &.left-arrow{
              left: ${s?"unset":"20px"};
              right: ${s?"20px":"unset"};
            }
            &.right-arrow{
              left: ${s?"20px":"unset"};
              right: ${s?"unset":"20px"};
            }
          }
        }
        .timeline-range-container .resize-handlers .resize-handler {
          min-width: 8px;
          &:focus {
            background: ${i};
            outline-offset: 0;
          }
        }
      }
      .timeline-footer {
        flex-direction: ${s?"row-reverse":"row"};
        .play-container {
          min-width: 65px;
        }
      }
    }

    // Modern style
    &.timeline-modern {
      padding: 1rem 0.5rem;
      height: 156px;

      .timeline-header{
        padding-top: 0;
        padding-bottom: 0;
        padding: 0 36px;
        &.no-play-container {
          padding-left: ${s?"12px":"36px"};
          padding-right: ${s?"36px":"12px"};
        }
        .range-label {
          margin: 0 0.25rem;
          .range-label-badge {
            background-color: ${a.polished.rgba(o,.7)};
          }
        }
      }

      .timeline-content {
        display: flex;
        margin-top: 0.5rem;
          .timeline-left, .timeline-right {
            display: flex;
            height: 80px;
            .play-container {
              min-width: 17px; /* when play btn is hidden */
              display: flex;
              flex-direction: column;
              justify-content: center;
              .jimu-btn {
                margin: 0 0.5rem;
                &.next-btn {
                  margin-bottom: 0.5rem;
                }
                &.play-btn {
                  margin-top: 0.5rem;
                }
              }
            }
          }
        .timeline-middle {
          height: 115px;
          overflow-x: hidden;
          flex-grow: 1;
          .timeline-content-inside {
            border: 1px solid ${a.polished.rgba(n,.5)};
            border-radius: 8px;
            .timeline-whole {
              display: flex;
              flex-direction: column;
              .timeline-ticks {
                .timeline-tick-container {
                  display: flex;
                  flex-direction: column-reverse;
                  .timeline-tick {
                    &.long-tick {
                      height: 32px;
                    }
                    &.medium-tick {
                      height: 16px;
                      margin-top: 16px;
                    }
                    &.short-tick {
                      height: 8px;
                      margin-top: 24px;
                    }
                  }
                  .timeline-tick_label {
                    margin-top: 0.5rem;
                  }
                }
              }
              .timeline-range-container {
                z-index: 1;
                width: 100%;
                background: transparent;
                .resize-handlers {
                  background-color: ${a.polished.rgba(o,.7)};
                  .resize-handler {
                    min-width: 4px;
                    width: 4px;
                    height: calc(100% - 10px);
                    margin: 5px 0;
                    background: transparent;
                    border: none;
                    &.show-bg { /** When handlers.w = 0 */
                      background-color: ${a.polished.rgba(o,.7)};
                      height: 100%;
                      margin: 0;
                      &:hover {
                        background-color: ${a.polished.rgba(o,.9)};
                      }
                    }
                  }
                  &:hover {
                    .resize-handler {
                      background: ${a.polished.rgba(o,.7)};
                    }
                  }
                }
              }
            }
          }
          .timeline-arrow {
            z-index: 2;
            top: 68px;
            &.left-arrow{
              left: 50px;
              left: ${s?"unset":"50px"};
              right: ${s?"50px":"unset"};
            }
            &.right-arrow{
              right: 50px;
              left: ${s?"50px":"unset"};
              right: ${s?"unset":"50px"};
              &.no-play-container {
                left: ${s?"25px":"unset"};
                right: ${s?"unset":"25px"};
              }
            }
          }
        }
      }
    }
  `}(v,0,c,g,f)),[v,7,c,g,f]),ct=a.React.useMemo((()=>{const e=(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",disabled:0===ee,onClick:()=>{tt(!1),te(Math.max(0,ee-1))}},(0,a.jsx)(H,null)),t=(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",disabled:ee===(null==ae?void 0:ae.zoomLevel),onClick:()=>{tt(!0),te(Math.min(null==ae?void 0:ae.zoomLevel,ee+1))}},(0,a.jsx)(F,null));return(0,a.jsx)("div",{className:"zoom-container"},0===ee?e:(0,a.jsx)(o.Tooltip,{title:le("zoomOut"),placement:"bottom"},e),ee===(null==ae?void 0:ae.zoomLevel)?t:(0,a.jsx)(o.Tooltip,{title:le("zoomIn"),placement:"bottom"},t))}),[ee,le,ae,tt]),ut=a.React.useMemo((()=>V?(0,a.jsx)(o.Tooltip,{title:le(ge?"pause":"play"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"play-btn",onClick:()=>{fe(!ge)}},ge?(0,a.jsx)(K,null):(0,a.jsx)(q,null))):null),[V,ge,le]),dt=a.React.useMemo((()=>(0,a.jsx)(o.Tooltip,{title:le("previous"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",onClick:e=>{nt(!1)}},(0,a.jsx)(ne,null)))),[le,nt]),mt=a.React.useMemo((()=>(0,a.jsx)(o.Tooltip,{title:le("next"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"next-btn",onClick:e=>{nt(!0)}},(0,a.jsx)(oe,null)))),[le,nt]),pt=a.React.useMemo((()=>{const e=a.dateUtils.formatDateLocally(y,se,d,m),t=a.dateUtils.formatDateLocally(w,se,d,m);return(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",onClick:e=>{Be(!Ue)},ref:e=>{Fe.current=e}},(0,a.jsx)(G,null)),(0,a.jsx)(o.Popper,{open:Ue,keepMount:!0,showArrow:!0,reference:Fe,toggle:e=>{Be(!Ue),a.lodash.defer((()=>{Fe.current.focus()}))}},(0,a.jsx)("div",{className:"p-4"},(0,a.jsx)("h6",{className:"mb-2"},le("overallTimeExtent")),(0,a.jsx)("div",{className:"mb-4"},`${e} - ${t}`),(0,a.jsx)(o.Label,{check:!0,className:"d-flex align-items-center"},(0,a.jsx)("h6",{className:"flex-grow-1 mb-0 mr-1"},le("filteringApplied")),(0,a.jsx)(o.Switch,{checked:l,onChange:(e,t)=>{_(t)}})))))}),[le,y,w,se,Ue,l,_]),ht=a.React.useMemo((()=>(0,a.jsx)(o.Dropdown,{activeIcon:!0},(0,a.jsx)(o.Tooltip,{title:le("speed"),placement:"bottom"},(0,a.jsx)(o.DropdownButton,{icon:!0,type:"tertiary",arrow:!1,"aria-label":le("speed"),"a11y-description":me.filter((e=>e.value===pe))[0].label},(0,a.jsx)(re,null))),(0,a.jsx)(o.DropdownMenu,null,me.map((e=>(0,a.jsx)(o.DropdownItem,{key:e.value,value:e.value,active:e.value===pe,onClick:e=>{he(e.target.value)}},e.label)))))),[me,pe,le]),gt=a.hooks.useEventCallback((e=>{const t=w-y,n=z(X,ee,ae);let a=(y+xe/100*t+t/n*(e?1:-1)-y)/(w-y)*100;a=Math.max(0,a),a=Math.min(a,(n-1)/n*100),Se(a)})),ft=z(X,ee,ae),vt=(0,a.getAppStore)().getState().appContext.isRTL,yt=Oe||Me,wt=Ee||De||ke,{startPositionForStep:bt,widthForStep:xt}=((t,n)=>{let a=(t-y)/(w-y),i=(n-y)/(w-y)-a;return t===w?(a=r===e.Classic?"calc(100% - 16px)":"calc(100% - 8px)",i=0):a=100*a+"%",{startPositionForStep:a,widthForStep:i}})(yt,wt),St=a.dateUtils.formatDateLocally(yt,se,d,m),Mt=a.dateUtils.formatDateLocally(wt,se,d,m),jt=0!==xe,kt=100-xe-1/ft*100>1e-11;return(0,a.jsx)("div",{css:rt,dir:"ltr",className:(0,a.classNames)("timeline w-100",{"timeline-classic":r===e.Classic,"timeline-modern":r===e.Modern})},r===e.Classic?(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)("div",{className:"timeline-header"},(0,a.jsx)("div",{className:"range-label",dir:vt?"rtl":"ltr"},(0,a.jsx)("div",{className:"range-label-badge"}),(0,a.jsx)("div",{className:"range-label-context"},St+" - "+Mt)),ct),(0,a.jsx)("div",{className:"timeline-content"},(0,a.jsx)("div",{className:"timeline-content-inside"},(0,a.jsx)("div",{className:"timeline-whole",ref:e=>ve.current=e,style:{width:100*ft+"%",height:Q+"px",marginLeft:-xe*ft+"%"}},lt,jt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"timeline-arrow left-arrow",onClick:e=>gt(!1)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:ue})),kt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"timeline-arrow right-arrow",onClick:e=>gt(!0)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:ue}))),(0,a.jsx)("div",{className:"timeline-range-container",style:{width:100*ft+"%",marginLeft:-xe*ft+"%"}},(0,a.jsx)("div",{className:"resize-handlers",ref:e=>Pe.current=e,style:{marginLeft:bt,width:100*xt+"%"}},(0,a.jsx)("button",{className:"resize-handler resize-left",ref:e=>{We.current=e},title:St}),(0,a.jsx)("button",{className:"resize-handler resize-right",ref:e=>{Ve.current=e},title:Mt}))))),(0,a.jsx)("div",{className:"timeline-footer"},pt,(0,a.jsx)("div",{className:"play-container"},dt,ut,mt),V?ht:(0,a.jsx)("div",null))):(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)("div",{className:(0,a.classNames)("timeline-header",{"no-play-container":!V})},pt,(0,a.jsx)("div",{className:"range-label",dir:vt?"rtl":"ltr"},(0,a.jsx)("div",{className:"range-label-badge"}),St+" - "+Mt),ct),(0,a.jsx)("div",{className:"timeline-content"},(0,a.jsx)("div",{className:"timeline-left"},(0,a.jsx)("div",{className:"play-container"},mt,dt)),(0,a.jsx)("div",{className:"timeline-middle"},jt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:(0,a.classNames)("timeline-arrow left-arrow",{"no-play-container":!V}),onClick:e=>gt(!1)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:ue})),(0,a.jsx)("div",{className:"timeline-content-inside"},(0,a.jsx)("div",{className:"timeline-whole",ref:e=>ve.current=e,style:{width:100*ft+"%",height:Q+"px",marginLeft:-xe*ft+"%"}},(0,a.jsx)("div",{style:{height:Q-32+"px"}}),lt,(0,a.jsx)("div",{className:"timeline-range-container",style:{height:Q+"px",marginTop:-(Q-32)+"px"}},(0,a.jsx)("div",{className:"resize-handlers",ref:e=>Pe.current=e,style:{marginLeft:bt,width:100*xt+"%"}},(0,a.jsx)("button",{className:"resize-handler resize-left "+(yt===wt?"show-bg":""),ref:e=>{We.current=e},title:St}),(0,a.jsx)("button",{className:"resize-handler resize-right "+(yt===wt?"show-bg":""),ref:e=>{Ve.current=e},title:Mt}))))),kt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:(0,a.classNames)("timeline-arrow right-arrow",{"no-play-container":!V}),onClick:e=>gt(!0)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:ue}))),(0,a.jsx)("div",{className:"timeline-right"},(0,a.jsx)("div",{className:"play-container"},V&&ht,ut)))))};var pe=function(e,t,n,a){return new(n||(n=Promise))((function(i,o){function s(e){try{r(a.next(e))}catch(e){o(e)}}function l(e){try{r(a.throw(e))}catch(e){o(e)}}function r(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}r((a=a.apply(e,t||[])).next())}))};class he extends a.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.11.0",description:"",upgrader:e=>pe(this,void 0,void 0,(function*(){let t=e;if(!t.honorTimeSettings)if(t.timeSettings){const{stepLength:e,dividedCount:n}=t.timeSettings;t=e?t.setIn(["timeSettings","stepLength","val"],Math.round(e.val)):t.setIn(["timeSettings","dividedCount"],Math.round(n))}else t=t.set("honorTimeSettings",!0);return t}))},{version:"1.12.0",description:"",upgrader:e=>pe(this,void 0,void 0,(function*(){let n=e;return n=n.without("speed"),!n.honorTimeSettings&&n.timeSettings&&(n=n.setIn(["timeSettings","speed"],t.Medium)),n}))}]}}const ge=new he,fe=l(7586),ve="156px",ye=e=>{var s,l,r,c;const{useDataSources:u,theme:d,id:m,config:h,intl:v,autoWidth:x,autoHeight:S}=e,{enablePlayControl:M,autoPlay:j,timeSettings:k,honorTimeSettings:T,dataSourceType:D,timeStyle:R,foregroundColor:O,backgroundColor:C,sliderColor:E}=h,{speed:N}=k||{},[L,I]=a.React.useState(null),[z,A]=a.React.useState(!0),[P,V]=a.React.useState(N),[$,F]=a.React.useState(null),[U,B]=a.React.useState(null),[H,Y]=a.React.useState(null),[_,G]=a.React.useState(!0),[X,J]=a.React.useState(!0),[q,Q]=a.React.useState(null),[Z,K]=a.React.useState(null),ee=a.React.useRef(null),te=a.ReactRedux.useSelector((e=>{var t,n;return(null===(n=null===(t=e.appConfig.attributes)||void 0===t?void 0:t.timezone)||void 0===n?void 0:n.type)===a.TimezoneConfig.Data})),ne=a.React.useMemo((()=>i.MapViewManager.getInstance()),[]),ae=a.React.useMemo((()=>a.DataSourceManager.getInstance()),[]),ie=a.React.useMemo((()=>{const e=Object.keys(H||{}).sort(),t=(u||(0,a.Immutable)([])).map((e=>e.mainDataSourceId)).asMutable({deep:!0});return a.utils.diffArrays(!0,e,t).isEqual}),[H,u]);a.React.useEffect((()=>{var e;return Q(null===(e=ee.current)||void 0===e?void 0:e.clientWidth),(0,i.loadArcGISJSAPIModules)(["esri/core/reactiveUtils"]).then((e=>{B(e[0])})),()=>{oe(null,null,!0)}}),[]),a.React.useEffect((()=>{if(Y(null),D!==a.DataSourceTypes.FeatureLayer){let e=null;if((null==u?void 0:u.length)>0){e=[];const t=[];u.forEach((e=>{t.push(ae.createDataSourceByUseDataSource((0,a.Immutable)(e)).then((e=>e.isDataSourceSet&&!e.areChildDataSourcesCreated()?e.childDataSourcesReady().then((()=>e)):e)))})),Promise.all(t).then((t=>{const n={};t.forEach((e=>{n[e.id]=e})),t.forEach((t=>{t.getAllChildDataSources().forEach((t=>{var n,i;t.type===a.DataSourceTypes.FeatureLayer&&t.supportTime()&&e.push({dataSourceId:t.id,mainDataSourceId:null===(n=t.getMainDataSource())||void 0===n?void 0:n.id,dataViewId:t.dataViewId,rootDataSourceId:null===(i=t.getRootDataSource())||void 0===i?void 0:i.id})}))})),Y(n),F((0,a.Immutable)(e))})).catch((e=>{}))}}else F(u)}),[u,ae,D,F,Y]),a.React.useEffect((()=>{if(H&&U&&ie)if(T){const e=function(e,t=!1){var a,o,s;let l=null;const r=e[Object.keys(e).filter((t=>e[t].type===i.ArcGISDataSourceTypes.WebMap))[0]],c=null===(s=null===(o=null===(a=null==r?void 0:r.getItemData())||void 0===a?void 0:a.widgets)||void 0===o?void 0:o.timeSlider)||void 0===s?void 0:s.properties;if(c){const{startTime:e,endTime:a,timeStopInterval:i,numberOfStops:o,thumbMovingRate:s,thumbCount:r}=c;let u=e,d=a;if(t){const t=w(e,a,!0);u=t.startTime,d=t.endTime}if(l={speed:g(s),layerList:null,startTime:{value:u},endTime:{value:d},timeDisplayStrategy:2===r?n.current:n.cumulatively},i){const e=function(e){switch(e){case"esriTimeUnitsMonths":return"month";case"esriTimeUnitsDays":return"day";case"esriTimeUnitsHours":return"hour";case"esriTimeUnitsMinutes":return"minute";default:return"year"}}(i.units);l.accuracy=e,l.stepLength={val:i.interval,unit:e}}else if(o){l.dividedCount=o;const e=b(u,d);l.accuracy=e[0];const t=(d-u)/o;e.some((e=>t>=1e3*p[e]&&(l.accuracy=e,!0)))}}return l}(H,!0);V(null==e?void 0:e.speed),K(e)}else{const e=function(e,n,i=!1){const{startTime:o,endTime:s,layerList:l,accuracy:r,stepLength:c}=e||{};let u;const{startTime:d,endTime:m}=function(e,t,n,a){let i=f(n),o=f(a,!1),s=null,l=null;if(!i||!o){const n=y(e,t);n&&(e=n),Object.keys(e).forEach((t=>{var n,a;const r=e[t].getTimeInfo();if(!i){const e=null===(n=null==r?void 0:r.timeExtent)||void 0===n?void 0:n[0];s=s?Math.min(s,e):e}if(!o){const e=null===(a=null==r?void 0:r.timeExtent)||void 0===a?void 0:a[1];l=l?Math.max(l,e):e}})),i=i||s,o=o||l}return w(i,o,!0)}(n,l,o,s),h=b(d,m),g=h[0],v=function(e,t,n){const a=(t-e)/1e3/p[n];return{val:a>10?10:a>5?5:1,unit:n}}(d,m,g);if(e){u=(0,a.Immutable)(e);const t=!h.includes(r);t&&(u=u.set("accuracy",g)),c&&(t||p[c.unit]>p[g]||1e3*p[c.unit]*c.val>m-d)&&(u=u.set("stepLength",v))}else u=(0,a.Immutable)(function(e,n){return{layerList:null,startTime:{value:a.dateUtils.VirtualDateType.Min},endTime:{value:a.dateUtils.VirtualDateType.Max},timeDisplayStrategy:"CURRENT",dividedCount:null,accuracy:e,stepLength:n,speed:t.Medium}}(g,v));return i?(u=u.set("startTime",{value:d}).set("endTime",{value:m}),u):(0,a.Immutable)({config:u,exactStartTime:d,exactEndTime:m,minAccuracy:g,accuracyList:h})}(k,H,!0);V(N),K(e)}}),[H,U,T,N,k,ie]);const oe=a.hooks.useEventCallback(((e,t,n=!1)=>{var i;if(!H)return;const o={time:n?null:[e,t]};if(!n){const n=w(e,t);o.time=[n.startTime,n.endTime]}if(n||(()=>{let e=[],t=null;const n=ne.getAllJimuMapViewIds();D===a.AllDataSourceTypes.WebMap?(t=H[Object.keys(H)[0]],e=t.getAllChildDataSources().map((e=>e.id))):e=Object.keys(H);const i=[];e.forEach((e=>{const o=t||H[e].getRootDataSource();if((null==o?void 0:o.type)===a.AllDataSourceTypes.WebMap){const t=n.filter((e=>ne.getJimuMapViewById(e).dataSourceId===o.id));t.forEach((t=>{const n=((e,t)=>{let n=null;return Object.keys(e.jimuLayerViews).forEach((a=>{e.jimuLayerViews[a].layerDataSourceId===t&&(n=e.jimuLayerViews[a])})),n})(ne.getJimuMapViewById(t),e);(null==n?void 0:n.view)&&i.push(U.whenOnce((()=>!n.view.updating)))}))}})),Promise.all(i).then((e=>{G(!1)}))})(),D===a.AllDataSourceTypes.WebMap){const e=y(H,null===(i=h.timeSettings)||void 0===i?void 0:i.layerList);Object.keys(e).forEach((t=>{se(e[t],o,m)}))}else Object.keys(H).forEach((e=>{se(H[e],o,m)}))}));a.React.useEffect((()=>{L&&oe(L[0],L[1],!z)}),[L,z,oe]);const se=(e,t,n)=>{var i,o,s,l;e.type===a.DataSourceTypes.MapService?(null===(i=e.supportTime)||void 0===i?void 0:i.call(e))&&(t=le(e,t),null===(o=e.changeTimeExtent)||void 0===o||o.call(e,t.time,n)):e.type===a.DataSourceTypes.FeatureLayer&&(null===(s=e.supportTime)||void 0===s?void 0:s.call(e))&&(t=le(e,t),null===(l=e.updateQueryParams)||void 0===l||l.call(e,t,n))},le=(e,t)=>{const n=e.getTimeInfo().exportOptions||{},{TimeOffset:a=0,timeOffsetUnits:i}=n;if((null==t?void 0:t.time)&&0!==a){let e=t.time[0],n=t.time[1];const o=new Date(e),s=new Date(n);switch(i){case"esriTimeUnitsCenturies":case"esriTimeUnitsDecades":case"esriTimeUnitsYears":const t="esriTimeUnitsCenturies"===i?100:"esriTimeUnitsDecades"===i?10:1;e=o.setFullYear(o.getFullYear()-a*t),n=s.setFullYear(s.getFullYear()-a*t);break;case"esriTimeUnitsMonths":e=o.setMonth(o.getMonth()-a),n=s.setMonth(s.getMonth()-a);break;case"esriTimeUnitsWeeks":case"esriTimeUnitsDays":const l="esriTimeUnitsWeeks"===i?7:1;e=o.setDate(o.getDate()-a*l),n=s.setDate(s.getDate()-a*l);break;case"esriTimeUnitsHours":e=o.setHours(o.getHours()-a),n=s.setHours(s.getHours()-a);break;case"esriTimeUnitsMinutes":e=o.setMinutes(o.getMinutes()-a),n=s.setMinutes(s.getMinutes()-a);break;case"esriTimeUnitsSeconds":e=o.setSeconds(o.getSeconds()-a),n=s.setSeconds(s.getSeconds()-a);break;case"esriTimeUnitsMilliseconds":e=o.setMilliseconds(o.getMilliseconds()-a),n=s.setMilliseconds(s.getMilliseconds()-a)}t.time=[e,n]}return t},re=t=>{var n,i,o,s;if(x){const{layoutId:l,layoutItemId:r}=e,c=(0,a.getAppStore)().getState(),u=null===(s=null===(o=null===(i=null===(n=null==c?void 0:c.appConfig)||void 0===n?void 0:n.layouts)||void 0===i?void 0:i[l])||void 0===o?void 0:o.content)||void 0===s?void 0:s[r];if(!u)return;const d=u.bbox.width;if(d.includes("px"))t=d;else{const e=`div.layout[data-layoutid=${l}]`,n=document.querySelector(e),{clientWidth:a=480}=n||{};t=a*parseInt(d.split("%")[0])/100}}Q(t)},ce=e=>v.formatMessage({id:e,defaultMessage:W[e]}),ue=H&&U&&null===Z,de=(null===(s=null==Z?void 0:Z.startTime)||void 0===s?void 0:s.value)>(null===(l=null==Z?void 0:Z.endTime)||void 0===l?void 0:l.value);if(u&&0!==u.length){if(ue||de||te){const e=ce("noTlFromHonoredMapWarning"),t=ce("invalidTimeSpanWarning"),n=ce("timezoneWarning");return(0,a.jsx)("div",{className:"placeholder-container w-100 h-100 position-relative"},(0,a.jsx)(o.WidgetPlaceholder,{icon:fe,widgetId:m,css:a.css`height: ${S?ve:"100%"};`,message:ce("_widgetLabel")}),(0,a.jsx)(o.Alert,{buttonType:"tertiary",form:"tooltip",size:"small",type:"warning",withIcon:!0,className:"position-absolute",style:{bottom:10,right:10,backgroundColor:"var(--warning-100)",border:"1px solid var(--warning-300)"},text:ue?e:te?n:t}))}return(0,a.jsx)("div",{className:"timeline-widget",css:a.css`
          width: ${x?q+"px":"unset"};
          height: ${S&&!H?ve:"unset"};
          background: ${C||d.colors.white};
        `,ref:e=>ee.current=e},(0,a.jsx)(a.ReactResizeDetector,{handleWidth:!0,onResize:re}),(null==$?void 0:$.length)>0&&(0,a.jsx)(a.MultipleDataSourceComponent,{useDataSources:$},((e,t)=>{if(D===a.DataSourceTypes.FeatureLayer){const n=Object.keys(t).filter((e=>{var n;return[a.DataSourceStatus.Created,a.DataSourceStatus.CreateError].includes(null===(n=t[e])||void 0===n?void 0:n.instanceStatus)})).length===u.length;!H&&n&&Object.keys(e).length===u.length&&setTimeout((()=>{Y(e)}),0)}const n=Object.keys(t).filter((e=>t[e]&&t[e].status!==a.DataSourceStatus.Loading)).length===Object.keys(t).length;return setTimeout((()=>{J(!n)}),0),null})),null!==H&&ie?Z&&q>=0&&(0,a.jsx)(me,{theme:d,width:q,updating:X||_,startTime:null===(r=Z.startTime)||void 0===r?void 0:r.value,endTime:null===(c=Z.endTime)||void 0===c?void 0:c.value,accuracy:Z.accuracy,stepLength:Z.stepLength,dividedCount:Z.dividedCount,cumulatively:Z.timeDisplayStrategy===n.cumulatively,timeStyle:R,foregroundColor:O,backgroundColor:C,sliderColor:E,enablePlayControl:M,speed:P,autoPlay:j,applied:z,onTimeChanged:(e,t)=>{I([e,t])},onApplyStateChanged:e=>{A(e)}}):(0,a.jsx)("div",{className:"jimu-secondary-loading",css:a.css`position: 'absolute';left: '50%';top: '50%';`}))}return(0,a.jsx)(o.WidgetPlaceholder,{icon:fe,widgetId:m,css:a.css`height: ${S?ve:"100%"};`,message:ce("_widgetLabel")})};ye.versionManager=ge;const we=ye;function be(e){l.p=e}})(),r})())}}}));