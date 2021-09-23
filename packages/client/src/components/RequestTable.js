import {Box, Label} from "@primer/components";
import dayjs from "dayjs";
import {DetailLabel} from "./Common";

export function RequestTable({ list, selectedItem, onSelect }) {
    return (
        <Box borderColor="border.primary" borderWidth={1} borderStyle="solid" borderRadius={2} overflow={'hidden'}>
            <table m={10} style={{border: "1px solid #ccc",borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Method</th>
                        <th width="100%">Path</th>
                        <th>Duration</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                { list.map((item) => {
                    const data = item.data;
                    const selected = data === selectedItem;
                    const style = selected ? { background: "#ddf4ff" } : {};
                    const time = dayjs(data.time).format('HH:mm:ss')
                    const colors = {
                        'GET': 'bg.successInverse',
                        'POST': 'bg.infoInverse',
                        'DELETE': 'bg.dangerInverse',
                        'PUT': 'bg.infoInverse',
                        'PATCH': 'bg.infoInverse',
                        'OPTION': 'bg.backdrop'
                    }
                    return (
                        <tr
                            onClick={() => onSelect && onSelect(data)} key={data.requestId}
                            style={style}
                        >
                            <td>{data.domain}</td>
                            <td><Label variant="medium" sx={{mr: 2, bg:colors[data.method]}}>{data.method}</Label></td>
                            <td>
                                {data.path}
                                {data.response.status === 500 && <Label ml={1} variant="small" sx={{mr: 2, bg:'bg.dangerInverse'}}>{data.response.status}</Label>}
                                {data.response.status === 401 && <Label ml={1} variant="small" sx={{mr: 2, bg:'bg.warningInverse', color: '#000'}}>{data.response.status}</Label>}
                            </td>
                            <td>{data.duration}ms</td>
                            <td>{time}</td>
                        </tr>
                    )
                }) }
                </tbody>
                { (!list || list.length === 0) && <tfoot>
                <tr>
                    <td colSpan={100} style={{textAlign: 'center', padding: 16, fontSize: 16}}>No data</td>
                </tr>
                </tfoot>}
            </table>
        </Box>
    )
}
