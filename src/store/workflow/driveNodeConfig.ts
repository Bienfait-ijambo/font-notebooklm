import type { NodeObjType, NodeType } from "./workflowSlice"


export function driveNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const driveNodeConfig: NodeObjType = {
        id,
        type: "driveNode",
        position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
        data: { label: label, icon: icon, ui: {} },
        constraints: {
            nodeHandles: [
                {
                    name: "left",
                    type: "target",
                    LinkTo: [
                        { nodeName: 'inputNode', handlePosition: "right" },
                        { nodeName: 'notionNode', handlePosition: "right" },

                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                        { nodeName: 'slackNode', handlePosition: "left" },
                        { nodeName: 'notionNode', handlePosition: "left" },
                        { nodeName: 'discordNode', handlePosition: "left" },
                    ],
                },
            ],
        },
    }
    return driveNodeConfig
}