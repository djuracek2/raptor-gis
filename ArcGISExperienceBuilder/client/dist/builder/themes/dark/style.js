System.register(["jimu-core"],(function(e,t){var r={};return{setters:[function(e){r.css=e.css}],execute:function(){e((()=>{"use strict";var e={8891:e=>{e.exports=r}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,o),n.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};return(()=>{o.r(i),o.d(i,{Global:()=>n,Nav:()=>t,Select:()=>r});var e=o(8891);const t=t=>{const r=t.pills;return e.css`
    ${r&&e.css`
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      .nav-item {
        .nav-link {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    `}
  `},r=t=>{var r,o,i;const n=t.theme;return e.css`
    .dropdown-button {
      .caret-icon {
        color: ${null===(i=null===(o=null===(r=null==n?void 0:n.colors)||void 0===r?void 0:r.palette)||void 0===o?void 0:o.dark)||void 0===i?void 0:i[600]};
        svg {
          height: 8px;
          width: 8px;
        }
      }
    }
  `},n=t=>{const r=t.theme;return e.css`
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
      padding: ${r.sizes[4]} ${r.sizes[4]};
      margin-bottom: 0;
      line-height: 1;
    }
  `}})(),i})())}}}));