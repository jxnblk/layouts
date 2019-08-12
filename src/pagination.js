/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'
import nav from './nav'

export default props => {
  const { pathname } = props.location
  if (pathname === '/' || pathname === '/about') return false
  const index = nav.findIndex(n => n.path === pathname)
  const previous = nav[index - 1]
  const next = nav[index + 1]

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        py: 5,
      }}>
      {previous && (
        <Link
          to={previous.path}
          sx={{
            variant: 'styles.navlink',
            fontSize: 3,
          }}>
          <div sx={{ fontSize: 0 }}>Previous:</div>
          {previous.name}
        </Link>
      )}
      <div sx={{ mx: 'auto' }} />
      {next && (
        <Link
          to={next.path}
          sx={{
            variant: 'styles.navlink',
            fontSize: 3,
          }}>
          <div sx={{ fontSize: 0 }}>Next:</div>
          {next.name}
        </Link>
      )}
    </div>
  )
}
