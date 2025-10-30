import type { NodeObjType, NodeType } from "./workflowSlice"


export function inputNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const inputNodeConfig: NodeObjType = {
        id,
        type: "inputNode",

        position: { x: 40 + Math.random() * 120, y: 120 + Math.random() * 240 },
        data: {
            label: label, icon: icon, 
            // triggers: [
            //     {
            //         "id": "new_message",
            //         "name": "New Message",
            //     }
            // ],
            // // actions that can be perform on linked node on right handle
            // actions:[
            //     {
			// 		name:"send_message_to_gmail",
			// 		node_name:"gmailNode",
			// 		triggerd:false
			// 	},
			// 	{
			// 		name:"send_message_to_agent",
			// 		node_name:"agent",
			// 		triggerd:false
			// 	}
            // ],
            },
            constraints: {
                nodeHandles: [
                    {
                        name: "right",
                        type: "source",
                        LinkTo: [
                            { nodeName: "agent", handlePosition: "left" },
                            { nodeName: "gmailNode", handlePosition: "left" }

                        ],
                    },
                    {
                        name: "left",
                        type: "target",
                        LinkTo: [],
                    },
                ],
            },
        }

            return inputNodeConfig
        }


    
    



