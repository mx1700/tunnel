import {Heading} from "@primer/components";

export function DetailLabel({ text, children }) {
    return (
        <Heading fontSize={1} mb={2}>{text || children}</Heading>
    )
}
