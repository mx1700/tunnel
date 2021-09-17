import {
    Avatar,
    Box,
    Breadcrumb,
    Button,
    Header,
    StyledOcticon,
    ThemeProvider,
    theme,
    TextInput,
    FilteredSearch,
    Dropdown,
    SubNav,
    BaseStyles,
    ButtonPrimary,
    UnderlineNav,
    Heading,
    ButtonDanger,
    Spinner,
    Text
} from '@primer/components'
import deepmerge from 'deepmerge'
import ReactJson from "react-json-view";
import {RequestTable} from "./components/RequestTable";
import {RequestDetail} from "./components/RequestDetail";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

// const customTheme = deepmerge(theme, {
//     fonts: {
//         mono: 'Monolisa, monospace'
//     }
// })

function App() {
    const [phone, setPhone] = useState('');
    const [connected, setConnected] = useState(false);
    const [requests, setRequests] = useWs(connected && phone);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('')

    const listData = filter.length > 0 ? requests.filter((r) => r.path.includes(filter)) : requests;

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
              <SubNav aria-label="Main" mb={3} display="flex">
                  <FilteredSearch>
                      <Dropdown>
                          <Dropdown.Button>手机号</Dropdown.Button>
                      </Dropdown>
                      <TextInput type="search" disabled={connected} width={160} value={phone} onChange={(e) => setPhone(e.target.value.trim())} />
                  </FilteredSearch>
                  { !connected && <ButtonPrimary ml={2} onClick={() => setConnected(true)} >开始</ButtonPrimary> }
                  { connected && <><ButtonDanger ml={2} onClick={() => setConnected(false)}>停止</ButtonDanger><Spinner size="medium"/></> }
                  <Button ml={2} onClick={() => setRequests([])}>清屏</Button>
                  <Text fontWeight="bold" mt={1}>Filter:</Text>
                  <TextInput type="search" width={240} value={filter} onChange={(e) => setFilter(e.target.value.trim())} />
              </SubNav>
              <Box display="flex">
                  <Box flexGrow={1} mr={3}>
                      <RequestTable list={listData} selectedItem={selectedRequest} onSelect={setSelectedRequest} />
                  </Box>
                  <Box width="400">
                    <RequestDetail log={selectedRequest}/>
                  </Box>
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

function useWs(phone) {
    const [connected, setConnected] = useState(false);
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        if(!phone) {
            return;
        }
        const socket = io('http://localhost:3001/', {query: { phone: phone }})
        socket.on('connect', () => {
            setConnected(true)
        })

        socket.on('disconnect', () => {
            setConnected(false)
        })

        socket.on('onData', (message) => {
            setRequests(l => {
                if(l.length >= 20) { l = l.slice(0, 19) }
                return [message, ...l];
            })
        })

        return () => {
            socket.close();
        }
    }, [phone])
    return [requests, setRequests]
}

export default App;
