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
import {HomePage} from "./HomePage";
import {SharePage} from "./SharePage";

function App() {
    const pathName = window.location.pathname;
    const isSharePage = pathName.startsWith("/share/")
    const shareId = isSharePage ? pathName.replace('/share/', '') : null;
    return (
        <ThemeProvider>
            <BaseStyles>
                <Header>
                    <Header.Item>
                        <Header.Link fontSize={2} href="/">
                            <StyledOcticon icon={HubotIcon} size={32} mr={2}/>
                            <span>Tunnel</span>
                        </Header.Link>
                    </Header.Item>
                    <Header.Item full/>
                    <Header.Item mr={0}>
                        <Avatar src="https://github.com/octocat.png" size={20} square alt="@octocat"/>
                    </Header.Item>
                </Header>
                {isSharePage ? <SharePage id={shareId} /> : <HomePage/>}
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
