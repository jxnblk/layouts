/** @jsx jsx */
import { jsx, Flex, Box } from '../code'

export default props => (
  <Flex
    name='root'
    sx={{
      flexWrap: 'wrap',
    }}>
    <Box
      name='sidebar'
      sx={{
        p: 3,
        flexGrow: 1,
        flexBasis: 256,
      }}>
      Sidebar
    </Box>
    <Box
      name='main'
      sx={{
        p: 3,
        flexGrow: 99999,
        flexBasis: 0,
        minWidth: 320,
      }}>
      Main Content
    </Box>
  </Flex>
)
