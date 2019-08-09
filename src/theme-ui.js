// prototype
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import {
  jsx,
  ThemeContext as EmotionContext,
  Global,
} from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import css, { get } from '@styled-system/css'
// import { toCustomProperties, createColorStyles } from './custom-properties'

export const Box = ({ as = 'div', sx, ...props }) =>
  jsx(as, {
    ...props,
    css: css(sx),
  })

const styled = (tag, key) => props =>
  <Box
    as={tag}
    {...props}
    sx={{
      variant: `styles.${key || tag}`
    }}
  />

const p = styled('p')
const h1 = styled('h1')
const h2 = styled('h2')
const h3 = styled('h3')
const h4 = styled('h4')
const h5 = styled('h5')
const h6 = styled('h6')
const img = styled('img')
const a = styled('a')
const pre = styled('pre')
const code = styled('code')
const ol = styled('ol')
const ul = styled('ul')
const li = styled('li')
const blockquote = styled('blockquote')
const hr = styled('hr')
const em = styled('em')
const strong = styled('strong')
const del = styled('delete')
const table = styled('table')
const tr = styled('tr')
const th = styled('th')
const td = styled('td')
const inlineCode = styled('code', 'inlineCode')
const thematicBreak = styled('hr', 'thematicBreak')

// only include MDX components
export const components = {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img,
  a,
  pre,
  code,
  ol,
  ul,
  li,
  blockquote,
  hr,
  em,
  strong,
  delete: del,
  table,
  tr,
  th,
  td,
  inlineCode,
}

export const Context = createContext({
  theme: {},
})

export const useThemeUI = () => useContext(Context)

const toVarName = key => `--theme-ui-${key}`
const toVarValue = (key, value) => `var(${toVarName(key)}, ${value})`

const join = (...args) => args.filter(Boolean).join('-')

const numberScales = {
  fontWeights: true,
  lineHeights: true,
}
const reservedKeys = {
  useCustomProperties: true,
  initialColorMode: true,
}

const toPixel = (key, value) => {
  if (typeof value !== 'number') return value
  if (numberScales[key]) return value
  return value + 'px'
}

// convert theme values to custom properties
export const toCustomProperties = (obj, parent, themeKey) => {
  const next = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    const value = obj[key]
    const name = join(parent, key)
    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name, key)
      continue
    }
    if (reservedKeys[key]) {
      next[key] = value
      continue
    }
    const val = toPixel(themeKey || key, value)
    next[key] = toVarValue(name, val)
  }

  return next
}

export const objectToVars = (parent, obj) => {
  let vars = {}
  for (let key in obj) {
    if (key === 'modes') continue
    const name = join(parent, key)
    const value = obj[key]
    if (value && typeof value === 'object') {
      vars = {
        ...vars,
        ...objectToVars(name, value),
      }
    } else {
      vars[toVarName(name)] = value
    }
  }
  return vars
}

// create body styles for color modes
export const createColorStyles = theme => {
  if (!theme.colors || !theme.colors.modes) return {}
  const { modes } = theme.colors
  const styles = objectToVars('colors', theme.colors)

  Object.keys(modes).forEach(mode => {
    const key = `&.theme-ui-${mode}`
    styles[key] = objectToVars('colors', modes[mode])
  })

  return css({
    ...styles,
    color: t => `var(--theme-ui-colors-text, ${t.colors.text})`,
    bg: t => `var(--theme-ui-colors-background, ${t.colors.background})`,
  })(theme)
}

const STORAGE_KEY = 'theme-ui-color-mode'

const storage = {
  get: init => window.localStorage.getItem(STORAGE_KEY) || init,
  set: value => window.localStorage.setItem(STORAGE_KEY, value),
}

const useColorState = () => {
  const [mode, setMode] = useState('default')
  useEffect(() => {
    const stored = storage.get()
    document.body.classList.remove('theme-ui-' + stored)
    if (stored === mode) return
    setMode(stored)
  }, [])
  useEffect(() => {
    storage.set(mode)
  }, [mode])
  // todo localstorage hooks
  return [mode, setMode]
}

export const ColorMode = () => (
  <Global
    styles={theme => ({
      body: createColorStyles(theme),
    })}
  />
)

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...get(modes, mode, {}),
    }
  }
}

export const ThemeProvider = props => {
  const [colorMode, setColorMode] = useColorState()
  const theme = applyColorMode(props.theme, colorMode)
  const context = {
    colorMode,
    setColorMode,
    theme,
  }
  const emotheme = { ...theme }
  emotheme.colors = toCustomProperties(emotheme.colors, 'colors')

  return (
    <EmotionContext.Provider value={emotheme}>
      <Context.Provider value={context}>
        <ColorMode />
        {props.children}
      </Context.Provider>
    </EmotionContext.Provider>
  )
}

// for making MDX optional
export const ComponentProvider = props =>
  <MDXProvider
    components={components}
    {...props}
  />
