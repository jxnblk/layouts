import preset from '@theme-ui/preset-base'
import prism from '@theme-ui/prism/presets/theme-ui'
import merge from 'deepmerge'

const theme = merge(preset, {
  useCustomProperties: true,
  initialColorMode: 'dark',
  colors: {
    text: 'white',
    background: 'black',
    primary: 'cyan',
    secondary: '#b0f',
    accent: '#f0b',
    muted: '#111116',
    gray: '#999',
    outline: 'rgba(0, 255, 255, 0.5)',
    grid: 'rgba(0, 255, 255, 0.125)',
    modes: {
      lite: {
        text: 'black',
        background: 'white',
        primary: '#06f',
        secondary: '#a0c',
        accent: '#f0a',
        gray: '#444',
        muted: '#f6f6ff',
        outline: 'rgba(0, 102, 255, 0.5)',
        grid: 'rgba(0, 102, 255, 0.125)',
      },
      pink: {
        text: 'hsl(350, 80%, 10%)',
        background: 'hsl(350, 100%, 90%)',
        primary: 'hsl(350, 100%, 50%)',
        secondary: 'hsl(280, 100%, 50%)',
        accent: 'hsl(280, 100%, 20%)',
        muted: 'hsl(350, 100%, 88%)',
        gray: 'hsl(350, 40%, 50%)',
        outline: 'hsla(350, 100%, 50%, 0.5)',
        grid: 'hsla(350, 100%, 50%, 0.25)',
      }
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
