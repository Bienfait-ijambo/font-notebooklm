import type { NodeObjType } from "./workflowSlice";

  export function outputNodeConfig(props: { id: string, label: string, icon: string }){
       const { id, label, icon } = props
   const newNode = {
          id,
          type: "outputNode",
          position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
          data: { label: label, icon: icon },
          constraints: {
            nodeHandles: [
              {
                name: "left",
                type: "target",
                LinkTo: [{ nodeName: "agent", handlePosition: "right" }],
              },
              {
                name: "right",
                type: "source",
                LinkTo: [
                  { nodeName: "gmailNode", handlePosition: "left" }
                  , { nodeName: "slackNode", handlePosition: "left" },
                  , { nodeName: "notionNode", handlePosition: "left" },
                  , { nodeName: "driveNode", handlePosition: "left" },

                ],
              },
            ],
          },
        } as  NodeObjType
        return newNode
  }