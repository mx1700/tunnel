import {Box} from "@primer/components";
import dayjs from "dayjs";

export function RequestTable({ list, selectedItem, onSelect }) {
    console.log(list)
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
                    return (
                        <tr
                            onClick={() => onSelect && onSelect(i)} key={i.requestId}
                            style={style}
                        >
                            <td>{i.domain}</td>
                            <td>{i.method}</td>
                            <td>{i.path}</td>
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
