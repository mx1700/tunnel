import {
    Avatar,
    Box,
    Button,
    Header,
    ThemeProvider,
    TextInput,
    FilteredSearch,
    Dropdown,
    SubNav,
    BaseStyles,
    ButtonPrimary,
    ButtonDanger,
    Spinner,
    Text, StyledOcticon
} from '@primer/components'
import {RequestTable} from "./components/RequestTable";
import {RequestDetail} from "./components/RequestDetail";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {HubotIcon, SearchIcon, SquareFillIcon, TriangleRightIcon} from '@primer/octicons-react'

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
                            <StyledOcticon icon={HubotIcon} size={32} mr={2}/>
                            <span>Tunnel</span>
                        </Header.Link>
                    </Header.Item>
                    <Header.Item full></Header.Item>
                    <Header.Item mr={0}>
                        <Avatar src="https://github.com/octocat.png" size={20} square alt="@octocat"/>
                    </Header.Item>
                </Header>
                <Box m={4} p={4} pt={3} bg="bg.primary">
                    <SubNav aria-label="Main" mb={3} display="flex">
                        <FilteredSearch>
                            <Dropdown>
                                <Dropdown.Button>手机号</Dropdown.Button>
                            </Dropdown>
                            <TextInput type="search" disabled={connected} width={160} value={phone}
                                       onChange={(e) => setPhone(e.target.value.trim())}/>
                        </FilteredSearch>
                        {!connected && <ButtonPrimary ml={2} onClick={() => setConnected(true)}><TriangleRightIcon/>
                            开始
                        </ButtonPrimary>}
                        {connected && <><ButtonDanger ml={2} onClick={() => setConnected(false)}><SquareFillIcon/>
                            停止
                        </ButtonDanger><Spinner size="medium"/></>}
                        <Button ml={2} onClick={() => setRequests([])}>清屏</Button>
                        <TextInput type="search" placeholder="Path Search" icon={SearchIcon} width={240} value={filter}
                                   onChange={(e) => setFilter(e.target.value.trim())}/>
                    </SubNav>
                    <Box display="flex">
                        <Box flexGrow={1} mr={3}>
                            <RequestTable list={listData} selectedItem={selectedRequest} onSelect={setSelectedRequest}/>
                        </Box>
                        <Box width="400">
                            <RequestDetail log={selectedRequest}/>
                        </Box>
                    </Box>
                </Box>
            </BaseStyles>
        </ThemeProvider>
    );
}

const REQ_MAX_LENGTH = 100;

function useWs(phone) {
    const [connected, setConnected] = useState(false);
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        if (!phone) {
            return;
        }
        const socket = io('http://localhost:3001/', {query: {phone: phone}})
        socket.on('connect', () => {
            setConnected(true)
        })

        socket.on('disconnect', () => {
            setConnected(false)
        })

        socket.on('onData', (message) => {
            setRequests(l => {
                if (l.length >= REQ_MAX_LENGTH) {
                    l = l.slice(0, REQ_MAX_LENGTH - 1)
                }
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
