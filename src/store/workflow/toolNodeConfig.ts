import type { NodeObjType, NodeType } from "./workflowSlice"




export function toolNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const toolNodeConfig: NodeObjType = {
        id,
        type: "tool",
        category:"tool",
        position: { x: 120 + Math.random() * 800, y: 360 + Math.random() * 140 },
        data: {
            label: label, icon: icon,

            type: "search",
            name: "search",
            // config: {} 
            config: { name: "Search web", provider: 'exa', description: 'search web about RAG, nothing else' }

        },
        constraints: {
            nodeHandles: [
                {
                    name: "top",
                    type: "target",
                    LinkTo: [],
                },
            ],
        },
    }
    return toolNodeConfig
}