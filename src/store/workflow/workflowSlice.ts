// src/store/flowSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'



interface FlowState {
  nodes: any[];
  edges: any[];
  idCount: number;
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  idCount: 1,
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<any[]>) {
      state.nodes = action.payload;
    },
    setEdges(state, action: PayloadAction<any[]>) {
      state.edges = action.payload;
    },
    onNodesChange(state, action: PayloadAction<any>) {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange(state, action: PayloadAction<any>) {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    addNode(
      state,
      action: PayloadAction<{node:"agent" | "tool" | "inputNode" | "outputNode",icon:string,label:string}>
      
     
    ) {
      const {icon,label}=action.payload
      const id = `n${state.idCount}`;
      let newNode: any;

      if (action.payload.node === "agent") {
        newNode = {
          id,
          type: "agent",
          position: { x: 300 + Math.random() * 180, y: 120 + Math.random() * 60 },
          data: {
            label: "AI Agent", sub: "Tools Agent",
            ui: {
              nodeStyle: { border: "1px solid #ccc", padding: 6 },
              highlightNodeStyle: { boxShadow: "0 0 0 4px rgba(34,197,94,0.12)" },
              invalidNodeStyle: { boxShadow: "0 0 0 6px rgba(239,68,68,0.18)" },
              flashDurationMs: 800,
              rejectMessage: "Invalid connection"
            }

          },
          constraints: {
            nodeHandles: [
              {
                name: "left",
                type: "target",
                LinkTo: [],
               
              },
              {
                name: "bottom",
                type: "source",
                LinkTo: [{ nodeName: "tool", handlePosition: "top" }],
               
              },
               {
                name: "right",
                type: "source",
                LinkTo: [{ nodeName: "outputNode", handlePosition: "left" }],
               
              },
            ],
          },
        };
      } else if (action.payload.node === "tool") {
        newNode = {
          id,
          type: "tool",
          position: { x: 120 + Math.random() * 800, y: 360 + Math.random() * 140 },
          data: { label: label, icon: icon,},
          constraints: {
            nodeHandles: [
              {
                name: "top",
                type: "target",
                LinkTo: [],
              },
            ],
          },
        };
      } else if (action.payload.node === "inputNode") {
        newNode = {
          id,
          type: "inputNode",
          position: { x: 40 + Math.random() * 120, y: 120 + Math.random() * 240 },
          data: { label: label,icon:icon },
          constraints: {
            nodeHandles: [
              {
                name: "right",
                type: "source",
                LinkTo: [{ nodeName: "agent", handlePosition: "left" }],
              },
              {
                name: "left",
                type: "target",
                LinkTo: [],
              },
            ],
          },
        };
      } else {
        newNode = {
          id,
          type: "outputNode",
          position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
          data: { label: label },
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
                LinkTo: [],
              },
            ],
          },
        };
      }

      state.nodes.push(newNode);
      state.idCount += 1;
    },

    // addNode(state, action: PayloadAction<"agent" | "tool" | "inputNode" | "outputNode">) {
    //   const id = `n${state.idCount}`;
    //   let newNode: any;

    //   if (action.payload === "agent") {
    //     newNode = {
    //       id,
    //       type: "agent",
    //       position: { x: 300 + Math.random() * 180, y: 120 + Math.random() * 60 },
    //       data: { label: "AI Agent", sub: "Tools Agent" },
    //     };
    //   } else if (action.payload === "tool") {
    //     newNode = {
    //       id,
    //       type: "tool",
    //       position: { x: 120 + Math.random() * 800, y: 360 + Math.random() * 140 },
    //       data: { label: "Search Tool", icon: "🔧" }, // example icon
    //     };
    //   } else if (action.payload === "inputNode") {
    //     newNode = {
    //       id,
    //       type: "inputNode",
    //       position: { x: 40 + Math.random() * 120, y: 120 + Math.random() * 240 },
    //       data: { label: "Input Message" },
    //     };
    //   } else {
    //     newNode = {
    //       id,
    //       type: "outputNode",
    //       position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
    //       data: { label: "Output Action" },
    //     };
    //   }

    //   state.nodes.push(newNode);
    //   state.idCount += 1;
    // },


    //   onConnect(state, action: PayloadAction<any>) {
    //   const params = action.payload;

    //   const edgeId = `e-${params.source}-${params.sourceHandle ?? "s"}-${params.target}-${params.targetHandle ?? "t"}-${Date.now()}`;

    //   const sourceNode = state.nodes.find((n) => n.id === params.source);
    //   const targetNode = state.nodes.find((n) => n.id === params.target);

    //   const isToolConnection =
    //     sourceNode?.type === "tool" || targetNode?.type === "tool";

    //   const edgeObj = {
    //     id: edgeId,
    //     source: params.source,
    //     sourceHandle: params.sourceHandle,
    //     target: params.target,
    //     targetHandle: params.targetHandle,
    //     animated: false,
    //     style: isToolConnection
    //       ? { strokeDasharray: "6 6", stroke: "#888" } // or THEME.dashedStroke
    //       : undefined,
    //   };

    //   state.edges = addEdge(edgeObj, state.edges);
    // },


    onConnect(state, action: PayloadAction<any>) {
      const params = action.payload;

      const edgeId = `e-${params.source}-${params.sourceHandle ?? "s"}-${params.target}-${params.targetHandle ?? "t"}-${Date.now()}`;

      const sourceNode = state.nodes.find((n) => n.id === params.source);
      const targetNode = state.nodes.find((n) => n.id === params.target);

      if (!sourceNode || !targetNode) {
        console.warn("onConnect: source or target node missing", { params });
        return;
      }

      // helper: normalize strings (lowercase, remove trailing 'handle' if present)
      const norm = (v: any) =>
        typeof v === "string" ? v.toLowerCase().replace(/handle$/, "") : v;

      const sourceHandleId = params.sourceHandle ?? null;
      const targetHandleId = params.targetHandle ?? null;

      // find handle def by id/name OR fallback to unique handle by type
      const findHandleDef = (node: any, handleId: any, handleType: "source" | "target") => {
        const defs = node?.constraints?.nodeHandles ?? [];

        // 1) try exact id/name match (normalized)
        if (handleId != null) {
          const f = defs.find((h: any) => norm(h.name) === norm(handleId));
          if (f) return f;
        }

        // 2) try to find a handle with the requested type and matching name if handleId present
        if (handleId != null) {
          const f2 = defs.find((h: any) => norm(h.name) === norm(handleId));
          if (f2) return f2;
        }

        // 3) fallback: find the first handle with the requested type
        const byType = defs.filter((h: any) => h.type === handleType);
        if (byType.length === 1) return byType[0]; // unambiguous fallback
        if (byType.length > 1 && handleId == null) {
          // ambiguous: multiple handles of same type and no id provided
          return null;
        }

        return null;
      };

      const sourceHandleDef = findHandleDef(sourceNode, sourceHandleId, "source");
      const targetHandleDef = findHandleDef(targetNode, targetHandleId, "target");

      if (!sourceHandleDef) {
        console.warn("onConnect: could not resolve source handle definition", {
          sourceNode: sourceNode.id,
          sourceHandleId,
          defs: sourceNode?.constraints?.nodeHandles,
        });
        return;
      }

      if (!targetHandleDef) {
        console.warn("onConnect: could not resolve target handle definition", {
          targetNode: targetNode.id,
          targetHandleId,
          defs: targetNode?.constraints?.nodeHandles,
        });
        return;
      }

      // Check allowed LinkTo entries on the source handle
      const allowed = sourceHandleDef.LinkTo ?? [];

      const acceptsTarget = allowed.some((allowedEntry: any) => {
        // allowedEntry.nodeName should match targetNode.type
        // allowedEntry.handlePosition should match the resolved target handle name
        return (
          norm(allowedEntry.nodeName) === norm(targetNode.type) &&
          norm(allowedEntry.handlePosition) === norm(targetHandleDef.name)
        );
      });

      // Optional fallback: allow if target handle explicitly allows incoming from the source (uncomment if desired)
      /*
      const targetAllowsSource = (targetNode.constraints?.nodeHandles ?? [])
        .find(h => norm(h.name) === norm(targetHandleDef.name))?.LinkTo?.some((entry:any) =>
          norm(entry.nodeName) === norm(sourceNode.type) && norm(entry.handlePosition) === norm(sourceHandleDef.name)
        ) ?? false;
      */

      if (!acceptsTarget /* && !targetAllowsSource */) {
        console.warn(
          `Invalid connection: ${sourceNode.type} (${sourceHandleDef.name}) → ${targetNode.type} (${targetHandleDef.name})`,
          { params }
        );
        return;
      }

      // Passed validation — create edge
      const isToolConnection =
        sourceNode?.type === "tool" || targetNode?.type === "tool";

      const edgeObj = {
        id: edgeId,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: params.target,
        targetHandle: params.targetHandle,
        animated: false,
        style: isToolConnection ? { strokeDasharray: "6 6", stroke: "#888" } : undefined,
      };

      state.edges = addEdge(edgeObj, state.edges);
    },


  },
});

export const { setNodes, setEdges, onNodesChange, onEdgesChange, addNode, onConnect } =
  flowSlice.actions;

export default flowSlice.reducer;
