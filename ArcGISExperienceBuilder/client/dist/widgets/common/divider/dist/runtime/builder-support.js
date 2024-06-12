System.register(["jimu-core","jimu-ui/advanced/setting-components","jimu-ui","jimu-theme","jimu-for-builder"],(function(t,e){var o={},i={},n={},r={},l={};return{setters:[function(t){o.Immutable=t.Immutable,o.React=t.React,o.ReactRedux=t.ReactRedux,o.appActions=t.appActions,o.classNames=t.classNames,o.css=t.css,o.getAppStore=t.getAppStore,o.hooks=t.hooks,o.injectIntl=t.injectIntl,o.jsx=t.jsx,o.polished=t.polished},function(t){i.QuickStylePopper=t.QuickStylePopper},function(t){n.Button=t.Button},function(t){r.useTheme=t.useTheme,r.useTheme2=t.useTheme2},function(t){l.appBuilderSync=t.appBuilderSync}],execute:function(){t((()=>{"use strict";var t={48891:t=>{t.exports=o},23137:t=>{t.exports=l},34796:t=>{t.exports=r},30726:t=>{t.exports=n},77756:t=>{t.exports=i}},e={};function s(o){var i=e[o];if(void 0!==i)return i.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,s),n.exports}s.d=(t,e)=>{for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var p={};return(()=>{s.r(p),s.d(p,{default:()=>m});var t,e,o,i,n,r=s(48891);!function(t){t.Regular="REGULAR",t.Hover="HOVER"}(t||(t={})),function(t){t.Horizontal="Horizontal",t.Vertical="Vertical"}(e||(e={})),function(t){t.Style0="Style0",t.Style1="Style1",t.Style2="Style2",t.Style3="Style3",t.Style4="Style4",t.Style5="Style5",t.Style6="Style6",t.Style7="Style7",t.Style8="Style8",t.Style9="Style9",t.Style10="Style10"}(o||(o={})),function(t){t.None="None",t.Point0="Point0",t.Point1="Point1",t.Point2="Point2",t.Point3="Point3",t.Point4="Point4",t.Point5="Point5",t.Point6="Point6",t.Point7="Point7",t.Point8="Point8"}(i||(i={})),function(t){t.None="None",t.Default="Default",t.Style1="Style1",t.Style2="Style2",t.Style3="Style3",t.Style4="Style4",t.Style5="Style5",t.Style6="Style6",t.Style7="Style7",t.Style8="Style8",t.Style9="Style9",t.Style10="Style10",t.Style11="Style11",t.Style12="Style12",t.Style13="Style13",t.Style14="Style14",t.Style15="Style15",t.Style16="Style16",t.Style17="Style17",t.Style18="Style18",t.Style19="Style19"}(n||(n={}));var l=s(77756),a=s(30726),S=s(34796);const d={_widgetLabel:"Divider",quickStyleItem:"Quick style {index}"};function y(t,e=1.5,o=null){if(!t)return"0px";const i=o?Number(o.split("px")[0]):0;let n=Number(t.split("px")[0]);return n=i>n?i:n,n*e<1?"1px":`${Math.round(n*e)}px`}const c=t=>{const{direction:o}=t,{size:i,color:n,type:l}=t.strokeStyle;return function(t,o,i=e.Horizontal,n=!1){const l=i===e.Horizontal,s={},p={};return o=o||"transparent",s.Style0=r.css`
    & {
      border-bottom: ${t} solid ${o};
    }
  `,s.Style1=r.css`
    & {
      border-bottom: ${t} dashed ${o};
    }
  `,s.Style2=r.css`
    & {
      border-bottom: ${t} dotted ${o};
    }
  `,s.Style3=r.css`
    & {
      height: ${t};
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      height: ${t};
      left: ${y(t,4)};
      right: 0;
      background-image: repeating-linear-gradient(
        to right,
        ${o} 0,
        ${o} ${y(t,1)},
        transparent 0,
        transparent ${y(t,6)}
      );
    }
    &:after {
      position: absolute;
      content: '';
      height: ${t};
      left: 0;
      right: 0;
      background-image: repeating-linear-gradient(
        to right,
        ${o} 0,
        ${o} ${y(t,3)},
        transparent 0,
        transparent ${y(t,6)}
      );
    }
  `,s.Style6=r.css`
    & {
      height: ${t};
      background-image: repeating-linear-gradient(
        to right,
        ${o} 0,
        ${o} ${y(t,4)},
        transparent 0,
        transparent ${y(t,6)}
      );
    }
  `,s.Style7=r.css`
    & {
      border-color: ${o};
      border-bottom-style: double;
      border-bottom-width: ${n?"4px":t};
    }
  `,s.Style8=r.css`
    & {
      height: ${t};
      min-height: ${n?"6px":"unset"};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: ${y(t,.2,"4px")};
      background: ${o};
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${y(t,.4,"4px")};
      background: ${o};
    }
  `,s.Style9=r.css`
    & {
      height: ${t};
      min-height: ${n?"6px":"unset"};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: ${y(t,.4,"4px")};
      background: ${o};
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: ${y(t,.2,"4px")};
      background: ${o};
    }
  `,s.Style10=r.css`
    & {
      height: ${t};
      min-height: ${n?"8px":"unset"};
      position: relative;
      background-clip: content-box;
      border-top: ${y(t,.167)} solid ${o};
      border-bottom: ${y(t,.167)} solid ${o};
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: ${n?"2px":y(t,.3)};
      background: ${o};
      transform: translateY(-50%);
    }
  `,p.Style0=r.css`
    & {
      border-left: ${t} solid ${o};
    }
  `,p.Style1=r.css`
    & {
      border-left: ${t} dashed ${o};
    }
  `,p.Style2=r.css`
    & {
      border-left: ${t} dotted ${o};
    }
  `,p.Style3=r.css`
    & {
      width: ${t};
      position: relative;
    }
    &:before {
      position: absolute;
      content: '';
      width: ${t};
      top: ${y(t,3.8)};
      bottom: 0;
      background-image: repeating-linear-gradient(
        to bottom,
        ${o} 0,
        ${o} ${y(t,1)},
        transparent 0,
        transparent ${y(t,6)}
      );
    }
    &:after {
      position: absolute;
      content: '';
      width: ${t};
      top: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        to bottom,
        ${o} 0,
        ${o} ${y(t,2.5)},
        transparent 0,
        transparent ${y(t,6)}
      );
    }
  `,p.Style6=r.css`
    & {
      width: ${t};
      background-image: repeating-linear-gradient(
        to bottom,
        ${o} 0,
        ${o} ${y(t,4)},
        transparent 0,
        transparent ${y(t,6)}
      );
    }
  `,p.Style7=r.css`
    & {
      border-left: ${t} double ${o};
    }
  `,p.Style8=r.css`
    & {
      width: ${t};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${y(t,.2,"4px")};
      background: ${o};
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: ${y(t,.4,"4px")};
      background: ${o};
    }
  `,p.Style9=r.css`
    & {
      width: ${t};
      position: relative;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${y(t,.4,"4px")};
      background: ${o};
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: ${y(t,.2,"4px")};
      background: ${o};
    }
  `,p.Style10=r.css`
    & {
      width: ${t};
      position: relative;
      background-clip: content-box;
      border-left: ${y(t,.167)} solid ${o};
      border-right: ${y(t,.167)} solid ${o};
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: ${n?"2px":y(t,.3)};
      background: ${o};
      transform: translateX(-50%);
    }
  `,l?s:p}(i,n,o)[l]},u=t=>{const{direction:o,pointEnd:n,pointStart:l,strokeStyle:s}=t,p=o===e.Horizontal,a=l.pointStyle,S=l.pointSize*h(null==s?void 0:s.size),d=n.pointStyle,y=n.pointSize*h(null==s?void 0:s.size);return function(t,e,o,i,n){const l=e?i/2+"px":0,s=e?i/2.5+"px":0,p=o?n/2+"px":0,a=o?n/2.5+"px":0,S=r.css`
    left: ${l};
    right: ${p};
    top: 50%;
    transform: translateY(-50%);
    &.point-start-Point1,
    &.point-start-Point2,
    &.point-start-Point5 {
      left: 0;
    }
    &.point-end-Point1,
    &.point-end-Point2,
    &.point-end-Point5 {
      right: 0;
    }
    &.point-start-Point7 {
      left: ${s};
    }
    &.point-end-Point7 {
      right: ${a};
    }
  `,d=r.css`
    top: ${l};
    bottom: ${p};
    left: 50%;
    transform: translateX(-50%);
    &.point-start-Point1,
    &.point-start-Point2,
    &.point-start-Point5 {
      top: 0;
    }
    &.point-end-Point1,
    &.point-end-Point2,
    &.point-end-Point5 {
      bottom: 0;
    }
  `;return t?S:d}(p,a!==i.None,d!==i.None,S,y)},$=(t,o=!0)=>{const{pointEnd:i,pointStart:n,strokeStyle:l,direction:s}=t,p=Number(h(l.size)),a=(o?n.pointSize*p:i.pointSize*p)+"px",S=null==l?void 0:l.color,d=o?n.pointStyle:i.pointStyle,c=function(t,o,i=e.Horizontal,n=!0){const l=y(t,1),s=y(t,.5),p=y(t,.1),a=y(t,.3);o=o||"transparent";const S=i===e.Horizontal;let d={None:"None"},c={None:"None"};d.Point0=r.css`
    & {
      width: ${l};
      height: ${l};
      border-radius: 50%;
      background-color: ${o};
      left: ${n?0:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,d.Point1=r.css`
    & {
      width: ${a};
      height: ${l};
      background-color: ${o};
      left: ${n?"4%":"unset"};
      right: ${n?"unset":"4%"};
      top: 50%;
      transform: translateY(-50%);
    }
  `,d.Point2=r.css`
    & {
      width: ${a};
      height: ${l};
      background-color: ${o};
      left: ${n?0:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,d.Point3=r.css`
    & {
      width: ${l};
      height: ${l};
      background-color: ${o};
      left: ${n?0:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,d.Point4=r.css`
    & {
      width: ${y(t,.71)};
      height: ${y(t,.71)};
      background-color: ${o};
      left: ${n?y(t,.2):"unset"};
      right: ${n?"unset":y(t,.2)};
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
  `;const u=r.css`
    .jimu-rtl & {
      border-color: transparent ${o} transparent transparent;
    }
    & {
      width: 0;
      height: 0;
      border-width: ${s};
      border-style: solid;
      border-color: transparent transparent transparent ${o};
      left: ${n?0:"unset"};
      right: ${n?"unset":`-${y(t,.5)}`};
      top: 50%;
      transform: translateY(-50%);
    }
  `,$=r.css`
    .jimu-rtl & {
      border-color: transparent transparent transparent ${o};
    }
    & {
      width: 0;
      height: 0;
      border-width: ${s};
      border-style: solid;
      border-color: transparent ${o} transparent transparent;
      left: ${n?`-${y(t,.5)}`:"unset"};
      right: ${n?"unset":0};
      top: 50%;
      transform: translateY(-50%);
    }
  `,h=r.css`
    .jimu-rtl & {
      border-top: ${a} solid ${o};
      border-left: ${a} solid ${o};
    }
    .jimu-ltr & {
      border-bottom: ${a} solid ${o};
      border-left: ${a} solid ${o};
    }
    & {
      width: ${y(t,.8)};
      height: ${y(t,.8)};
      left: ${n?`${y(t,.2)}`:"unset"};
      right: ${n?"unset":`-${y(t,.2)}`};
      top: 50%;
      border-radius: ${p};
      transform: translateY(-50%) rotate(45deg);
    }
  `,b=r.css`
    .jimu-rtl & {
      border-right: ${a} solid ${o};
      border-bottom: ${a} solid ${o};
    }
    .jimu-ltr & {
      border-top: ${a} solid ${o};
      border-right: ${a} solid ${o};
    }
    & {
      width: ${y(t,.8)};
      height: ${y(t,.8)};
      left: ${n?`-${y(t,.2)}`:"unset"};
      right: ${n?"unset":`${y(t,.2)}`};
      top: 50%;
      border-radius: ${p};
      transform: translateY(-50%) rotate(45deg);
    }
  `;c.Point0=r.css`
    & {
      width: ${l};
      height: ${l};
      border-radius: 50%;
      background-color: ${o};
      top: ${n?0:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,c.Point1=r.css`
    & {
      width: ${l};
      height: ${a};
      background-color: ${o};
      top: ${n?"4%":"unset"};
      bottom: ${n?"unset":"4%"};
      left: 50%;
      transform: translateX(-50%);
    }
  `,c.Point2=r.css`
    & {
      width: ${l};
      height: ${a};
      background-color: ${o};
      top: ${n?0:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,c.Point3=r.css`
    & {
      width: ${l};
      height: ${l};
      background-color: ${o};
      top: ${n?0:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,c.Point4=r.css`
    & {
      width: ${y(t,.71)};
      height: ${y(t,.71)};
      background-color: ${o};
      top: ${n?y(t,.2):"unset"};
      bottom: ${n?"unset":y(t,.2)};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
  `;const m=r.css`
    & {
      width: 0;
      height: 0;
      border-width: ${s};
      border-style: solid;
      border-color: transparent transparent ${o} transparent;
      top: ${n?`-${y(t,.5)}`:"unset"};
      bottom: ${n?"unset":0};
      left: 50%;
      transform: translateX(-50%);
    }
  `,g=r.css`
    & {
      width: 0;
      height: 0;
      border-width: ${s};
      border-style: solid;
      border-color: ${o} transparent transparent transparent;
      top: ${n?0:"unset"};
      bottom: ${n?"unset":`-${y(t,.5)}`};
      left: 50%;
      transform: translateX(-50%);
    }
  `,f=r.css`
    .jimu-rtl & {
      border-bottom: ${a} solid ${o};
      border-left: ${a} solid ${o};
    }
    .jimu-ltr & {
      border-bottom: ${a} solid ${o};
      border-right: ${a} solid ${o};
    }
    & {
      width: ${y(t,.8)};
      height: ${y(t,.8)};
      top: ${n?`-${y(t,.2)}`:"unset"};
      bottom: ${n?"unset":`${y(t,.2)}`};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-radius: ${p};
    }
  `,k=r.css`
    .jimu-rtl & {
      border-top: ${a} solid ${o};
      border-right: ${a} solid ${o};
    }
    .jimu-ltr & {
      border-top: ${a} solid ${o};
      border-left: ${a} solid ${o};
    }
    & {
      width: ${y(t,.8)};
      height: ${y(t,.8)};
      top: ${n?`${y(t,.2)}`:"unset"};
      bottom: ${n?"unset":`-${y(t,.2)}`};
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      border-radius: ${p};
    }
  `;let P,z;return n?(P={Point5:u,Point6:$,Point7:h,Point8:b},z={Point5:g,Point6:m,Point7:k,Point8:f}):(P={Point5:$,Point6:u,Point7:b,Point8:h},z={Point5:m,Point6:g,Point7:f,Point8:k}),d=Object.assign(Object.assign({},d),P),c=Object.assign(Object.assign({},c),z),S?d:c}(a,S,s,o);return c[d]},h=t=>{const e=t.split("px")[0];return Number(e)},b=(0,r.injectIntl)((t=>{const{isOpen:s,reference:p,id:y,usePopper:h,onInitResizeHandler:b,onInitDragHandler:m,onSettingChange:g}=t,f=r.React.useRef(null),k=r.ReactRedux.useSelector((t=>{var e,o,i;const n=(null===(e=null==t?void 0:t.appStateInBuilder)||void 0===e?void 0:e.appConfig)||t.appConfig,r=null===(i=null===(o=null==n?void 0:n.widgets)||void 0===o?void 0:o[y])||void 0===i?void 0:i.config;return f.current=r,r})),P=r.hooks.useTranslation(d),z=(0,S.useTheme)(),v=(0,S.useTheme2)(),x=()=>{var t,e,o,i,n,l;const s=z;return r.css`
      width: ${r.polished.rem(360)};
      z-index: 1001 !important;
      .quick-style-title {
        color: ${null===(o=null===(e=null===(t=v.colors)||void 0===t?void 0:t.palette)||void 0===e?void 0:e.dark)||void 0===o?void 0:o[600]};
        cursor: pointer;
        font-size: ${r.polished.rem(16)};
        div,
        svg {
          color: ${null===(l=null===(n=null===(i=v.colors)||void 0===i?void 0:i.palette)||void 0===n?void 0:n.dark)||void 0===l?void 0:l[600]};
        }
      }
      .button-item {
        width: 100%;
        font-size: ${r.polished.rem(13)};
      }
      button {
        border-radius: 0;
      }
      .quick-style-item-container {
        padding-left: 4px;
        padding-right: 4px;
        padding-bottom: 8px;
      }
      .quick-style-item {
        border: 2px solid transparent;
        &.quick-style-item-selected {
          border: 2px solid ${s.colors.palette.primary[700]};
        }
        .quick-style-item-inner {
          background-color: ${s.colors.palette.light[200]};
          cursor: pointer;
        }
      }
    `},N=()=>{var t;const l=null===(t=null==k?void 0:k.themeStyle)||void 0===t?void 0:t.quickStyleType,s=[],p=function(t){const r="3px",l="6px",s=e.Horizontal,p=null==t?void 0:t.colors,a=p.palette;return{Default:{direction:s,strokeStyle:{type:o.Style0,color:p.dark,size:r},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Default}},Style1:{direction:s,strokeStyle:{type:o.Style2,color:a.danger[700],size:r},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style1}},Style2:{direction:s,strokeStyle:{type:o.Style3,color:a.warning[700],size:r},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style2}},Style3:{direction:s,strokeStyle:{type:o.Style6,color:a.dark[800],size:r},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style3}},Style4:{direction:s,strokeStyle:{type:o.Style1,color:a.dark[800],size:r},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style4}},Style5:{direction:s,strokeStyle:{type:o.Style7,color:a.info[600],size:l},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style5}},Style6:{direction:s,strokeStyle:{type:o.Style8,color:a.success[700],size:l},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style6}},Style7:{direction:s,strokeStyle:{type:o.Style9,color:a.dark[800],size:l},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style7}},Style18:{direction:s,strokeStyle:{type:o.Style0,color:a.dark[800],size:r},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.Point7,pointSize:4},themeStyle:{quickStyleType:n.Style18}},Style19:{direction:s,strokeStyle:{type:o.Style0,color:a.info[600],size:r},pointStart:{pointStyle:i.Point0,pointSize:2},pointEnd:{pointStyle:i.Point6,pointSize:4},themeStyle:{quickStyleType:n.Style19}},Style8:{direction:s,strokeStyle:{type:o.Style0,color:a.dark[800],size:r},pointStart:{pointStyle:i.Point3,pointSize:4},pointEnd:{pointStyle:i.Point3,pointSize:4},themeStyle:{quickStyleType:n.Style8}},Style9:{direction:s,strokeStyle:{type:o.Style0,color:a.warning[700],size:r},pointStart:{pointStyle:i.Point6,pointSize:4},pointEnd:{pointStyle:i.Point6,pointSize:4},themeStyle:{quickStyleType:n.Style9}},Style10:{direction:s,strokeStyle:{type:o.Style0,color:a.danger[700],size:r},pointStart:{pointStyle:i.Point4,pointSize:4},pointEnd:{pointStyle:i.Point4,pointSize:4},themeStyle:{quickStyleType:n.Style10}},Style11:{direction:s,strokeStyle:{type:o.Style0,color:a.dark[800],size:r},pointStart:{pointStyle:i.Point5,pointSize:4},pointEnd:{pointStyle:i.Point5,pointSize:4},themeStyle:{quickStyleType:n.Style11}},Style12:{direction:s,strokeStyle:{type:o.Style0,color:a.dark[800],size:r},pointStart:{pointStyle:i.Point2,pointSize:4},pointEnd:{pointStyle:i.Point2,pointSize:4},themeStyle:{quickStyleType:n.Style12}},Style13:{direction:s,strokeStyle:{type:o.Style0,color:a.success[700],size:r},pointStart:{pointStyle:i.Point7,pointSize:4},pointEnd:{pointStyle:i.Point7,pointSize:4},themeStyle:{quickStyleType:n.Style13}},Style14:{direction:s,strokeStyle:{type:o.Style0,color:a.info[600],size:r},pointStart:{pointStyle:i.Point0,pointSize:4},pointEnd:{pointStyle:i.Point0,pointSize:4},themeStyle:{quickStyleType:n.Style14}},Style15:{direction:s,strokeStyle:{type:o.Style0,color:a.dark[800],size:r},pointStart:{pointStyle:i.Point8,pointSize:4},pointEnd:{pointStyle:i.Point8,pointSize:4},themeStyle:{quickStyleType:n.Style15}},Style16:{direction:s,strokeStyle:{type:o.Style10,color:a.dark[800],size:"8px"},pointStart:{pointStyle:i.None,pointSize:4},pointEnd:{pointStyle:i.None,pointSize:4},themeStyle:{quickStyleType:n.Style16}},Style17:{direction:s,strokeStyle:{type:o.Style0,color:a.danger[700],size:r},pointStart:{pointStyle:i.Point1,pointSize:4},pointEnd:{pointStyle:i.Point1,pointSize:4},themeStyle:{quickStyleType:n.Style17}}}}(z);let S=0;for(const t in p){S+=1;const e=p[t],{pointStart:o,pointEnd:n,themeStyle:d}=e,y=c(e),h=u(e),b=$(e,!0),m=$(e,!1),g=(0,r.classNames)("divider-line","position-absolute",`point-start-${o.pointStyle}`,`point-end-${n.pointStyle}`),f=(0,r.jsx)("div",{key:t,className:"col-6 quick-style-item-container"},(0,r.jsx)("div",{className:(0,r.classNames)("quick-style-item",{"quick-style-item-selected":l===d.quickStyleType})},(0,r.jsx)(a.Button,{className:"quick-style-item-inner p-2 w-100",onClick:()=>{w(e)},title:P("quickStyleItem",{index:S})},(0,r.jsx)("div",{className:"quick-style-item-inner p-2 position-relative"},o.pointStyle!==i.None&&(0,r.jsx)("span",{className:"point-start position-absolute",css:b}),(0,r.jsx)("div",{className:g,css:[y,h]}),n.pointStyle!==i.None&&(0,r.jsx)("span",{className:"point-end position-absolute",css:m})))));s.push(f)}return s},w=r.hooks.useEventCallback((t=>{var o;t.direction=(null===(o=f.current)||void 0===o?void 0:o.direction)||e.Horizontal,g((0,r.Immutable)(t))}));return(0,r.jsx)("div",null,h?(0,r.jsx)(l.QuickStylePopper,{reference:p,open:s,placement:"right-start",css:x(),trapFocus:!1,autoFocus:!1,onClose:()=>{((t=!1)=>{(0,r.getAppStore)().dispatch(r.appActions.widgetStatePropChange(y,"showQuickStyle",t))})(!1)},onInitResizeHandler:b,onInitDragHandler:m},(0,r.jsx)("div",{className:"container-fluid mb-2"},(0,r.jsx)("div",{className:"row no-gutters"},N()))):(0,r.jsx)("div",{className:"container-fluid mb-2",css:x()},(0,r.jsx)("div",{className:"row no-gutters"},N())))})),m={appBuilderSync:s(23137).appBuilderSync,QuickStyle:b}})(),p})())}}}));