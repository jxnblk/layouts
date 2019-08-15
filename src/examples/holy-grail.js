/** @jsx jsx */
import { jsx, Box, Flex } from "../code";

export default () => (
  <Flex sx={{ flexDirection: "column", minHeight: "100vh" }}>
    <Box>Header</Box>
    <Flex sx={{ flex: 1, flexDirection: ["column", "row"] }}>
      <Box as="main" sx={{ flex: 1 }}>
        Main Content
      </Box>
      <Box as="nav" sx={{ flexBasis: ["auto", "12em"], order: -1 }}>
        Navigation
      </Box>
      <Box as="aside" sx={{ flexBasis: ["auto", "12em"] }}>
        Advertisements
      </Box>
    </Flex>
    <Box as="footer">Footer</Box>
  </Flex>
);
