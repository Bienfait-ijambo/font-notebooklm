import type { NodeObjType, NodeType } from "./workflowSlice"


export function slackNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const slackNodeConfig: NodeObjType = {
        id,
        type: "slackNode",
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
                         { nodeName: 'outputNode', handlePosition: "right" },
                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                        { nodeName: 'notionNode', handlePosition: "left" },
                        { nodeName: 'discordNode', handlePosition: "left" },
                        { nodeName: 'calendarNode', handlePosition: "left" },

                    ],
                },
            ],
        },
    }
    return slackNodeConfig
}