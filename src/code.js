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

import toCSS from 'style-object-to-css-string'

Box.displayName = 'Box'
Flex.displayName = 'Flex'

export { Box, Flex }
export const Card = props => <Box {...props} />
Card.displayName = 'Card'

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
    Card: 'Card',
  },
  'theme-ui': {
    Flex: 'div',
    Box: 'div',
    Card: 'Card',
  },
  emotion: {
    Flex: 'div',
    Box: 'div',
    Card: 'Card',
  },
  'css-modules': {},
}

const theme = {}

const numberProperties = {
  lineHeight: true,
  fontWeight: true,
  zIndex: true,
  flexGrow: true,
  flexShrink: true,
}
const numberToPixels = obj => {
  const next = {}
  for (let key in obj) {
    const value = obj[key]
    if (typeof value !== 'number' || numberProperties[key] || value === 0) {
      next[key] = value
    } else {
      next[key] = value + 'px'
    }
  }
  return next
}

const renderCSSModules = (type, props, children) => {
  const styles = scss(props.sx)(theme)
  const pixels = numberToPixels(styles)
  const ruleset = toCSS(pixels)
  const chx = React.Children.map(children, child => {
    if (typeof child === 'string' && /^\./.test(child)) {
      return child
    }
    return null
  })
  const rules = [
    `.${props.name || 'root'} {`,
    indent(ruleset, 2),
    '}',
    '',
    ...chx
  ].filter(Boolean).join('\n')

  return rules
}

export const jsx = (type, props = {}, ...children) => {
  const { mode } = useContext()
  const { depth = 0 } = props || {}
  const name = type.displayName || type
  const tag = elements[mode][name]

  if (mode === 'css-modules') {
    return renderCSSModules(type, props, children)
  }

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

