import preset from '@theme-ui/preset-base'
import prism from '@theme-ui/prism/presets/theme-ui'
import merge from 'deepmerge'

const theme = merge(preset, {
  useCustomProperties: true,
  initialColorMode: 'light',
  colors: {
    accent: '#609',
    gray: '#666',
    muted: '#eee',
    outline: 'rgba(0, 128, 255, 0.5)',
    modes: {
      dark: {
        text: 'white',
        background: 'black',
        primary: 'cyan',
        secondary: 'yellow',
        accent: 'magenta',
        muted: '#111116',
        gray: '#999',
        outline: 'rgba(0, 255, 255, 0.5)',
        grid: 'rgba(0, 255, 255, 0.125)',
      },
    }
  },
  fontWeights: {
    heading: 900,
  },
  sizes: {
    // hack to limit height in examples
    '100vh': 256,
  },
  prism,
  styles: {
    focused: {
      position: 'relative',
      outline: 'none',
      boxShadow: t => `0 0 0 3px ${t.colors.primary}`,
    },
    navlink: {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      ':focus': {
        variant: 'styles.focused',
      }
    },
    h1: {
      fontSize: [ 4, 5, 6, 7 ],
    },
    p: {
      maxWidth: 768,
    },
    pre: {
      p: 3,
      mt: 0,
      mb: 0,
      variant: 'prism',
      bg: 'muted',
      ':focus-within': {
        boxShadow: t => `inset 0 0 0 2px ${t.colors.primary}`,
      },
      textarea: {
        outline: 'none !important',
        '::selection': {
          bg: 'outline',
        }
      }
    },
    inlineCode: {
      fontFamily: 'monospace',
    },
    code: {
      fontFamily: 'monospace',
    },
  },
})

export default theme
