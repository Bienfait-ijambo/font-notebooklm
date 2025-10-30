import type { NodeObjType, NodeType } from "./workflowSlice"


export function discordNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const discordNodeConfig: NodeObjType = {
        id,
        type: 'discordNode',
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
                        { nodeName: 'gmailNode', handlePosition: "right" },
                        { nodeName: 'driveNode', handlePosition: "right" },
                        { nodeName: 'outputNode', handlePosition: "right" },


                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                        { nodeName: 'slackNode', handlePosition: "left" },
                        { nodeName: 'gmailNode', handlePosition: "left" },
                        { nodeName: 'calendarNode', handlePosition: "left" },

                    ],
                },
            ],
        },
    }
    return discordNodeConfig
}