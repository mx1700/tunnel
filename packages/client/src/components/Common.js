import {Heading} from "@primer/components";

export function Label({ text, children }) {
    return (
        <Heading fontSize={1} mb={2}>{text || children}</Heading>
    )
}
