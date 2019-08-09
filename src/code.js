import React from 'react'
import * as Rebass from 'rebass'
import scss from '@styled-system/css'
import stringifyObject from 'stringify-object'
import indent from 'indent-string'
import * as themeui from 'theme-ui'
import { Styled } from 'theme-ui'
import {
  LiveProvider,
  LivePreview,
  LiveEditor,
  LiveError,
} from '@jxnblk/react-live'
import { Box, Flex } from 'rebass'

Box.displayName = 'Box'
Flex.displayName = 'Flex'

// todo: replace with custom components
export { Box, Flex }

const toString = obj => stringifyObject(obj, {
  indent: '  ',
})

export const Context = React.createContext({
  mode: 'rebass',
  modes: [
    'rebass',
    'theme-ui',
    'emotion',
  ],
})

export const useContext = () => React.useContext(Context)

export const CodeProvider = props => {
  const outer = useContext()
  const [ mode, setMode ] = React.useState('rebass')
  const [ xray, setXray ] = React.useState(true)
  const context = {
    ...outer,
    mode,
    setMode,
    xray,
    setXray,
  }
  return (
    <Context.Provider value={context}>
      {props.children}
    </Context.Provider>
  )
}

export const SwitchMode = props => {
  const { mode, modes = [], setMode, } = useContext()
  const cycle = e => {
    const n = (modes.indexOf(mode) + 1) % modes.length
    setMode(modes[n])
  }

  return (
    <button onClick={cycle}>
      {mode}
    </button>
  )
}

const elements = {
  rebass: {
    Flex: 'Flex',
    Box: 'Box',
  },
  'theme-ui': {
    Flex: 'div',
    Box: 'div',
  },
  emotion: {
    Flex: 'div',
    Box: 'div',
  },
}

const theme = {
  colors: {
    primary: '#07c',
    secondary: '#07c',
  }
}

export const jsx = (type, props = {}, ...children) => {
  const { mode } = useContext(Context)
  const { depth = 0 } = props
  const name = type.displayName || type
  const tag = elements[mode][name]

  const styles = props.sx
  let sx, css
  if (styles) {
    switch (mode) {
      case 'theme-ui':
        if (name === 'Flex') {
          styles.display = 'flex'
        }
        sx = toString(styles)
        break
      case 'emotion':
        if (name === 'Flex') {
          styles.display = 'flex'
        }
        css = toString(
          scss(styles)(theme)
        )
        break
      case 'rebass':
      default:
        sx = toString(styles)
        break
    }
  }

  const chx = React.Children.map(children, child => {
    if (typeof child === 'string') return indent(child, 2 + depth * 2)
    return React.cloneElement(child, {
      depth: depth + 1
    })
  })

  let styleProps = '>'
  if (sx) styleProps = indent(`sx={${sx}}>`, 2)
  else if (css) styleProps = indent(`css={${css}}`, 2)

  const lines = [
    `<${tag}`,
    styleProps,
    ...chx,
    `</${tag}>`,
  ]

  return indent(lines.join('\n'), depth * 2)
}

const scope = {
  ...Rebass,
  jsx: themeui.jsx,
}

export const Editor = props => {
  const { mode, xray } = useContext()
  let code = typeof props.component === 'function'
    ? props.component()
    : props.code

  if (mode === 'theme-ui' || mode === 'emotion') {
    code = '/** @jsx jsx */\n' + code
  }

  return (
    <LiveProvider
      scope={scope}
      code={code}>
      <Box
        sx={{
          '*': xray ? {
            outline: `1px solid rgba(0, 255, 255, .5)`
          } : {}
        }}>
        <LivePreview />
      </Box>
      <Styled.pre>
        <LiveEditor />
      </Styled.pre>
      <LiveError />
    </LiveProvider>
  )
}
