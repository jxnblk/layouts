import preset from '@theme-ui/preset-base'
import prism from '@theme-ui/prism/presets/theme-ui'
import merge from 'deepmerge'

const theme = merge(preset, {
  useCustomProperties: true,
  initialColorMode: 'light',
  colors: {
    outline: 'rgba(0, 128, 255, 0.5)',
    modes: {
      dark: {
        text: 'white',
        background: 'black',
        primary: 'cyan',
        secondary: 'magenta',
        accent: 'yellow',
        muted: '#222',
        outline: 'rgba(0, 192, 255, 0.5)',
      },
    }
  },
  prism,
  styles: {
    pre: {
      variant: 'prism',
      bg: 'muted',
    }
  },
})

export default theme
