import {Box, Heading, UnderlineNav} from "@primer/components";
import ReactJson from "react-json-view";
import {DetailLabel} from "./Common";
import {useState} from "react";
import * as dayjs from "dayjs";

export function RequestDetail({ data, user, width= 400}) {
    const [nav, setNav] = useState(1);

    return (
        <Box width={width} borderColor="border.primary" borderWidth={1} borderStyle="solid" borderRadius={2} wordBreak style={{ wordBreak:'break-all' }} overflow={'hidden'}>
            <TabNav list={[
                { value: 1, name: 'Request' },
                { value: 2, name: 'Response' },
                { value: 3, name: 'DB' },
                { value: 4, name: 'Redis' },
            ]} value={nav} onChange={setNav}/>
            {data ? (
                <>
                  {nav === 1 && <RequestInfo data={data} user={user} />}
                  {nav === 2 && <ResponseInfo response={data.response} />}
                  {nav === 3 && <Box p={3}>Not supported</Box>}
                  {nav === 4 && <Box p={3}>Not supported</Box>}
                </>
            ) : (
                <Box p={3}>No item selected</Box>
            )}
        </Box>
    )
}


function TabNav({ list, value, onChange }) {

    return (
        <UnderlineNav aria-label="Main" full={true} bg={"#f6f8fa"}>
            {list.map(item => {
                const selected = item.value === value;
                return (
                    <UnderlineNav.Link
                      key={item.value}
                      href="#"
                      px={3} py={2} mr={0}
                      selected={selected}
                      onClick={() => onChange(item.value)}
                    >
                      {item.name}
                    </UnderlineNav.Link>
                )
            })}
            {/*<UnderlineNav.Link href="#home" px={3} py={2} mr={0} selected>Request</UnderlineNav.Link>*/}
            {/*<UnderlineNav.Link href="#documentation" px={3} p={2} mr={0}>Response</UnderlineNav.Link>*/}
            {/*<UnderlineNav.Link href="#documentation" px={3} p={2} mr={0}>DB</UnderlineNav.Link>*/}
            {/*<UnderlineNav.Link href="#documentation" px={3} p={2} mr={0}>Redis</UnderlineNav.Link>*/}
        </UnderlineNav>
    )
}

function RequestInfo({ data, user }) {
  const request = data.request;
  const generalList = [
    ['RequestId', data.requestId],
    ['Domain', data.domain],
    ['Path', data.path],
    ['Query', request.query || 'None'],
    ['Time', dayjs(data.time).format('YYYY-MM-DD HH:mm:ss')],
    ['User', user.username]
  ]
    return (
        <Box p={3}>
          <Box mb={2}>
            <DetailLabel>General</DetailLabel>
            {generalList.map(([label, value]) => (
              <p style={{fontSize:13}}>
                <b>{label}: </b>{value}
              </p>
            ))}
          </Box>
            <Box mb={2}>
              <DetailLabel>Body</DetailLabel>
              <ReactJson src={request.body} name={false} displayDataTypes={false} />
            </Box>
            <Box>
            <DetailLabel>Header</DetailLabel>
            <ReactJson src={request.headers} name={false} displayDataTypes={false} />
            </Box>
        </Box>
    )
}

function ResponseInfo({ response }) {
    return (
        <Box p={3}>
            <Box mb={2}>
                <DetailLabel>Body</DetailLabel>
                <ReactJson src={response.body} name={false} displayDataTypes={false} />
            </Box>
            <Box>
                <DetailLabel>Header</DetailLabel>
                <ReactJson src={response.headers} name={false} displayDataTypes={false} />
            </Box>
        </Box>
    )
}
