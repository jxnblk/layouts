/** @jsx jsx */
import { jsx, Box, Flex } from "../code";

export default () => (
  <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
    <Box>Header</Box>
    <Flex sx={{ flex: 1, flexDirection: ["column", "row"] }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>Main Content</Box>
      <Box sx={{ flexBasis: ["auto", 5], order: -1 }}>Nav</Box>
      <Box sx={{ flexBasis: ["auto", 5] }}>Ads</Box>
    </Flex>
    <Box>Footer</Box>
  </Flex>
);
