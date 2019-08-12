/** @jsx jsx */
import { jsx, Box } from '../code'

export default props =>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
    <Box as='header'
      sx={{
        p: 3,
      }}>
      Header
    </Box>
    <Box as='main'
      sx={{
        flex: '1 1 auto',
        p: 3,
      }}>
      Content
    </Box>
    <Box
      as='footer'
      sx={{
        p: 3,
      }}>
      Footer
    </Box>
  </Box>
