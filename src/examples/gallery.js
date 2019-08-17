/** @jsx jsx */
import { jsx, Box, Flex } from "../code";

export default () => (
  <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
    <Box sx={{
      display: 'grid',
      flex: 1,
      minHeight: '100vh',
      gridTemplateAreas:
        `"long-box long-box box-left box-right"` + ` ` +
        `"long-box long-box wide-box wide-box"`
      ,
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridGap: 20,
      margin: 20
    }}>
      <Box sx={{ flex: 1, gridArea: 'long-box' }}>Long Box</Box>
      <Box sx={{ flex: 1, gridArea: 'box-left' }}>Box Left</Box>
      <Box sx={{ flex: 1, gridArea: 'box-right' }}>Box Right</Box>
      <Box sx={{ flex: 1, gridArea: 'wide-box' }}>Wide box</Box>
    </Box>
  </Flex>
);
