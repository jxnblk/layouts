/** @jsx jsx */
import { jsx, Flex, Box } from '../code'

export default props => (
  <Flex
    sx={{
      flexWrap: 'wrap',
    }}>
    <Box
      sx={{
        p: 3,
        flexGrow: 1,
        flexBasis: 256,
      }}>
      Sidebar
    </Box>
    <Box
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
