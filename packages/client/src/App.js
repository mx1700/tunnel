import {
    Avatar,
    Box,
    Breadcrumb,
    Button,
    Header,
    StyledOcticon,
    ThemeProvider,
    theme,
    TextInput, FilteredSearch, Dropdown, SubNav, BaseStyles, ButtonPrimary, UnderlineNav, Heading, ButtonDanger, Spinner
} from '@primer/components'
import deepmerge from 'deepmerge'
import ReactJson from "react-json-view";
import {RequestTable} from "./components/RequestTable";
import {RequestDetail} from "./components/RequestDetail";
import {LogData} from "./data";
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
    const [connect] = useWs(connected && phone);
    console.log(connect)
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
                      <TextInput type="search" disabled={connected} width={160} value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </FilteredSearch>
                  { !connected && <ButtonPrimary ml={2} onClick={() => setConnected(true)} >开始</ButtonPrimary> }
                  { connected && <><ButtonDanger ml={2} onClick={() => setConnected(false)}>停止</ButtonDanger><Spinner size="medium"/></> }
                  <Button ml={2}>清屏</Button>
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

function useWs(phone) {
    const [connected, setConnected] = useState(false);
    console.log('useWs', phone)
    useEffect(() => {
        if(!phone) {
            return;
        }
        const socket = io('http://localhost:3001/', {query: { phone: phone }})
        console.log('connecting to socket: ' + socket.connected);
        socket.on('connect', () => {
            setConnected(true)
        })

        socket.on('disconnect', () => {
            setConnected(false)
        })

        socket.on('msgToClient', (message) => {
            console.log(message)
            socket.emit('msgToServer', message)
        })

        return () => {
            socket.close();
        }
    }, [phone])
    return [connected]
}

export default App;
