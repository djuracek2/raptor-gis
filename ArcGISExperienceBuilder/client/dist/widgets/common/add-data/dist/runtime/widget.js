System.register(["jimu-core","jimu-ui","jimu-core/data-source","jimu-ui/basic/item-selector","jimu-theme","jimu-core/react"],(function(e,t){var a={},o={},r={},n={},i={},s={};return{setters:[function(e){a.BaseVersionManager=e.BaseVersionManager,a.DataSourceManager=e.DataSourceManager,a.DataSourceStatus=e.DataSourceStatus,a.DataSourceTypes=e.DataSourceTypes,a.DataSourcesChangeMessage=e.DataSourcesChangeMessage,a.DataSourcesChangeType=e.DataSourcesChangeType,a.Immutable=e.Immutable,a.MessageManager=e.MessageManager,a.MutableStoreManager=e.MutableStoreManager,a.React=e.React,a.ReactRedux=e.ReactRedux,a.ServiceManager=e.ServiceManager,a.SupportedItemTypes=e.SupportedItemTypes,a.SupportedLayerServiceTypes=e.SupportedLayerServiceTypes,a.WidgetState=e.WidgetState,a.classNames=e.classNames,a.css=e.css,a.dataSourceUtils=e.dataSourceUtils,a.defaultMessages=e.defaultMessages,a.esri=e.esri,a.getAppStore=e.getAppStore,a.hooks=e.hooks,a.i18n=e.i18n,a.indexedDBUtils=e.indexedDBUtils,a.jsx=e.jsx,a.loadArcGISJSAPIModule=e.loadArcGISJSAPIModule,a.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules,a.polished=e.polished,a.requestUtils=e.requestUtils,a.uuidv1=e.uuidv1},function(e){o.Alert=e.Alert,o.Button=e.Button,o.DataActionList=e.DataActionList,o.DataActionListStyle=e.DataActionListStyle,o.Dropdown=e.Dropdown,o.DropdownButton=e.DropdownButton,o.DropdownItem=e.DropdownItem,o.DropdownMenu=e.DropdownMenu,o.Icon=e.Icon,o.Input=e.Input,o.Label=e.Label,o.Loading=e.Loading,o.LoadingType=e.LoadingType,o.MobilePanel=e.MobilePanel,o.PanelHeader=e.PanelHeader,o.Popper=e.Popper,o.Tab=e.Tab,o.Tabs=e.Tabs,o.TextInput=e.TextInput,o.UrlInput=e.UrlInput,o.defaultMessages=e.defaultMessages},function(e){r.DataSourceTypes=e.DataSourceTypes,r.dataSourceJsonCreator=e.dataSourceJsonCreator},function(e){n.ItemCategory=e.ItemCategory,n.ItemSelector=e.ItemSelector,n.ItemSelectorMode=e.ItemSelectorMode},function(e){i.useTheme=e.useTheme},function(e){s.useEffect=e.useEffect}],execute:function(){e((()=>{var e={73982:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M7.5 1.5a.5.5 0 0 1 1 0v2.8a.5.5 0 0 1-1 0zm6.028.874a.5.5 0 0 1 .062.705l-1.414 1.685a.5.5 0 1 1-.766-.643l1.414-1.685a.5.5 0 0 1 .704-.062m-10.352.062a.5.5 0 1 0-.766.643l1.414 1.685a.5.5 0 0 0 .766-.643zM6.244 10.6zH5.43zM.961 9.8h4.88c.211 0 .359.19.359.4a1.8 1.8 0 0 0 3.555.4h.814a2.6 2.6 0 0 1-5.139 0H.8v3.6h14.4v-3.6H9.755c.03-.129.045-.263.045-.4 0-.21.148-.4.358-.4h4.881l-2.267-3.4H3.228zm11.81-4.2a.8.8 0 0 1 .666.356l2.429 3.642a.8.8 0 0 1 .134.444V14.2a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1-.8-.8v-4.158a.8.8 0 0 1 .134-.444l2.429-3.642a.8.8 0 0 1 .665-.356z" clip-rule="evenodd"></path></svg>'},59788:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .538.538 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.538.538 0 0 1 0-.738" clip-rule="evenodd"></path></svg>'},96009:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M13.854 11.347a.486.486 0 0 1-.708 0L8 5.76l-5.146 5.587a.485.485 0 0 1-.708 0 .538.538 0 0 1 0-.738l5.5-5.956a.485.485 0 0 1 .708 0l5.5 5.956a.538.538 0 0 1 0 .738" clip-rule="evenodd"></path></svg>'},55339:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m8.745 8 6.1 6.1a.527.527 0 1 1-.745.746L8 8.746l-6.1 6.1a.527.527 0 1 1-.746-.746l6.1-6.1-6.1-6.1a.527.527 0 0 1 .746-.746l6.1 6.1 6.1-6.1a.527.527 0 0 1 .746.746z"></path></svg>'},59216:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M11.227 1.312c-.404-.404-1.045-.417-1.432-.03L2.49 8.587l-.48 2.674a.637.637 0 0 0 .73.73l2.673-.48 7.305-7.306c.387-.387.374-1.028-.03-1.431zm-8.114 9.575.32-1.781 4.991-4.992 1.462 1.462-4.992 4.991zm7.473-6.012 1.402-1.4-1.462-1.463-1.401 1.402z" clip-rule="evenodd"></path><path fill="#000" d="M1.5 14a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1z"></path></svg>'},34750:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5"></path></svg>'},54357:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M6 6.5a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0zM9.5 6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M11 0H5a1 1 0 0 0-1 1v2H.5a.5.5 0 0 0 0 1h1.6l.81 11.1a1 1 0 0 0 .995.9h8.19a1 1 0 0 0 .995-.9L13.9 4h1.6a.5.5 0 0 0 0-1H12V1a1 1 0 0 0-1-1m0 3V1H5v2zm1.895 1h-9.79l.8 11h8.19z" clip-rule="evenodd"></path></svg>'},13149:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxMyAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIG9wYWNpdHk9IjAuNiIgZD0iTTkuNCAwSDBWMTZIMTNWMy42TDkuNCAwWk0xMiAxNUgxVjFIOFY1SDEyVjE1Wk0xMiA0SDlWMUg5LjMxTDEyIDMuNjlWNFoiIGZpbGw9IiMwNzZGRTUiLz4NCjwvc3ZnPg0K"},44429:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIG9wYWNpdHk9IjAuOCI+DQo8cGF0aCBkPSJNMTUuMjkgMUgzVjIzSDIxVjYuNzA5TDE1LjI5IDFaTTIwIDIySDRWMkgxNFY4SDIwVjIyWk0yMCA3SDE1VjJIMTUuMkwyMCA2LjhWN1pNMTQgMTFIMTBWMTBIN1YxM0g4VjE3SDdWMjBIMTBWMTlIMTRWMjBIMTdWMTdIMTZWMTNIMTdWMTBIMTRWMTFaTTE2IDExVjEySDE1VjExSDE2Wk04IDExSDlWMTJIOFYxMVpNOSAxOUg4VjE4SDlWMTlaTTE2IDE5SDE1VjE4SDE2VjE5Wk0xNSAxN0gxNFYxOEgxMFYxN0g5VjEzSDEwVjEySDE0VjEzSDE1VjE3WiIgZmlsbD0iIzA3NkZFNSIvPg0KPC9nPg0KPC9zdmc+DQo="},76740:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjcuMDAwMSAxMy4wMThWOS42OTlMMTkuMzAwMSAySDUuMDAwMDdWMTMuMDE4SDIuMDE4MDdWMjcuOTgySDUuMDAwMDdWMzBIMjcuMDAwMVYyNy45ODJIMjkuOTgyMVYxMy4wMThIMjcuMDAwMVpNMTkuMDAwMSAzTDI2LjAwMDEgMTBIMTkuMDAwMVYzWk02LjAwMDA3IDNIMTguMDAwMVYxMUgyNi4wMDAxVjEzLjAxOEg2LjAwMDA3VjNaTTI2LjAwMDEgMjlINi4wMDAwN1YyNy45ODJIMjYuMDAwMVYyOVpNMjkuMDE4MSAyNy4wMThIMi45ODIwN1YxMy45ODJIMjkuMDE4MVYyNy4wMThaTTguODUwMDcgMjMuMjY4QzguMDIxOTEgMjIuNDcwMiA3LjY4OTEzIDIxLjI4NzQgNy45Nzk4MiAyMC4xNzQ5QzguMjcwNTEgMTkuMDYyMyA5LjEzOTM2IDE4LjE5MzQgMTAuMjUxOSAxNy45MDI4QzExLjM2NDUgMTcuNjEyMSAxMi41NDczIDE3Ljk0NDggMTMuMzQ1MSAxOC43NzNMMTIuNjM4MSAxOS40OEMxMi4wODg4IDE4LjkyMzQgMTEuMjgzMyAxOC43MDM4IDEwLjUyNzUgMTguOTA0NkM5Ljc3MTc2IDE5LjEwNTQgOS4xODE1MyAxOS42OTU4IDguOTgwOTcgMjAuNDUxN0M4Ljc4MDQgMjEuMjA3NSA5LjAwMDI2IDIyLjAxMjkgOS41NTcwNyAyMi41NjJDMTAuNDE4NyAyMy4zODU0IDExLjc3NTUgMjMuMzg1NCAxMi42MzcxIDIyLjU2MkwxMy4zNDUxIDIzLjI2OUMxMi43NDkyIDIzLjg2NTQgMTEuOTQwNyAyNC4yMDA1IDExLjA5NzYgMjQuMjAwNUMxMC4yNTQ1IDI0LjIwMDUgOS40NDU5NSAyMy44NjQ0IDguODUwMDcgMjMuMjY4Wk0yMi4wNDAxIDIzLjk4NEwxOS42NjYxIDE4SDIwLjc0MjFMMjIuNTEwMSAyMi40NTNMMjQuMzA0MSAxOEgyNS4zODIxTDIyLjk3MDEgMjMuOTg2TDIyLjA0MDEgMjMuOTg0Wk0xNy45NjYxIDIyLjQ2MUMxOC4wNTA4IDIyLjIzNzYgMTguMDM1OCAyMS45ODg3IDE3LjkyNTEgMjEuNzc3QzE3LjY4OTIgMjEuNDk0IDE3LjM0NjggMjEuMzIxNCAxNi45NzkxIDIxLjNDMTUuNjkwMSAyMS4xMDIgMTUuMDI2MSAyMC41MTYgMTUuMDA1MSAxOS41NTdDMTQuOTk2NCAxOS4xMDg2IDE1LjE2OTUgMTguNjc1NyAxNS40ODUxIDE4LjM1N0MxNS44MjUxIDE4LjAwMjkgMTYuMjk0MiAxNy44MDE5IDE2Ljc4NTEgMTcuOEMxNy41NzU1IDE3Ljc4MiAxOC4zMDk2IDE4LjIwNzMgMTguNjg3MSAxOC45MDJMMTcuODM2MSAxOS40MjhDMTcuNjQwOCAxOS4wMjk2IDE3LjIyOTQgMTguNzgzNiAxNi43ODYxIDE4LjhDMTYuNTY2OCAxOC44IDE2LjM1NzEgMTguODkgMTYuMjA2MSAxOS4wNDlDMTYuMDc3OCAxOS4xNzQyIDE2LjAwNTQgMTkuMzQ1OCAxNi4wMDUxIDE5LjUyNUMxNi4wMDkxIDE5LjczMSAxNi4wMTkxIDIwLjE0MSAxNy4xMzExIDIwLjMxMUMxNy43OTgyIDIwLjM1OTQgMTguNDA2NyAyMC43MSAxOC43ODMxIDIxLjI2M0MxOS4wNDc2IDIxLjcyOTggMTkuMDkzNiAyMi4yODkyIDE4LjkwOTEgMjIuNzkzQzE4LjU1ODIgMjMuNjMyNyAxNy43MTM0IDI0LjE1NzYgMTYuODA1MSAyNC4xQzE1LjkxMDMgMjQuMTM1OSAxNS4wNzQ4IDIzLjY1MzIgMTQuNjU5MSAyMi44NkwxNS41MjMxIDIyLjM1NUMxNS43NjE2IDIyLjgzODcgMTYuMjY2OCAyMy4xMzIzIDE2LjgwNTEgMjMuMUMxNy4yODcyIDIzLjE0ODcgMTcuNzQ5MSAyMi44OTM4IDE3Ljk2NTEgMjIuNDZMMTcuOTY2MSAyMi40NjFaTTQuNTAwMDcgMjMuNUM0LjUwMDA3IDIyLjk0NzcgNC45NDc3OCAyMi41IDUuNTAwMDcgMjIuNUM2LjA1MjM1IDIyLjUgNi41MDAwNyAyMi45NDc3IDYuNTAwMDcgMjMuNUM2LjUwMDA3IDI0LjA1MjMgNi4wNTIzNSAyNC41IDUuNTAwMDcgMjQuNUM0Ljk0ODI0IDI0LjQ5ODkgNC41MDExNyAyNC4wNTE4IDQuNTAwMDcgMjMuNVoiIGZpbGw9IiMwNzZGRTUiLz4NCjwvc3ZnPg0K"},93119:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxnIG9wYWNpdHk9IjAuOCI+DQo8cGF0aCBkPSJNMyAxOEgyVjExSDNWMTUuMjkzTDUuMjkzIDEzSDYuNzA3TDQuODUgMTQuODU3TDcuMDA2IDE4SDUuNzkzTDQuMTMxIDE1LjU3NkwzIDE2LjcwN1YxOFpNMTYgMTFWMThIMTdWMTFIMTZaTTggMTNWMThIOVYxNUM5IDE0LjczNDggOS4xMDUzNiAxNC40ODA0IDkuMjkyODkgMTQuMjkyOUM5LjQ4MDQzIDE0LjEwNTQgOS43MzQ3OCAxNCAxMCAxNEMxMC4yNjUyIDE0IDEwLjUxOTYgMTQuMTA1NCAxMC43MDcxIDE0LjI5MjlDMTAuODk0NiAxNC40ODA0IDExIDE0LjczNDggMTEgMTVWMThIMTJWMTVDMTIgMTQuNzM0OCAxMi4xMDU0IDE0LjQ4MDQgMTIuMjkyOSAxNC4yOTI5QzEyLjQ4MDQgMTQuMTA1NCAxMi43MzQ4IDE0IDEzIDE0QzEzLjI2NTIgMTQgMTMuNTE5NiAxNC4xMDU0IDEzLjcwNzEgMTQuMjkyOUMxMy44OTQ2IDE0LjQ4MDQgMTQgMTQuNzM0OCAxNCAxNVYxOEgxNVYxNUMxNS4wMDIxIDE0LjU5MjcgMTQuODc5MiAxNC4xOTQ1IDE0LjY0NzkgMTMuODU5MkMxNC40MTY2IDEzLjUyMzkgMTQuMDg4IDEzLjI2NzcgMTMuNzA2NSAxMy4xMjVDMTMuMzI1IDEyLjk4MjMgMTIuOTA4OCAxMi45NiAxMi41MTQzIDEzLjA2MTNDMTIuMTE5NyAxMy4xNjI1IDExLjc2NTcgMTMuMzgyMyAxMS41IDEzLjY5MUMxMS4xOTk3IDEzLjMzNzIgMTAuNzgzNiAxMy4xMDE1IDEwLjMyNTggMTMuMDI1OUM5Ljg2NzkzIDEyLjk1MDMgOS4zOTgxMSAxMy4wMzk2IDkgMTMuMjc4VjEzSDhaTTIxIDYuNzA5VjIzSDNWMTlINFYyMkgyMFY4SDE0VjJINFYxMEgzVjFIMTUuMjlMMjEgNi43MDlaTTIwIDYuOEwxNS4yIDJIMTVWN0gyMFY2LjhaIiBmaWxsPSIjMDc2RkU1Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="},48891:e=>{"use strict";e.exports=a},11840:e=>{"use strict";e.exports=r},51315:e=>{"use strict";e.exports=s},34796:e=>{"use strict";e.exports=i},30726:e=>{"use strict";e.exports=o},20878:e=>{"use strict";e.exports=n}},t={};function l(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,l),r.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var c={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(c),l.d(c,{__set_webpack_public_path__:()=>He,default:()=>Ye});var e=l(48891),t=l(30726),a=l(73982),o=l.n(a);const r=t=>{const a=window.SVG,{className:r}=t,n=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),i=(0,e.classNames)("jimu-icon jimu-icon-component",r);return a?e.React.createElement(a,Object.assign({className:i,src:o()},n)):e.React.createElement("svg",Object.assign({className:i},n))},n={_widgetLabel:"Add Data",urlType:"Type",arcgisUrl:"ArcGIS Server Web Service",csvUrl:"CSV Layer",geojsonUrl:"GeoJSON Layer",kmlUrl:"KML Layer",wfsUrl:"WFS OGC Web Service",wmsUrl:"WMS OGC Web Service",wmtsUrl:"WMTS OGC Web Service",dropOrBrowse:"Drop or browse",defaultPlaceholderText:"There is currently no added data.",dropOrBrowseToUpload:"Drop or browse to upload",upload:"Upload",notSupportedFileTypeError:"The file type of {fileName} is not supported.",failedToUploadError:"The file {fileName} cannot be successfully uploaded.",exceedMaxSizeError:"The file size exceeds the maximum limit.",exceedMaxRecordsError:"The number of records exceeds the maximum threshold.",cannotBeAddedError:"{layerName} cannot be added. Support for adding this type is not yet available.",supportedTypesHint:"Supported formats: Shapefile, CSV, KML, GeoJSON, GPX.",fileIsUploading:"{fileName} is uploading",clickToAddData:"Click to add data",sampleUrl:"Sample URL"};var i=l(11840),s=function(e,t,a,o){return new(a||(a=Promise))((function(r,n){function i(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}))};function d(t){return e.DataSourceManager.getInstance().getDataSource(t)}function u(t,a,o=!0){return s(this,void 0,void 0,(function*(){if(!t||0===t.length)return Promise.resolve([]);let r,n,i;if(t.some((e=>e.restLayer))){const t=yield(0,e.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/Graphic","esri/layers/support/Field"]);r=t[0],n=t[1],i=t[2]}const s=t.map((t=>{var a,o,s,l,c;return t.restLayer&&r&&n&&i?{id:t.dataSourceJson.id,dataSourceJson:(0,e.Immutable)(t.dataSourceJson),layer:new r({source:(null===(o=null===(a=t.restLayer.featureSet)||void 0===a?void 0:a.features)||void 0===o?void 0:o.map((e=>n.fromJSON(e))))||[],objectIdField:null===(s=t.restLayer.layerDefinition)||void 0===s?void 0:s.objectIdField,fields:null===(c=null===(l=t.restLayer.layerDefinition)||void 0===l?void 0:l.fields)||void 0===c?void 0:c.map((e=>i.fromJSON(e))),sourceJSON:t.restLayer.layerDefinition,title:t.dataSourceJson.label||t.dataSourceJson.sourceLabel})}:{id:t.dataSourceJson.id,dataSourceJson:(0,e.Immutable)(t.dataSourceJson)}}));return Promise.allSettled(s.map((t=>e.DataSourceManager.getInstance().createDataSource(t).then((e=>e.isDataSourceSet&&!e.areChildDataSourcesCreated()?e.childDataSourcesReady().then((()=>e)):e))))).then((e=>e.filter((e=>"fulfilled"===e.status)).map((e=>e.value)))).then((r=>{if(o&&r.length>0){const t=new e.DataSourcesChangeMessage(a,e.DataSourcesChangeType.Create,r);e.MessageManager.getInstance().publishMessage(t)}return r.length<t.length?Promise.reject("Failed to create some data source."):r}))}))}function p(t,a,o=!0){const r=t.map((e=>d(e))).filter((e=>!!e));if(o&&r.length>0){const t=new e.DataSourcesChangeMessage(a,e.DataSourcesChangeType.Remove,r);e.MessageManager.getInstance().publishMessage(t)}return Promise.resolve().then((()=>{t.forEach((t=>{e.MutableStoreManager.getInstance().updateStateValue("setFilter",t,null),e.DataSourceManager.getInstance().destroyDataSource(t)}))}))}function m(e){var t;e.stopPropagation(),e.preventDefault(),null===(t=e.nativeEvent)||void 0===t||t.stopImmediatePropagation()}function g(t){const a=e.React.useRef(),o=e.React.useRef();return Object.is(o.current,t)||(a.current=o.current,o.current=t),a.current}function M(e,t){return`add-data-${e}-${t}-${(new Date).getTime()}`}function x(e,t,a,o,r,n){var s,l,c;const d=((null==t?void 0:t.layers)||[]).concat((null==t?void 0:t.tables)||[]),u=`${(null===(s=d[0])||void 0===s?void 0:s.id)||0}`,p=`${e}/${u}`,m={id:a,type:i.DataSourceTypes.FeatureLayer,url:p,layerId:u,sourceLabel:o||(null===(l=d[0])||void 0===l?void 0:l.name),geometryType:null===(c=d[0])||void 0===c?void 0:c.geometryType};return r&&(m.itemId=r),n&&(m.portalUrl=n),m}var y=l(34750),v=l.n(y);const f=t=>{const a=window.SVG,{className:o}=t,r=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:n,src:v()},r)):e.React.createElement("svg",Object.assign({className:n},r))};var S=l(20878);var j=function(e,t,a,o){return new(a||(a=Promise))((function(r,n){function i(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}))};const{useMemo:h,useState:D}=e.React,{useSelector:I}=e.ReactRedux,N=(0,e.Immutable)([e.SupportedItemTypes.FeatureService,e.SupportedItemTypes.MapService,e.SupportedItemTypes.SceneService,e.SupportedItemTypes.FeatureCollection,e.SupportedItemTypes.ImageService,e.SupportedItemTypes.VectorTileService,e.SupportedItemTypes.CSV,e.SupportedItemTypes.GeoJSON,e.SupportedItemTypes.KML,e.SupportedItemTypes.WFS,e.SupportedItemTypes.WMS,e.SupportedItemTypes.WMTS,e.SupportedItemTypes.GroupLayer]),b=a=>{const{widgetId:o,multiDataOptions:r,portalUrl:s,nextOrder:l,onChange:c,itemCategoriesInfo:d}=a,u=I((e=>e.dataSourcesInfo)),[p,m]=D([]),g=h((()=>(0,e.Immutable)(r.filter((t=>{var a;return t.dataSourceJson.itemId&&(null===(a=null==u?void 0:u[t.dataSourceJson.id])||void 0===a?void 0:a.instanceStatus)===e.DataSourceStatus.NotCreated})).map((e=>e.dataSourceJson.itemId)).concat(p))),[r,u,p]),y=h((()=>(0,e.Immutable)(r.map((e=>e.dataSourceJson.itemId)).filter((e=>!g.some((t=>t===e)))))),[r,g]),v=(t=>{const a=(e=>new Map([[S.ItemCategory.MyContent,e("myContent")],[S.ItemCategory.MyGroup,e("myGroup")],[S.ItemCategory.MyOrganization,e("myOrganization")],[S.ItemCategory.Public,e("public")],[S.ItemCategory.LivingAtlas,e("livingAtlas")],[S.ItemCategory.Curated,e("curated")]]))(t);return e.React.useCallback((e=>{var t;const o=a.get(e.type);if(e.type!==S.ItemCategory.Curated)return o;const r=Number(null===(t=e.id.split("_"))||void 0===t?void 0:t.pop());return!r||r<2?o:`${o} ${r}`}),[a])})(e.hooks.useTranslation(t.defaultMessages,n)),f=h((()=>d?d.filter((e=>e.enabled)).map((e=>({id:e.id,type:e.type,customLabel:e.customLabel||v(e),curatedFilter:e.curatedFilter}))).asMutable():void 0),[v,d]);return(0,e.jsx)("div",{className:"data-item-search w-100 h-100",css:w},(0,e.jsx)(S.ItemSelector,{mode:S.ItemSelectorMode.Simple,itemType:N,portalUrl:s,isMultiple:!0,onSelect:(t,a)=>j(void 0,void 0,void 0,(function*(){m(p.concat(null==a?void 0:a.id));const t=yield function(t,a){var o,r,n,s;return j(this,void 0,void 0,(function*(){try{if(!a)return Promise.resolve(null);if(a.type===e.SupportedItemTypes.FeatureService&&e.dataSourceUtils.isSupportedWholeArcGISService(a.url)){const i=a.url.split("?")[0].replace(/^http:/,"https:").replace(/\/$/,""),l=yield e.ServiceManager.getInstance().fetchServiceInfo(i).then((e=>e.definition));if(1===((null==l?void 0:l.layers)||[]).concat((null==l?void 0:l.tables)||[]).length&&(1===(null===(o=null==l?void 0:l.layers)||void 0===o?void 0:o.length)&&(null===(n=null===(r=null==l?void 0:l.layers)||void 0===r?void 0:r[0])||void 0===n?void 0:n.type)===e.SupportedLayerServiceTypes.FeatureLayer||1===(null===(s=null==l?void 0:l.tables)||void 0===s?void 0:s.length)))return x(i,l,t,a.title,a.id,a.portalUrl)}return Promise.resolve(i.dataSourceJsonCreator.createDataSourceJsonByItemInfo(t,a,a.portalUrl).asMutable({deep:!0}))}catch(e){return console.error("Failed to create data source",e),Promise.resolve(null)}}))}(M(o,l),a);m(p.filter((e=>e!==(null==a?void 0:a.id)))),c(r.concat({dataSourceJson:t,order:l}).filter((e=>!!e.dataSourceJson)))})),onRemove:(e,t)=>{c(r.filter((e=>e.dataSourceJson.itemId!==t.id)))},selectedItems:y,loadingItems:g,itemCategoriesInfo:f,disableDetailPopper:!0,allowAllSceneService:!0,showItemTypeCategoryFilter:!0}))},w=e.css`
  position: relative;
`;var T,O=function(e,t,a,o){return new(a||(a=Promise))((function(r,n){function i(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}))};!function(e){e.NotSupportedType="addDataErrorNotSupported",e.FailedToFetch="invalidResourceItem",e.CannotBeAdded="cannotBeAddedError"}(T||(T={}));const{useState:A,useMemo:E,useRef:z}=e.React;var C;!function(e){e.ArcGISWebService="arcgisUrl",e.WMS="wmsUrl",e.WMTS="wmtsUrl",e.WFS="wfsUrl",e.KML="kmlUrl",e.CSV="csvUrl",e.GeoJSON="geojsonUrl"}(C||(C={}));const L={[C.ArcGISWebService]:"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",[C.WMS]:"https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?service=WMS&request=GetCapabilities",[C.WMTS]:"https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/45134/%7Blevel%7D/%7Brow%7D/%7Bcol%7D",[C.WFS]:"https://dservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/services/JapanPrefectures2018/WFSServer",[C.KML]:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month_age_animated.kml",[C.CSV]:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",[C.GeoJSON]:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"},k=["https"],U=a=>{const{widgetId:o,onChange:r,setErrorMsg:s,nextOrder:l,multiDataOptions:c}=a,d=e.hooks.useTranslation(e.defaultMessages,t.defaultMessages,n),[u,p]=A(C.ArcGISWebService),[m,g]=A({value:"",valid:!0}),[y,v]=A(!1),f=z(null),S=E((()=>{const e={};return Object.values(C).forEach((t=>{e[t]=d(t)})),e}),[d]),j=e=>{e.target.value!==u&&(p(e.target.value),g({value:"",valid:m.valid}))},h=t=>{const a=function(t,a){return!t||!a||(a!==C.ArcGISWebService?/^https:\/\//.test(t):e.dataSourceUtils.isSupportedArcGISService(t)||F(t))}(t,u);return{valid:a,msg:!a&&d("invalidUrlMessage")}};return(0,e.jsx)("div",{className:"data-url-input w-100 h-100 p-4",css:J},(0,e.jsx)("div",null,(0,e.jsx)("div",{className:"url-input-label"},d("urlType")),(0,e.jsx)(t.Dropdown,{className:"w-100"},(0,e.jsx)(t.DropdownButton,{size:"sm",className:"text-left","aria-label":d("urlType")},S[u]),(0,e.jsx)(t.DropdownMenu,null,Object.keys(S).map(((a,o)=>(0,e.jsx)(t.DropdownItem,{key:o,value:a,onClick:j},S[a])))))),(0,e.jsx)("div",{className:"mt-4"},(0,e.jsx)("div",{className:"url-input-label"},d("url")),(0,e.jsx)(t.UrlInput,{className:(0,e.classNames)({"with-error":!m.valid}),height:80,schemes:k,value:m.value,checkValidityOnChange:h,checkValidityOnAccept:h,onChange:e=>{g(e)},"aria-label":d("url")})),(0,e.jsx)("div",{className:"mt-4"},(0,e.jsx)(t.Button,{onClick:()=>O(void 0,void 0,void 0,(function*(){var t;const a=null==m?void 0:m.value;if(a)try{v(!0);const t=yield function(t,a,o){return O(this,void 0,void 0,(function*(){return a&&o?(a=a.replace(/^http:/,"https:"),Object.keys(P).some((e=>e===o))?{id:t,type:P[o],sourceLabel:a.split("?")[0].split("/").filter((e=>!!e)).reverse()[0],url:a}:o===C.ArcGISWebService?F(a=a.split("?")[0])?function(t,a){return O(this,void 0,void 0,(function*(){if(!t||!a)return Promise.reject(T.NotSupportedType);const o=t.match(/(?<portalUrl>.+)content\/items\/.+\/resources\/styles\/root.json/).groups.portalUrl,r=t.match(/.+\/content\/items\/(?<itemId>.+)\/resources\/styles\/root.json/).groups.itemId,n=yield e.requestUtils.requestWrapper(o,(t=>e.esri.restPortal.getItem(r,{portal:o,authentication:t})));return"Vector Tile Service"!==n.type?Promise.reject(T.NotSupportedType):{id:a,type:e.DataSourceTypes.VectorTileService,sourceLabel:n.title,url:t,itemId:r,portalUrl:o.replace("/sharing/rest/","")}}))}(a,t):function(t,a){var o,r,n,s;return O(this,void 0,void 0,(function*(){if(!t||!a)return Promise.reject(T.NotSupportedType);const l=yield e.ServiceManager.getInstance().fetchServiceInfo(t).then((e=>e.definition));return e.dataSourceUtils.isSupportedWholeArcGISService(t)&&i.dataSourceJsonCreator.getDataSourceTypeFromArcGISWholeServiceUrl(t)===e.DataSourceTypes.FeatureService&&1===((null==l?void 0:l.layers)||[]).concat((null==l?void 0:l.tables)||[]).length&&(1===(null===(o=null==l?void 0:l.layers)||void 0===o?void 0:o.length)&&(null===(n=null===(r=null==l?void 0:l.layers)||void 0===r?void 0:r[0])||void 0===n?void 0:n.type)===e.SupportedLayerServiceTypes.FeatureLayer||1===(null===(s=null==l?void 0:l.tables)||void 0===s?void 0:s.length))?x(t.split("?")[0].replace(/^http:/,"https:").replace(/\/$/,""),l,a):function(e,t,a){var o;const r=null===(o=i.dataSourceJsonCreator.createDataSourceJsonByLayerDefinition(e,a,t))||void 0===o?void 0:o.asMutable({deep:!0});if(r)return r;throw new Error(T.FailedToFetch)}(a,t,l)}))}(a,t):Promise.reject(T.NotSupportedType)):Promise.reject("Need URL.")}))}(M(o,l),a,u);if(f.current=t,t.type===e.DataSourceTypes.GroupLayer)throw new Error(T.CannotBeAdded);t&&r(c.concat({dataSourceJson:t,order:l}))}catch(e){e.message===T.NotSupportedType?s(d(T.NotSupportedType)):e.message===T.CannotBeAdded?s(d(T.CannotBeAdded,{layerName:null===(t=f.current)||void 0===t?void 0:t.sourceLabel})):s(d(T.FailedToFetch))}finally{f.current=null,v(!1)}})),type:"primary",disabled:!m.value||!m.valid,className:"px-4 w-100",title:d("add"),"aria-label":d("add")},d("add"))),(0,e.jsx)("div",{className:"mt-4"},(0,e.jsx)("div",{className:"url-input-label mb-1"},d("sampleUrl")),(0,e.jsx)("div",{className:"sample-url"},L[u])),y&&(0,e.jsx)("div",{className:"upload-loading-container"},(0,e.jsx)("div",{className:"upload-loading-content"},(0,e.jsx)(t.Loading,{className:"upload-loading",type:t.LoadingType.Primary,width:30,height:28}))))};function F(e){return!(!e||!/^https:\/\//.test(e))&&/\/content\/items\/.+\/resources\/styles\/root.json/.test(e)}const P={[C.CSV]:e.DataSourceTypes.CSV,[C.GeoJSON]:e.DataSourceTypes.GeoJSON,[C.KML]:e.DataSourceTypes.KML,[C.WFS]:e.DataSourceTypes.WFS,[C.WMS]:e.DataSourceTypes.WMS,[C.WMTS]:e.DataSourceTypes.WMTS},J=e.css`
  position: relative;
  overflow: auto;

  .upload-loading-container {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .upload-loading-content {
    position: absolute;
    top: 0;
    bottom: 60px;
    right: 0;
    left: 0;
  }
  .upload-loading {
    .donut-loading {
      background-color: var(--white);
    }
  }

  .sample-url {
    font-style: italic;
    font-weight: 400;
    font-size: 13px;
    word-break: break-all;
  }

  .url-input.with-error {
    margin-bottom: 60px;
  }
  .url-input-label {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--dark-800);
  }
`;var W,R=l(34796),V=function(e,t,a,o){return new(a||(a=Promise))((function(r,n){function i(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}))};!function(e){e.CSV="csv",e.GeoJson="geojson",e.Shapefile="shapefile",e.KML="kml",e.GPX="gpx"}(W||(W={}));const B={[W.CSV]:10485760,[W.GeoJson]:10485760,[W.Shapefile]:2097152,[W.KML]:10485760,[W.GPX]:10485760};var Q;!function(e){e.NotSupportedType="notSupportedFileTypeError",e.FailedToUpload="failedToUploadError",e.ExceedMaxSize="exceedMaxSizeError",e.ExceedMaxRecords="exceedMaxRecordsError"}(Q||(Q={}));const{useState:G,useEffect:Y,useMemo:Z,useRef:H}=e.React,$=/iPad|iPhone|iPod/.test(window.navigator.userAgent)?void 0:Object.values(W).map((e=>q(e))).join(","),_=a=>{var o,r;const{onChange:i,setErrorMsg:s,nextOrder:c,portalUrl:d,widgetId:u,multiDataOptions:p}=a,g=e.hooks.useTranslation(e.defaultMessages,n),x=Z((()=>`${u}-drag-to-upload`),[u]),y=Z((()=>`${u}-click-to-upload`),[u]),[v,S]=G(!1),j=H(null),h=H([]);Y((()=>{i(p)}),[p,i]);const D=H(),I=t=>V(void 0,void 0,void 0,(function*(){var a,o,r,n,l,m,x;if(t.target.files)try{S(!0);const o=function(t){const a=function(e){return Object.values(W).find((t=>null==e?void 0:e.endsWith(q(t))))}(t.name),o=t.name.replace(`.${a}`,""),r=new FormData;return r.set("file",t),r.set("filetype",a),r.set("f","json"),{id:(0,e.uuidv1)(),type:a,name:o,data:r,size:t.size}}(t.target.files[0]);if(j.current=o,!o.type)throw new Error(Q.NotSupportedType);if(o.size>B[o.type])throw new Error(Q.ExceedMaxSize);const r=yield function(t,a){var o,r,n,i,s,l,c,d,u;return V(this,void 0,void 0,(function*(){const p=yield(0,e.loadArcGISJSAPIModule)("esri/request");if(t.type===W.KML){const a=function(){var t,a,o;if(null===(a=null===(t=(0,e.getAppStore)().getState())||void 0===t?void 0:t.portalSelf)||void 0===a?void 0:a.isPortal)return`${null===(o=(0,e.getAppStore)().getState())||void 0===o?void 0:o.portalUrl}/sharing/kml`;const r=window.jimuConfig.hostEnv;return`https://utility${"dev"===r?"devext":"qa"===r?"qa":""}.arcgis.com/sharing/kml`}(),r=yield function(e){return new Promise((t=>{const a=new FileReader;a.onload=e=>{t(e.target.result)},a.readAsText(e.data.get("file"))}))}(t),n=yield p(a,{query:{kmlString:encodeURIComponent(r),model:"simple",folders:""},responseType:"json"});return null===(o=null==n?void 0:n.data)||void 0===o?void 0:o.featureCollection}let m={};if(t.type!==W.GPX){const o=`${a}/sharing/rest/content/features/analyze`;t.data.set("analyzeParameters",JSON.stringify({enableGlobalGeocoding:!0,sourceLocale:null!==(n=null===(r=(0,e.getAppStore)().getState().appContext)||void 0===r?void 0:r.locale)&&void 0!==n?n:"en"}));const s=yield p(o,{body:t.data,method:"post"});t.data.delete("analyzeParameters"),m=null===(i=null==s?void 0:s.data)||void 0===i?void 0:i.publishParameters}const g=`${a}/sharing/rest/content/features/generate`;t.data.set("publishParameters",JSON.stringify(Object.assign(Object.assign({},m),{name:t.name})));const M=yield p(g,{body:t.data,method:"post"});return t.data.delete("publishParameters"),(null===(s=null==M?void 0:M.data)||void 0===s?void 0:s.featureCollection)&&(null===(d=null===(c=null===(l=null==M?void 0:M.data)||void 0===l?void 0:l.featureCollection)||void 0===c?void 0:c.layers)||void 0===d||d.forEach((e=>{var t,a;null===(a=null===(t=e.featureSet)||void 0===t?void 0:t.features)||void 0===a||a.forEach((t=>{var a,o;null===(o=null===(a=e.layerDefinition)||void 0===a?void 0:a.fields)||void 0===o||o.forEach((e=>{var a;const o=null===(a=t.attributes)||void 0===a?void 0:a[e.name];if("esriFieldTypeSmallInteger"===e.type){if("boolean"==typeof o)return void(t.attributes[e.name]=o?1:0);"number"!=typeof o&&(t.attributes[e.name]=null)}}))}))}))),null===(u=null==M?void 0:M.data)||void 0===u?void 0:u.featureCollection}))}(o,d);if(h.current.some((e=>e.id===o.id)))return void(h.current=h.current.filter((e=>e.id!==o.id)));(null===(a=null==r?void 0:r.layers)||void 0===a?void 0:a.length)>0&&i(p.concat(r.layers.map(((t,a)=>{var r;return{dataSourceJson:{id:M(u,c+a),type:e.DataSourceTypes.FeatureLayer,sourceLabel:(null===(r=t.layerDefinition)||void 0===r?void 0:r.name)||(0===a?o.name:`${o.name} ${a}`)},order:c+a,restLayer:t}}))))}catch(e){e.message===Q.NotSupportedType?s(g(Q.NotSupportedType,{fileName:null===(o=j.current)||void 0===o?void 0:o.name})):e.message===Q.ExceedMaxSize||(null===(l=null===(n=null===(r=e.details)||void 0===r?void 0:r.messages)||void 0===n?void 0:n[0])||void 0===l?void 0:l.includes("max size"))?s(g(Q.ExceedMaxSize)):e.message===Q.ExceedMaxRecords||(null===(m=e.message)||void 0===m?void 0:m.includes("maximum number"))?s(g(Q.ExceedMaxRecords)):s(g(Q.FailedToUpload,{fileName:null===(x=j.current)||void 0===x?void 0:x.name}))}finally{S(!1),j.current=null,t.target.value=null,D.current&&D.current.focus()}})),[N,b]=G(!1),w=(0,R.useTheme)();return(0,e.jsx)("div",{className:"data-file-upload w-100 h-100 pb-4 pt-6 px-4",css:K},(0,e.jsx)("div",{className:"supported-type-icons d-flex justify-content-around align-items-center px-6 mb-4"},(0,e.jsx)(t.Icon,{width:13,height:16,icon:l(13149)}),(0,e.jsx)(t.Icon,{width:24,height:24,icon:l(44429)}),(0,e.jsx)(t.Icon,{width:32,height:32,icon:l(76740)}),(0,e.jsx)(t.Icon,{width:24,height:24,icon:l(93119)}),(0,e.jsx)(t.Icon,{width:13,height:16,icon:l(13149)})),(0,e.jsx)("div",{className:"supported-types"},g("supportedTypesHint")),(0,e.jsx)("div",{className:"mt-4 drag-area-container"},(0,e.jsx)(t.Label,{for:x,className:"drag-area text-center"},(0,e.jsx)("div",{className:"font-14"},g("dropOrBrowseToUpload")),(0,e.jsx)("div",{className:"upload-btn-container w-75",title:g("upload")},(0,e.jsx)(t.Label,{for:y,className:"upload-btn text-center mt-4 mb-0 text-truncate",css:N?e.css`outline: ${e.polished.rem(2)} solid ${w.colors.palette.primary[700]}`:""},(0,e.jsx)(f,{size:15,className:"mr-2"}),(0,e.jsx)("span",null,g("upload"))),(0,e.jsx)(t.Input,{id:y,title:"",className:"upload-btn-file-input",type:"file",accept:$,onChange:I,tabIndex:v?-1:0,ref:D,onFocus:()=>{b(!0)},onBlur:()=>{b(!1)}}))),(0,e.jsx)(t.Input,{id:x,onClick:m,title:"",className:"drag-area-file-input",type:"file",accept:$,onChange:I,tabIndex:-1})),v&&(0,e.jsx)("div",{className:"upload-loading-container",title:g("fileIsUploading",{fileName:null===(o=j.current)||void 0===o?void 0:o.name})},(0,e.jsx)("div",{className:"upload-loading-content"},(0,e.jsx)(t.Loading,{className:"upload-loading",type:t.LoadingType.Primary,width:30,height:28}),(0,e.jsx)("div",{className:"upload-loading-file-name d-flex justify-content-center align-items-center"},(0,e.jsx)("div",{className:"w-100 font-14 text-center"},g("fileIsUploading",{fileName:(0,e.jsx)("div",{className:"w-100 multiple-lines-truncate font-16"},null===(r=j.current)||void 0===r?void 0:r.name)}))),(0,e.jsx)("div",{className:"upload-loading-btn d-flex justify-content-center"},(0,e.jsx)(t.Button,{type:"danger",onClick:()=>{h.current.push(j.current),j.current=null,S(!1)}},g("cancel"))))))};function q(e){return"shapefile"===e?".zip":`.${e}`}const K=e.css`
  position: relative;
  color: var(--dark-500);

  .font-14 {
    font-size: 14px;
  }

  .font-16 {
    font-size: 16px;
    font-weight: 500;
  }

  .upload-loading-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--white);
    z-index: 2;
  }
  .upload-loading-content {
    position: absolute;
    top: 0;
    bottom: 60px;
    right: 0;
    left: 0;
  }
  .upload-loading-file-name {
    position: absolute;
    width: 200px;
    height: 100px;
    right: calc(50% - 100px);
    top: 80px;
    word-break: break-all;
    overflow: hidden;
  }
  .upload-loading-btn {
    position: absolute;
    width: 200px;
    height: 32px;
    right: calc(50% - 100px);
    top: calc(50% + 80px);
    button.btn-danger {
      background-color: var(--danger-500);
      border: 0;
    }
  }

  .supported-types {
    font-size: 13px;
  }

  .drag-area-container {
    width: 100%;
    height: 280px;
  }
  .drag-area {
    border: 1px dashed var(--light-400);
    padding-top: 50%;
    width: 100%;
    height: 100%;
    user-select: none;
  }
  .upload-btn {
    border: 1px solid var(--light-400);
    color: var(--dark-800);
    background-color: var(--white);
    border-radius: 2px;
    line-height: 28px;
    padding-left: 16px;
    padding-right: 16px;
    height: 30px;
    user-select: none;
    max-width: 100%;
  }
  .upload-btn-container:hover {
    .upload-btn {
      background-color: var(--light-200) !important;
    }
  }
  .drag-area-container, .upload-btn-container {
    position: relative;
    display: inline-block;
    z-index: 1;
  }
  .upload-btn-file-input, .drag-area-file-input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
  .upload-btn-file-input {
    cursor: pointer;
  }

`;var X=l(59788),ee=l.n(X);const te=t=>{const a=window.SVG,{className:o}=t,r=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:n,src:ee()},r)):e.React.createElement("svg",Object.assign({className:n},r))};var ae=l(96009),oe=l.n(ae);const re=t=>{const a=window.SVG,{className:o}=t,r=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:n,src:oe()},r)):e.React.createElement("svg",Object.assign({className:n},r))};var ne=l(55339),ie=l.n(ne);const se=t=>{const a=window.SVG,{className:o}=t,r=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:n,src:ie()},r)):e.React.createElement("svg",Object.assign({className:n},r))},{useState:le,useEffect:ce}=e.React,{useSelector:de}=e.ReactRedux,ue=a=>{const{multiDataOptions:o,widgetId:r,onFinish:n,onRemove:i,setErrorMsg:s}=a,l=e.hooks.useTranslation(t.defaultMessages),[c,d]=le(!1),[m,M]=le(!1),x=g(o);ce((()=>{p(((null==x?void 0:x.filter((e=>!o.some((t=>t.dataSourceJson.id===e.dataSourceJson.id)))))||[]).map((e=>e.dataSourceJson.id)),r,!1),M(!0),u(o.filter((e=>!(null==x?void 0:x.some((t=>e.dataSourceJson.id===t.dataSourceJson.id))))),r,!1).catch((e=>{s(l("dataSourceCreateError"))})).finally((()=>{M(!1)}))}),[r,o,x,s,l]);const y=()=>{n(o)};return(0,e.jsx)("div",{className:"data-collapse",css:me},o.length>0&&(0,e.jsx)("div",{className:"data-container surface-2 p-4"},(0,e.jsx)("div",{className:"d-flex justify-content-between align-items-center"},(0,e.jsx)("div",{className:"d-flex align-items-center n-selected",role:"group","aria-label":l("selected")},(0,e.jsx)("span",{className:"mr-2"},o.length),(0,e.jsx)("span",{className:"text-truncate",title:l("selected")},l("selected")),(0,e.jsx)(t.Button,{type:"tertiary",size:"sm",icon:!0,onClick:()=>{d(!c)},title:l(c?"down":"up"),"aria-label":l(c?"down":"up")},c?(0,e.jsx)(te,{size:"s"}):(0,e.jsx)(re,{size:"s"}))),(0,e.jsx)("div",{className:"small-done-btn"},!c&&(0,e.jsx)(t.Button,{onClick:y,disabled:m,type:"primary",className:"text-truncate w-100 px-2",title:l("done")},l("done")))),c&&(0,e.jsx)("div",{className:"data-items",role:"list"},o.map(((t,a)=>(0,e.jsx)(pe,{key:a,isLoading:m,onRemove:i,dsJson:(0,e.Immutable)(t.dataSourceJson)})))),c&&(0,e.jsx)("div",{className:"big-done-btn w-100"},(0,e.jsx)(t.Button,{onClick:y,disabled:m,type:"primary",className:"text-truncate w-100",title:l("done"),"aria-label":l("done")},l("done")))))};function pe({dsJson:a,isLoading:o,onRemove:r}){const n=e.hooks.useTranslation(t.defaultMessages),i=e.i18n.getIntl(),s=d(a.id),l=de((e=>{var t;return null===(t=e.dataSourcesInfo)||void 0===t?void 0:t[a.id]})),c=l?l.instanceStatus===e.DataSourceStatus.CreateError:!s&&!o,u=l?l.instanceStatus===e.DataSourceStatus.NotCreated:!s&&o;return(0,e.jsx)("div",{className:"d-flex align-items-center justify-content-between w-100 data-item",role:"listitem","aria-label":a.label||a.sourceLabel},(0,e.jsx)("div",{className:"d-flex align-items-center flex-grow-1 text-truncate",title:e.dataSourceUtils.getDsTypeString(null==a?void 0:a.type,i)},c&&(0,e.jsx)("div",{className:"d-flex justify-content-center align-items-center flex-shrink-0 data-error"},(0,e.jsx)(t.Alert,{className:"flex-shrink-0",css:e.css`padding-left: 0 !important; padding-right: 0 !important;`,buttonType:"tertiary",form:"tooltip",size:"small",type:"error",text:n("dataSourceCreateError")})),u&&(0,e.jsx)("div",{className:"d-flex justify-content-center align-items-center flex-shrink-0 data-loading"},(0,e.jsx)(t.Loading,{type:t.LoadingType.Donut,width:16,height:16})),!c&&!u&&(0,e.jsx)("div",{className:"d-flex justify-content-center align-items-center flex-shrink-0 data-thumbnail"},(0,e.jsx)(t.Icon,{icon:e.dataSourceUtils.getDsIcon(a),color:"#FFFFFF",size:"12"})),(0,e.jsx)("div",{className:"flex-grow-1 text-truncate pl-2 data-label",title:a.label||a.sourceLabel},a.label||a.sourceLabel)),(0,e.jsx)("div",{className:"d-flex align-items-center flex-shrink-0"},(0,e.jsx)(t.Button,{type:"tertiary",size:"sm",icon:!0,onClick:()=>{r(a.id)},title:n("remove"),"aria-label":n("remove")},(0,e.jsx)(se,{size:14,color:"var(--dark-800)"}))))}const me=e.css`
  .data-container {
    background-color: var(--white);
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.16) !important;
    border: 0 !important;
    z-index: 10;
    .n-selected {
      font-size: 14px;
      max-width: 130px;
    }
    .data-items {
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      .data-thumbnail {
        width:  26px;
        height:  26px;
        background-color: #0095DB;
      }
      .data-loading, .data-error {
        position: relative;
        width: 24px;
        height: 24px;
        border: 1px solid #0095DB;
      }
      .data-label {
        font-size: 13px;
        color: var(--dark-800);
      }
      .data-item {
        height: 26px;
        margin-bottom: 12px;
      }
    }
    .small-done-btn {
      max-width: 90px;
    }
  }
