import {
    Avatar,
    Box,
    Breadcrumb,
    Button,
    Header,
    StyledOcticon,
    ThemeProvider,
    theme,
    TextInput, FilteredSearch, Dropdown, SubNav, BaseStyles, ButtonPrimary, UnderlineNav, Heading
} from '@primer/components'
import deepmerge from 'deepmerge'
import ReactJson from "react-json-view";
import {RequestTable} from "./components/RequestTable";
import {RequestDetail} from "./components/RequestDetail";
import {LogData} from "./data";

// const customTheme = deepmerge(theme, {
//     fonts: {
//         mono: 'Monolisa, monospace'
//     }
// })

function App() {
  return (
      <ThemeProvider>
          <BaseStyles>
          <Header>
            <Header.Item>
              <Header.Link fontSize={2}>
                {/*<StyledOcticon icon={MarkGithubIcon} size={32} mr={2} />*/}
                <span>Tunnel</span>
              </Header.Link>
            </Header.Item>
            <Header.Item full></Header.Item>
            <Header.Item mr={0}>
              <Avatar src="https://github.com/octocat.png" size={20} square alt="@octocat" />
            </Header.Item>
          </Header>
          <Box m={4} p={4} pt={3} bg="bg.primary">
              <SubNav aria-label="Main" mb={3}>
                  <FilteredSearch>
                      <Dropdown>
                          <Dropdown.Button>手机号</Dropdown.Button>
                      </Dropdown>
                      <TextInput type="search" width={160} />
                  </FilteredSearch>
                  <ButtonPrimary ml={2}>开始</ButtonPrimary>
              </SubNav>
              <Box display="flex">
                  <Box flexGrow={1} mr={3}>
                      <RequestTable />
                  </Box>
                  <RequestDetail log={LogData}/>
              </Box>
          </Box>
          {/*<Breadcrumb>*/}
          {/*  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item href="/about">About</Breadcrumb.Item>*/}
          {/*  <Breadcrumb.Item href="/about/team" selected>*/}
          {/*    Team*/}
          {/*  </Breadcrumb.Item>*/}
          {/*</Breadcrumb>*/}
          </BaseStyles>
      </ThemeProvider>
  );
}

export default App;
