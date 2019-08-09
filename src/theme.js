import preset from '@theme-ui/preset-base'
import prism from '@theme-ui/prism/presets/theme-ui'
import merge from 'deepmerge'

export default merge(preset, {
  useCustomProperties: true,
  initialColorMode: 'light',
  prism,
  styles: {
    pre: {
      variant: 'prism',
    }
  },
})