`;var ge=l(51315);const{useState:Me,useMemo:xe,useRef:ye}=e.React,ve=["search","url","file"],fe=a=>{const{portalUrl:o,widgetId:r,buttonSize:i,hiddenTabs:s,popperReference:l,nextOrder:c,onFinish:d,itemCategoriesInfo:u,hidePopper:p}=a,[m,g]=Me(!1),[M,x]=Me(null),[y,v]=Me([]),[S,j]=Me([]),[h,D]=Me([]),I=xe((()=>y.concat(S).concat(h).sort(((e,t)=>e.order-t.order))),[y,S,h]),N=xe((()=>I.length>0?Math.max(...I.map((e=>e.order)))+1:c),[I,c]),b=xe((()=>ve.filter((e=>!(null==s?void 0:s.some((t=>e===t)))))),[s]),w=e.hooks.useTranslation(t.defaultMessages,e.defaultMessages,n),T=ye(null),O=e.hooks.useCheckSmallBrowserSizeMode(),A=ye();(0,ge.useEffect)((()=>{M&&!T.current&&(T.current=setTimeout((()=>{x(null),T.current=null}),5e3))}),[M]);const E=e=>{y.some((t=>t.dataSourceJson.id===e))&&v(y.filter((t=>t.dataSourceJson.id!==e))),S.some((t=>t.dataSourceJson.id===e))&&j(S.filter((t=>t.dataSourceJson.id!==e))),h.some((t=>t.dataSourceJson.id===e))&&D(h.filter((t=>t.dataSourceJson.id!==e)))},z=e=>{d(e),C()},C=()=>{const e=!m;g(e),e||(v([]),j([]),D([]),A.current&&A.current.focus())};(0,ge.useEffect)((()=>{!O&&p&&m&&C()}),[p]);const L=()=>(0,e.jsx)(je,{mobile:O,errorMsg:M,translate:w,tabs:b,togglePopper:C,onFinish:z,onRemove:E,portalUrl:o,widgetId:r,nextOrder:N,multiDataOptions:I,multiDataOptionsFromSearch:y,multiDataOptionsFromUrl:S,multiDataOptionsFromFile:h,setErrorMsg:x,setMultiDataOptionsFromSearch:v,setMultiDataOptionsFromUrl:j,setMultiDataOptionsFromFile:D,itemCategoriesInfo:u});return(0,e.jsx)("div",{className:"add-data-popper",css:he},"lg"===i&&(0,e.jsx)(t.Button,{type:"primary",className:"flex-grow-1 text-center",onClick:C,"aria-label":w("clickToAddData"),ref:A,title:w("clickToAddData")},(0,e.jsx)("div",{className:"w-100 px-2 d-flex align-items-center justify-content-center"},(0,e.jsx)(f,{size:"m"}),(0,e.jsx)("div",{className:"text-truncate"},w("clickToAddData")))),"sm"===i&&(0,e.jsx)(t.Button,{type:"primary",className:"d-flex justify-content-center align-items-center small-add-btn",onClick:C,"aria-label":w("clickToAddData"),ref:A,title:w("clickToAddData")},(0,e.jsx)(f,{size:"m",className:"m-0"})),O?(0,e.jsx)(t.MobilePanel,{open:m,onClose:C,title:w("addData")},L()):(0,e.jsx)(t.Popper,{open:m,toggle:C,reference:l,placement:"right-start","aria-label":w("addData")},L()))},Se=({tab:t,portalUrl:a,widgetId:o,nextOrder:r,multiDataOptionsFromSearch:n,multiDataOptionsFromUrl:i,multiDataOptionsFromFile:s,setMultiDataOptionsFromSearch:l,setMultiDataOptionsFromUrl:c,setMultiDataOptionsFromFile:d,setErrorMsg:u,itemCategoriesInfo:p})=>"search"===t?(0,e.jsx)(b,{portalUrl:a,widgetId:o,onChange:l,nextOrder:r,multiDataOptions:n,itemCategoriesInfo:p}):"url"===t?(0,e.jsx)(U,{widgetId:o,onChange:c,nextOrder:r,multiDataOptions:i,setErrorMsg:u}):"file"===t?(0,e.jsx)(_,{portalUrl:a,widgetId:o,nextOrder:r,onChange:d,multiDataOptions:s,setErrorMsg:u}):void 0,je=({mobile:a,errorMsg:o,translate:r,tabs:n,togglePopper:i,onFinish:s,onRemove:l,portalUrl:c,widgetId:d,nextOrder:u,multiDataOptions:p,multiDataOptionsFromSearch:m,multiDataOptionsFromUrl:g,multiDataOptionsFromFile:M,setMultiDataOptionsFromSearch:x,setMultiDataOptionsFromUrl:y,setMultiDataOptionsFromFile:v,setErrorMsg:f,itemCategoriesInfo:S})=>(0,e.jsx)("div",{css:e.css`
    width: ${a?"100%":"240px"};
    height: ${a?"100%":"600px"};
    .add-data-popper-content {
      position: relative;
      height: ${p.length?a?"calc(100% - 64px)":"calc(100% - 120px)":a?"100%":"calc(100% - 56px)"};
    }
    .tab-content {
      overflow: hidden;
    }
    .jimu-nav {
      border-bottom: 1px solid var(--light-400);
    }
    .multiple-lines-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-word;
      word-wrap: break-word;
    }
    .item-selector-search {
      .text-input-prefix {
        svg {
          margin-left: 0 !important;
          color: var(--light-800) !important;
        }
      }
    }
  `},!a&&(0,e.jsx)(t.PanelHeader,{title:r("addData"),showClose:!0,onClose:i,level:1,className:"p-4"}),(0,e.jsx)("div",{className:"add-data-popper-content"},n.length>1&&(0,e.jsx)(t.Tabs,{type:"underline",className:"w-100 h-100",fill:!0,defaultValue:n[0]},n.map(((a,o)=>(0,e.jsx)(t.Tab,{key:o,id:a,title:r(a)},(0,e.jsx)(Se,{tab:a,portalUrl:c,widgetId:d,nextOrder:u,setErrorMsg:f,multiDataOptionsFromSearch:m,multiDataOptionsFromUrl:g,multiDataOptionsFromFile:M,setMultiDataOptionsFromSearch:x,setMultiDataOptionsFromUrl:y,setMultiDataOptionsFromFile:v,itemCategoriesInfo:S}))))),1===n.length&&(0,e.jsx)("div",{className:"w-100 h-100"},(0,e.jsx)(Se,{tab:n[0],portalUrl:c,widgetId:d,nextOrder:u,setErrorMsg:f,multiDataOptionsFromSearch:m,multiDataOptionsFromUrl:g,multiDataOptionsFromFile:M,setMultiDataOptionsFromSearch:x,setMultiDataOptionsFromUrl:y,setMultiDataOptionsFromFile:v,itemCategoriesInfo:S})),o&&(0,e.jsx)(t.Alert,{className:"w-100",css:e.css`position: absolute; top: ${1===n.length?0:"33px"}; left: 0; right: 0; z-index: 1;`,closable:!0,form:"basic",onClose:()=>{f(null)},open:!0,text:o,type:"warning",withIcon:!0})),(0,e.jsx)(ue,{multiDataOptions:p,widgetId:d,onFinish:s,onRemove:l,setErrorMsg:f})),he=e.css`
  .small-add-btn {
    border-radius: 16px;
    width: 32px;
    height: 32px;
    padding: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;var De=l(54357),Ie=l.n(De);const Ne=t=>{const a=window.SVG,{className:o}=t,r=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:n,src:Ie()},r)):e.React.createElement("svg",Object.assign({className:n},r))};var be=l(59216),we=l.n(be);const Te=t=>{const a=window.SVG,{className:o}=t,r=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a}(t,["className"]),n=(0,e.classNames)("jimu-icon jimu-icon-component",o);return a?e.React.createElement(a,Object.assign({className:n,src:we()},r)):e.React.createElement("svg",Object.assign({className:n},r))},{useLayoutEffect:Oe,useState:Ae,useRef:Ee,useMemo:ze}=e.React,{useSelector:Ce}=e.ReactRedux,Le=a=>{const{multiDataOptions:o,enableDataAction:r,isLoading:n,onRemoveData:i,onChangeData:s,widgetId:l}=a,c=e.hooks.useTranslation(t.defaultMessages,e.defaultMessages),[u,p]=Ae(null),m=Ee(null),M=Ce((e=>e.dataSourcesInfo)),x=g(m),y=e.i18n.getIntl(),v=(0,R.useTheme)(),f=Ue(v);Oe((()=>{u&&m.current&&(null==x?void 0:x.current)!==m.current&&(m.current.focus(),m.current.select())}),[m,x,u]);const S=e=>{p((null==u?void 0:u.dataSourceJson.id)===(null==e?void 0:e.dataSourceJson.id)?null:e)};return(0,e.jsx)("div",{className:"data-list",css:f,role:"list"},o.map(((a,o)=>{var p;const g=d(a.dataSourceJson.id),x=null==M?void 0:M[a.dataSourceJson.id],v=x?x.instanceStatus===e.DataSourceStatus.CreateError:!g&&!n,f=x?x.instanceStatus===e.DataSourceStatus.NotCreated:!g&&n,j=(null==u?void 0:u.dataSourceJson.id)===a.dataSourceJson.id,h=a.dataSourceJson.label||a.dataSourceJson.sourceLabel,D=r&&g;return(0,e.jsx)("div",{key:a.dataSourceJson.id,className:(0,e.classNames)("d-flex justify-content-between align-items-center data-item",{"pt-3":0!==o}),role:"listitem","aria-label":h},(0,e.jsx)("div",{className:"flex-grow-1 text-truncate d-flex justify-content-start align-items-center"},f&&(0,e.jsx)("div",{className:"flex-shrink-0 d-flex justify-content-center align-items-center mr-1 data-item-loading"},(0,e.jsx)(t.Loading,{type:t.LoadingType.Donut,width:16,height:16})),(0,e.jsx)("div",{className:"flex-grow-1 text-truncate d-flex align-items-center",title:e.dataSourceUtils.getDsTypeString(null===(p=a.dataSourceJson)||void 0===p?void 0:p.type,y)},!f&&(0,e.jsx)("div",{className:"flex-shrink-0 d-flex justify-content-center align-items-center data-thumbnail"},(0,e.jsx)(t.Icon,{icon:e.dataSourceUtils.getDsIcon((0,e.Immutable)(a.dataSourceJson)),color:"#FFFFFF",size:"12"})),v&&(0,e.jsx)(t.Alert,{className:"flex-shrink-0",css:e.css`padding-left: 0 !important; padding-right: 0 !important;`,buttonType:"tertiary",form:"tooltip",size:"small",type:"error",text:c("dataSourceCreateError")}),(0,e.jsx)("div",{className:(0,e.classNames)("flex-grow-1 text-truncate data-label",{"pl-2":!v}),title:u?"":h},j?(0,e.jsx)(t.TextInput,{className:"w-100",size:"sm",defaultValue:h,onAcceptValue:e=>{((e,t)=>{S(e),s(Object.assign(Object.assign({},e),{dataSourceJson:Object.assign(Object.assign({},e.dataSourceJson),{label:t})}))})(a,e)},ref:m}):h))),(0,e.jsx)("div",{className:"flex-shrink-0 d-flex justify-content-end align-items-center data-item-operations"},!f&&!v&&(0,e.jsx)(t.Button,{className:"jimu-outline-inside",type:"tertiary",size:"sm",icon:!0,onClick:()=>{S(a)},title:c("rename"),"aria-label":c("rename")},(0,e.jsx)(Te,{size:"m"})),D&&(0,e.jsx)(t.DataActionList,{widgetId:l,dataSets:[{dataSource:g,records:[],name:g.getDataSourceJson().label||g.getDataSourceJson().sourceLabel}],listStyle:t.DataActionListStyle.Dropdown,buttonSize:"sm",buttonType:"tertiary",hideGroupTitle:!0}),(0,e.jsx)(t.Button,{className:"jimu-outline-inside",type:"tertiary",size:"sm",icon:!0,onClick:()=>{i(a.dataSourceJson.id)},title:c("remove"),"aria-label":c("remove")},(0,e.jsx)(Ne,{size:"m"}))))})))},ke=e.css`
  max-height: calc(100% - 35px);
  overflow: auto;

  .data-item {
    width: 100%;
    overflow: hidden;
  }
  .data-item-loading {
    position: relative;
    width: 24px;
    height: 24px;
    border: 1px solid #0095DB;
  }
  .data-thumbnail {
    width:  26px;
    height:  26px;
    background-color: #0095DB;
  }
  .data-label {
    font-size: 13px;
    color: var(--dark-800);
  }
`,Ue=t=>{var a;return ze((()=>{var a;return e.css`
    ${ke}
    .data-item-operations .data-action-dropdown .data-action-button{
      &:focus,
      &:focus-visible {
        outline-offset: -${null===(a=t.focusedStyles)||void 0===a?void 0:a.offset};
      }
      border: 0;
    }
  `}),[null===(a=t.focusedStyles)||void 0===a?void 0:a.offset])};class Fe extends e.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.12.0",description:"Allow to configure curated filter",upgrader:e=>e.disableAddBySearch||e.itemCategoriesInfo?e:e.set("itemCategoriesInfo",[{type:S.ItemCategory.MyContent,customLabel:"",enabled:!0,id:S.ItemCategory.MyContent},{type:S.ItemCategory.MyGroup,customLabel:"",enabled:!0,id:S.ItemCategory.MyGroup},{type:S.ItemCategory.MyOrganization,customLabel:"",enabled:!0,id:S.ItemCategory.MyOrganization},{type:S.ItemCategory.Public,customLabel:"",enabled:!0,id:S.ItemCategory.Public},{type:S.ItemCategory.LivingAtlas,customLabel:"",enabled:!0,id:S.ItemCategory.LivingAtlas}])}]}}const Pe=new Fe;const{useState:Je,useEffect:We,useMemo:Re,useRef:Ve,useCallback:Be}=e.React,Qe=!window.jimuConfig.isInBuilder,Ge=a=>{const{portalUrl:o,id:i,enableDataAction:l=!0,config:c,mutableStateProps:m}=a,g=Re((()=>(null==m?void 0:m.multiDataOptions)||[]),[null==m?void 0:m.multiDataOptions]),M=Be((t=>{e.MutableStoreManager.getInstance().updateStateValue(i,"multiDataOptions",t)}),[i]),x=e.hooks.useTranslation(t.defaultMessages,n),[y,v]=Je(!1),f=Re((()=>{const e=[];return c.disableAddBySearch&&e.push("search"),c.disableAddByUrl&&e.push("url"),c.disableAddByFile&&e.push("file"),e}),[c.disableAddBySearch,c.disableAddByUrl,c.disableAddByFile]),S=Re((()=>g.length>0?Math.max(...g.map((e=>e.order)))+1:0),[g]),j=e.React.useRef(null),h=Ve(null);We((()=>(h.current=new e.indexedDBUtils.IndexedDBCache(i,"add-data","added-data"),Qe&&h.current.init().then((()=>{return e=void 0,t=void 0,o=function*(){const e=yield h.current.getAll();e.length>0&&(v(!0),u(e,i).catch((e=>{console.error("Failed to create data source",e)})).finally((()=>{v(!1)})),M(e.sort(((e,t)=>e.order-t.order))))},new((a=void 0)||(a=Promise))((function(r,n){function i(e){try{l(o.next(e))}catch(e){n(e)}}function s(e){try{l(o.throw(e))}catch(e){n(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(i,s)}l((o=o.apply(e,t||[])).next())}));var e,t,a,o})).catch((e=>{console.error("Failed to read cache.",e)})),()=>{h.current.close()})),[i,M]);const D=e=>{h.current.initialized()&&h.current.putAll(e.map((e=>({key:e.dataSourceJson.id,value:e})))),v(!0),u(e,i).catch((e=>{console.error("Failed to create data source",e)})).finally((()=>{v(!1)})),M(g.concat(e))},I=e.ReactRedux.useSelector((e=>{var t;const a=null==e?void 0:e.widgetsRuntimeInfo;return null===(t=null==a?void 0:a[i])||void 0===t?void 0:t.state})),N=Re((()=>I===e.WidgetState.Closed),[I]);return(0,e.jsx)("div",{className:"widget-add-data jimu-widget d-flex align-items-center justify-content-center surface-1 border-0",css:Ze,ref:j},0===g.length&&(0,e.jsx)("div",{className:"no-data-placeholder w-100"},(0,e.jsx)("div",{className:"no-data-placeholder-icon"},(0,e.jsx)(r,{size:32,color:"var(--dark-500)"})),(0,e.jsx)("div",{className:"no-data-placeholder-text"},(0,e.jsx)("span",null,c.placeholderText||x("defaultPlaceholderText"))),(0,e.jsx)("div",{className:"no-data-placeholder-btn"},(0,e.jsx)(fe,{buttonSize:"lg",portalUrl:o,widgetId:i,onFinish:D,hiddenTabs:f,popperReference:j,nextOrder:S,itemCategoriesInfo:c.itemCategoriesInfo,hidePopper:N}))),g.length>0&&(0,e.jsx)("div",{className:"w-100 h-100 p-4"},(0,e.jsx)(Le,{multiDataOptions:g,enableDataAction:l,isLoading:y,widgetId:i,onRemoveData:e=>{h.current.initialized()&&h.current.deleteAll([e]),p([e],i).catch((e=>{console.error("Failed to remove data source",e)})),M(g.filter((t=>t.dataSourceJson.id!==e)))},onChangeData:t=>{h.current.initialized()&&h.current.put(t.dataSourceJson.id,t),v(!0),function(t,a){return s(this,void 0,void 0,(function*(){return t&&0!==t.length?Promise.resolve().then((()=>{t.forEach((t=>{const a=d(t.dataSourceJson.id);a&&e.DataSourceManager.getInstance().updateDataSourceByDataSourceJson(a,(0,e.Immutable)(t.dataSourceJson))}))})):Promise.resolve()}))}([t]).catch((e=>{console.error("Failed to update data source",e)})).finally((()=>{v(!1)})),M(g.map((e=>e.dataSourceJson.id===t.dataSourceJson.id?t:e)))}}),(0,e.jsx)("div",{className:"w-100 d-flex justify-content-end add-by-search-samll"},(0,e.jsx)(fe,{buttonSize:"sm",portalUrl:o,widgetId:i,onFinish:D,hiddenTabs:f,popperReference:j,nextOrder:S,itemCategoriesInfo:c.itemCategoriesInfo,hidePopper:N}))))};Ge.versionManager=Pe;const Ye=Ge,Ze=e.css`
  background-color: var(--white);
  position: relative;

  .add-by-search-samll {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .no-data-placeholder {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .no-data-placeholder-text, .no-data-placeholder-icon, .no-data-placeholder-btn{
      display: table;
      margin: 0 auto;
    }
    .no-data-placeholder-text {
      color: var(--dark-500);
      font-size: 0.8125rem;
      margin-top: 1rem;
      text-align: center;
    }
    .no-data-placeholder-icon {
      color: var(--dark-800);
    }
    .no-data-placeholder-btn {
      margin-top: 1rem;
    }
  }
`;function He(e){l.p=e}})(),c})())}}}));