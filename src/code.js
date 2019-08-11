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
import { useContext } from './context'

Box.displayName = 'Box'
Flex.displayName = 'Flex'

export { Box, Flex }

export {
  Context,
  useContext,
  CodeProvider,
} from './context'

const toString = obj => stringifyObject(obj, {
  indent: '  ',
})

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
  const { mode } = useContext()
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

  let styleProps
  if (sx) styleProps = indent(`\nsx={${sx}}>`, 2)
  else if (css) styleProps = indent(`\ncss={${css}}>`, 2)

  const chx = React.Children.map(children, child => {
    if (typeof child === 'string') {
      return styleProps
        ? indent(child, 2 + depth * 2)
        : child
    }
    return React.cloneElement(child, {
      depth: depth + 1
    })
  })

  const lines = [
    `<${tag}` + (styleProps ? styleProps : '>'),
    ...chx,
    `</${tag}>`,
  ]

  return indent(lines.join(styleProps ? '\n' : ''), depth * 2)
}

