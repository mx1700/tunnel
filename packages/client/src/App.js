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
    StyledOcticon, SelectMenu, Text
} from '@primer/components'
import {RequestTable} from "./components/RequestTable";
import {RequestDetail} from "./components/RequestDetail";
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {HubotIcon, SearchIcon, SquareFillIcon, TriangleRightIcon} from '@primer/octicons-react'
import dayjs from "dayjs";
import {useRequest, useToggle} from "ahooks";

function App() {
    const [type, { toggle: setType }] = useToggle('realtime', 'history');
    const [username, setUsername] = useLocalStorage('username');
    const [connected, setConnected] = useState(false);
    const [requests, setRequests] = useWs(connected && username);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [filter, setFilter] = useState('')

    const [startTime, setStartTime] = useState(() => dayjs().add('-15', 'minute').format('YYYY-MM-DDTHH:mm'))
    const [endTime, setEndTime] = useState(() => dayjs().add('1', 'minute').format('YYYY-MM-DDTHH:mm'))

    const { loading, run: query, data: history } = useRequest(searchHistory, {
        manual: true,
        initialData: []
    });
    const realtimeMode = type === 'realtime';
    const historyMode = type === 'history';
    const listData = realtimeMode ? (filter.length > 0 ? requests.filter((r) => r.path.includes(filter)) : requests) : history;

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
                    <Header.Item full/>
                    <Header.Item mr={0}>
                        <Avatar src="https://github.com/octocat.png" size={20} square alt="@octocat"/>
                    </Header.Item>
                </Header>
                <Box m={4} p={3} bg="bg.primary" borderRadius={2} boxShadow="2px 2px #eee" minHeight={640}>
                    <SubNav aria-label="Main" mb={3} display="flex">
                        <Button onClick={() => setType()}>
                            {realtimeMode ? '实时' : '历史'}
                        </Button>
                        <FilteredSearch>
                            <Dropdown>
                                <Dropdown.Button>账号</Dropdown.Button>
                            </Dropdown>
                            <TextInput type="search" disabled={connected} width={140} value={username}
                                       onChange={(e) => setUsername(e.target.value.trim())}/>
                        </FilteredSearch>
                        {historyMode && <TextInput type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={{height: 20}} width={230} />}
                        {historyMode && <Text as='span' mt={1}>—</Text>}
                        {historyMode && <TextInput type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={{height: 20}} width={230} />}
                        {realtimeMode && !connected && <ButtonPrimary ml={2} onClick={() => setConnected(true)}><TriangleRightIcon/>
                            开始
                        </ButtonPrimary>}
                        {realtimeMode && connected && <>
                            <ButtonDanger ml={2} onClick={() => setConnected(false)}>
                                <SquareFillIcon/>
                                停止
                            </ButtonDanger>
                            <Box mt={2}><Spinner size="small"/></Box>
                        </>}
                        {realtimeMode && <Button ml={2} onClick={() => setRequests([])}>清屏</Button>}
                        <TextInput type="search" placeholder="Path Search" icon={SearchIcon} width={200} value={filter}
                                   onChange={(e) => setFilter(e.target.value.trim())}/>
                        {historyMode && <ButtonPrimary onClick={() => query(username, startTime, endTime, filter)}>搜索</ButtonPrimary>}
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

        const socket = io(process.env.REACT_APP_WS_URL, {query: {username: phone}})
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

function useLocalStorage(key) {
    const [username, setUsername] = useState(() => (localStorage.getItem(key) ?? ''));
    useEffect(() => {
        localStorage.setItem(key, username);
    },[username, key])
    return [username, setUsername]
}

function Select({ options, value, onChange }) {
    const selectName = options[value];
    return (
      <SelectMenu>
          <Button as="summary">{selectName}</Button>
          <SelectMenu.Modal width={110}>
              <SelectMenu.List>
                  {Object.entries(options).map(([index, name]) => {
                      return (<SelectMenu.Item key={index} href="#" onClick={() => onChange && onChange(index)}>{name}</SelectMenu.Item>)
                  })}
              </SelectMenu.List>
          </SelectMenu.Modal>
      </SelectMenu>
    )
}

async function searchHistory(username,startTime,endTime,keywords) {
    const params = new URLSearchParams({ username, startTime, endTime, keywords })
    return fetch(process.env.REACT_APP_WS_URL + 'searchHistory?' + params.toString()).then(function(response) {
        return response.json();
    })
}

export default App;
