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
        muted: '#111119',
        gray: '#999',
        outline: 'rgba(0, 192, 255, 0.5)',
      },
    }
  },
  fontWeights: {
    heading: 900,
  },
  prism,
  styles: {
    navlink: {
      display: 'inline-block',
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    h1: {
      fontSize: [ 4, 5, 6, 7 ],
    },
    pre: {
      p: 3,
      mt: 0,
      mb: 4,
      variant: 'prism',
      bg: 'muted',
    }
  },
})

export default theme
