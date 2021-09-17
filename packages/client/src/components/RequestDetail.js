import {Box, Heading, UnderlineNav} from "@primer/components";
import ReactJson from "react-json-view";
import {DetailLabel} from "./Common";
import {useState} from "react";

export function RequestDetail({ log }) {
    const [nav, setNav] = useState(1);

    return (
        <Box width={400} borderColor="border.primary" borderWidth={1} borderStyle="solid" borderRadius={2}>
            <TabNav list={[
                { value: 1, name: 'Request' },
                { value: 2, name: 'Response' },
                { value: 3, name: 'DB' },
                { value: 4, name: 'Redis' },
            ]} value={nav} onChange={setNav}/>
            {log ? (
                <>
                    {nav === 1 && <RequestInfo request={log.request} />}
                    {nav === 2 && <ResponseInfo response={log.response} />}
                </>
            ) : (
                <Box p={5}>N/A</Box>
            )}
        </Box>
    )
}


function TabNav({ list, value, onChange }) {

    return (
        <UnderlineNav aria-label="Main" full={true}>
            {list.map(item => {
                const selected = item.value === value;
                return (
                    <UnderlineNav.Link key={item.value} href="#" px={3} py={2} mr={0} selected={selected} onClick={() => onChange(item.value)}>{item.name}</UnderlineNav.Link>
                )
            })}
            {/*<UnderlineNav.Link href="#home" px={3} py={2} mr={0} selected>Request</UnderlineNav.Link>*/}
            {/*<UnderlineNav.Link href="#documentation" px={3} p={2} mr={0}>Response</UnderlineNav.Link>*/}
            {/*<UnderlineNav.Link href="#documentation" px={3} p={2} mr={0}>DB</UnderlineNav.Link>*/}
            {/*<UnderlineNav.Link href="#documentation" px={3} p={2} mr={0}>Redis</UnderlineNav.Link>*/}
        </UnderlineNav>
    )
}

function RequestInfo({ request }) {
    return (
        <Box p={3}>
            <Box mb={2}>
                <DetailLabel>Query</DetailLabel>
                <code style={{fontSize:13}}>{request.query}</code>
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
