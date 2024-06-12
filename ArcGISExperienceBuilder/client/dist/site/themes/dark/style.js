System.register(["jimu-core"],(function(t,e){var o={};return{setters:[function(t){o.css=t.css}],execute:function(){t((()=>{"use strict";var t={891:t=>{t.exports=o}},e={};function r(o){var n=e[o];if(void 0!==n)return n.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,r),i.exports}r.d=(t,e)=>{for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{r.r(n),r.d(n,{Global:()=>i,Nav:()=>e,Select:()=>o});var t=r(891);const e=e=>{const o=e.pills;return t.css`
    ${o&&t.css`
      .nav-item {
        &:not(:first-of-type):not(:last-of-type) {
          .nav-link {
            border-radius: 0;
          }
        }
        &:first-of-type {
          .nav-link {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        &:last-of-type {
          .nav-link {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    `}
  `},o=e=>{var o,r,n;const i=e.theme;return t.css`
    .dropdown-button {
      .caret-icon {
        color: ${null===(n=null===(r=null===(o=null==i?void 0:i.colors)||void 0===o?void 0:o.palette)||void 0===r?void 0:r.dark)||void 0===n?void 0:n[600]};
        svg {
          height: 8px;
          width: 8px;
        }
      }
    }
  `},i=e=>{const o=e.theme;return t.css`
    html, body {
      overflow: hidden;
    }
    html.scrollable {
      overflow: auto;
      body {
        overflow: unset;
      }
    }
    .jimu-widget-setting--header {
      padding: ${o.sizes[4]} ${o.sizes[4]};
      margin-bottom: 0;
      padding-bottom: 0;
      line-height: 1;
    }
  `}})(),n})())}}}));