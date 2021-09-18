import {Box, Label} from "@primer/components";
import dayjs from "dayjs";
import {DetailLabel} from "./Common";

export function RequestTable({ list, selectedItem, onSelect }) {
    return (
        <Box borderColor="border.primary" borderWidth={1} borderStyle="solid" borderRadius={2}>
            <table m={10} style={{border: "1px solid #ccc",borderCollapse: "collapse"}}>
                <thead>
                <th>Domain</th>
                <th>Method</th>
                <th width="100%">Path</th>
                <th>Duration</th>
                <th>Time</th>
                </thead>
                <tbody>
                { list.map((i) => {
                    const selected = i === selectedItem;
                    const style = selected ? { background: "#ddf4ff" } : {};
                    const time = dayjs(i.time).format('HH:mm:ss')
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
                            onClick={() => onSelect && onSelect(i)} key={i.requestId}
                            style={style}
                        >
                            <td>{i.domain}</td>
                            <td><Label variant="medium" sx={{mr: 2, bg:colors[i.method]}}>{i.method}</Label></td>
                            <td>
                                {i.path}
                                {i.response.status === 500 && <Label ml={1} variant="small" sx={{mr: 2, bg:'bg.dangerInverse'}}>{i.response.status}</Label>}
                                {i.response.status === 401 && <Label ml={1} variant="small" sx={{mr: 2, bg:'bg.warningInverse', color: '#000'}}>{i.response.status}</Label>}
                            </td>
                            <td>{i.duration}ms</td>
                            <td>{time}</td>
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        </Box>
    )
}
