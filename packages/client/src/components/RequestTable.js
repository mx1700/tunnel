import {Box} from "@primer/components";

export function RequestTable() {
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
                <tr>
                    <td>dev.allflow.cn</td>
                    <td>POST</td>
                    <td>/api/blocks/search</td>
                    <td>100ms</td>
                    <td>19:33:02</td>
                </tr>
                </tbody>
            </table>
        </Box>
    )
}
