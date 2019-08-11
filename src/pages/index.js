/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Link } from 'gatsby'
import Sidebar from '../examples/sidebar'
import { Preview } from '../code'

const Grid = ({
  width = 256,
  ...props,
}) =>
  <div
    {...props}
    sx={{
      display: 'grid',
      gridGap: 4,
      gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, 1fr))`,
    }}
  />

const Card = ({
  component,
  title,
  href,
  ...props
}) =>
  <Link
    {...props}
    to={href}
    sx={{
      display: 'block',
      color: 'inherit',
      textDecoration: 'none',
      p: 3,
      border: t => `1px solid ${t.colors.muted}`,
      borderRadius: 4,
    }}>
    <Preview component={component} />
    <div
      sx={{
        mt: 2,
        fontWeight: 'bold',
      }}>
      {title}
    </div>
  </Link>


export default props => {
  return (
    <div>
      <pre>index</pre>
      <Grid>
        <Card
          title='Sidebar'
          component={Sidebar}
          href='/sidebar'
        />
        <Card
          title='Sidebar'
          component={Sidebar}
          href='/sidebar'
        />
      </Grid>
    </div>
  )
}
