import type { NodeObjType, NodeType } from "./workflowSlice"


export function notionNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const notionNodeConfig: NodeObjType = {
        id,
        type: "notionNode",
        position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
        data: { label: label, icon: icon, ui: {} },
        constraints: {
            nodeHandles: [
                {
                    name: "left",
                    type: "target",
                    LinkTo: [
                        { nodeName: 'driveNode', handlePosition: "right" },

                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                        { nodeName: 'slackNode', handlePosition: "left" },
                        { nodeName: 'driveNode', handlePosition: "left" },
                        { nodeName: 'discordNode', handlePosition: "left" },
                        { nodeName: 'vectordbNode', handlePosition: "left" },
                    ],
                },
            ],
        },
    }
    return notionNodeConfig
}