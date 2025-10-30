import type { NodeObjType, NodeType } from "./workflowSlice"


export function embeddingModelNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const embeddingModelNodeConfig: NodeObjType = {
        id,
        type: 'embeddingModelNode',
        position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
        data: { label: label, icon: icon, ui: {} },
        constraints: {

            nodeHandles: [
                {
                    name: "left",
                    type: "target",
                    LinkTo: [
                        { nodeName: 'notionNode', handlePosition: "right" },
                        { nodeName: 'driveNode', handlePosition: "right" },
                        { nodeName: 'inputNode', handlePosition: "right" },
                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                          { nodeName: 'vectordbNode', handlePosition: "right" },
                    ],
                },
            ],
        },
    }
    return embeddingModelNodeConfig
}