import type { NodeObjType, NodeType } from "./workflowSlice"


export function vectordbNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const vectorNodeConfig: NodeObjType = {
        id,
        type: 'vectordbNode',
        position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
        data: { label: label, icon: icon, ui: {} },
        constraints: {

            nodeHandles: [
                {
                    name: "left",
                    type: "target",
                    LinkTo: [
                        { nodeName: 'embeddingModelNode', handlePosition: "right" },
                      

                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                        // { nodeName: 'EmbeddingModalNode', handlePosition: "left" },
                       
                    ],
                },
            ],
        },
    }
    return vectorNodeConfig
}