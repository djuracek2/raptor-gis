import { type IMThemeVariables, css, type SerializedStyles } from 'jimu-core'

export function getStyle (theme: IMThemeVariables): SerializedStyles {
  return css`
    &.jimu-widget-bookmark-setting{
      .resetting-template {
        cursor: pointer;
        color: ${theme.colors.palette.primary[700]};
        padding: 0 2px 1px 0;
        font-size: ${theme.sizes[3]};
      }
      .resetting-template:hover {
        cursor: pointer;
        color: ${theme.colors.palette.primary[800]};
      }
      .bookmark-setting {
        display: flex;
        flex-direction: column;
        height: 100%;
        .bookmark-setting-flex {
          flex: 1;
        }
      }
      .tips-pos {
        margin-top: -2px;
      }
      .template-group {
        button {
          padding: 0;
        }
        .template-img {
          cursor: pointer;
          width: 100%;
          height: 70px;
          border: 1px solid ${theme.colors.palette.light[500]};
          background-color: ${theme.colors.white};
          margin-right: 0;
          &.active {
            border: 2px solid ${theme.colors.primary};
          }
          &.template-img-h {
            width: 109px;
            height: 109px;
          }
          &.template-img-gallery {
            width: 227px;
            height: 69px;
          }
        }
        .vertical-space {
          height: 10px;
        }
      }
    }
  `
}

export function getNextButtonStyle (theme: IMThemeVariables, templateConWidth: number): SerializedStyles {
  return css`
    &.next-con {
      & {
        height: 48px;
      }
      .position-absolute-con, .position-relative-con {
        padding-top: ${theme.sizes[2]};
        margin-left: -${theme.sizes[4]};
      }
      div{
        padding: ${theme.sizes[4]};
        background: ${theme.colors.palette.light[300]};
        left: ${theme.sizes[4]};
        bottom: 0;
        width: ${templateConWidth}px
      }
    }
  `
}
