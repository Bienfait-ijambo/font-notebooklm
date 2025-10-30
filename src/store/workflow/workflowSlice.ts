// src/store/flowSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react'
import { gmailNodeConfig } from "./gmailConfig";
import { outputNodeConfig } from "./outputNodeConfig";
import { driveNodeConfig } from "./driveNodeConfig";
import { notionNodeConfig } from "./notionNodeConfig";
import { vectordbNodeConfig } from "./vectordbNodeConfig";
import { embeddingModelNodeConfig } from "./embebbeingModelNodeConfig";
import { discordNodeConfig } from "./discordNodeConfig";
import { slackNodeConfig } from "./slackNodeConfig";
import { calendarNodeConfig } from "./calendarNodeConfig";
import { toolNodeConfig } from "./toolNodeConfig";
import { inputNodeConfig } from "./inputNodeConfig";

export type NodeCategoryType="agent"|"tool"|"app"
export type NodeType = "agent" |'calendarNode'| 'embeddingModelNode' | 'vectordbNode' | "tool" | "inputNode" | 'notionNode' | 'gmailNode' | "outputNode" | 'slackNode' | 'driveNode' | 'discordNode'
export type NodeObjType = {
  id: string, type: NodeType,category?:NodeCategoryType, position: { x: number, y: number },
  data: { label: string, ui?: {}, sub?: string, icon: string,type?:string,name?:string,config?:Record<string,any> },
  constraints: {
    nodeHandles: Array<{
      name: 'top' | 'left' | 'right' | 'bottom',
      type: 'target' | 'source',
      LinkTo: Array<{ nodeName: NodeType, handlePosition: 'top' | 'left' | 'right' | 'bottom' }>
    }>
  }
}
interface FlowState {
  nodes: any[];
  edges: any[];
  idCount: number;
  selectedNode:NodeObjType[]|null
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNode:[],
  idCount: 1,
};



export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {


     setSelectedNode(state, action: PayloadAction<any[]>) {
      state.selectedNode = action.payload;
    },
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
      action: PayloadAction<{ node: NodeType, icon: string, label: string }>


    ) {
      const { icon, label } = action.payload
      const id = `n${state.idCount}`;
      let newNode: NodeObjType;

      if (action.payload.node === "agent") {
        newNode = {
          id,
          type: "agent",
          position: { x: 300 + Math.random() * 180, y: 120 + Math.random() * 60 },
          data: {
            label: "AI Agent", icon: "", sub: "Tools Agent",
            instructions:"",
            model:""
            // ui: {
            //   nodeStyle: { border: "1px solid #ccc", padding: 6 },
            //   highlightNodeStyle: { boxShadow: "0 0 0 4px rgba(34,197,94,0.12)" },
            //   invalidNodeStyle: { boxShadow: "0 0 0 6px rgba(239,68,68,0.18)" },
            //   flashDurationMs: 800,
            //   rejectMessage: "Invalid connection"
            // }

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
                LinkTo: [{ nodeName: 'tool', handlePosition: "top" }],

              },
              {
                name: 'right',
                type: 'source',
                LinkTo: [{ nodeName: "outputNode", handlePosition: "left" }],

              },
            ],
          },
        } as NodeObjType;
      } else if (action.payload.node === "tool") {
        newNode = toolNodeConfig({ id, label, icon })
      } else if (action.payload.node === "inputNode") {
        newNode = inputNodeConfig({ id, label, icon })
      }




      else if (action.payload.node === 'embeddingModelNode') {
        newNode = embeddingModelNodeConfig({ id, label, icon })
      }
      else if (action.payload.node === "vectordbNode") {
        newNode = vectordbNodeConfig({ id, label, icon })
      }
      else if (action.payload.node === "gmailNode") {
        newNode = gmailNodeConfig({ id, label, icon })
      }

      else if (action.payload.node === 'notionNode') {
        newNode = notionNodeConfig({ id, label, icon })
      }

      else if (action.payload.node === 'driveNode') {
        newNode = driveNodeConfig({ id, label, icon })
      }
       else if (action.payload.node === 'discordNode') {
        newNode = discordNodeConfig({ id, label, icon })
      }
       else if (action.payload.node === 'slackNode') {
        newNode = slackNodeConfig({ id, label, icon })
      }
       else if (action.payload.node === 'calendarNode') {
        newNode = calendarNodeConfig({ id, label, icon })
      }

      // calendarNode

      // outputnode
      else {
        newNode = outputNodeConfig({ id, label, icon })
      }

      state.nodes.push(newNode);
      state.idCount += 1;
    },
    onConnect(state, action: PayloadAction<any>) {
      const params = action.payload;
      const edgeId = `e-${params.source}-${params.sourceHandle ?? "s"}-${params.target}-${params.targetHandle ?? "t"}-${Date.now()}`;

      const sourceNode = state.nodes.find((n) => n.id === params.source);
      const targetNode = state.nodes.find((n) => n.id === params.target);

      if (!sourceNode || !targetNode) {
        console.warn("onConnect: source or target node missing", { params });
        return;
      }

      // --------------------------
      // Helpers: normalization & aliasing
      // --------------------------
      const norm = (v: any) =>
        typeof v === "string" ? v.toLowerCase().replace(/handle$/, "").trim() : v;

      // common aliases: map common handle ids to logical names
      const aliasMap: Record<string, string> = {
        in: "left",
        input: "left",
        left: "left",
        out: "right",
        output: "right",
        right: "right",
        tools: "bottom",
        tool: "bottom",
        bottom: "bottom",
        top: "top",
      };

      const resolveAlias = (s: any) => {
        if (typeof s !== "string") return s;
        const n = norm(s);
        return aliasMap[n] ?? n;
      };

      // --------------------------
      // Find handle definition robustly
      // Attempts:
      // 1) match by constraint.name normalized
      // 2) match by alias of provided handleId (params.*Handle)
      // 3) if handleId missing: if there's exactly one handle of requested type, use it
      // --------------------------
      const findHandleDef = (node: any, handleId: any, handleType: "source" | "target") => {
        const defs = node?.constraints?.nodeHandles ?? [];

        // 1) try exact name match
        if (handleId != null) {
          const nameNorm = norm(handleId);
          const f = defs.find((h: any) => norm(h.name) === nameNorm);
          if (f) return f;
        }

        // 2) try alias match (handles where alias of name matches handleId OR alias of handleId matches name)
        if (handleId != null) {
          const handleAlias = resolveAlias(handleId);
          const fAlias = defs.find((h: any) => {
            const hNameAlias = resolveAlias(h.name);
            return norm(hNameAlias) === norm(handleAlias) || norm(hNameAlias) === norm(handleId);
          });
          if (fAlias) return fAlias;
        }

        // 3) if handleId is null or previous failed, try to find a single handle by type
        const byType = defs.filter((h: any) => norm(h.type) === norm(handleType));
        if (byType.length === 1) return byType[0];

        // 4) as last resort, try to find by positional keywords (common)
        // e.g., if handleId says "out" -> match a handle named "right"
        if (handleId != null) {
          const handleAlias = resolveAlias(handleId);
          const fPos = defs.find((h: any) => resolveAlias(h.name) === handleAlias);
          if (fPos) return fPos;
        }

        return null;
      };

      const sourceHandleDef = findHandleDef(sourceNode, params.sourceHandle ?? null, "source");
      const targetHandleDef = findHandleDef(targetNode, params.targetHandle ?? null, "target");

      if (!sourceHandleDef) {
        console.warn("onConnect: could not resolve source handle definition", {
          sourceNode: sourceNode.id,
          sourceHandleId: params.sourceHandle,
          defs: sourceNode?.constraints?.nodeHandles,
        });
        return;
      }
      if (!targetHandleDef) {
        console.warn("onConnect: could not resolve target handle definition", {
          targetNode: targetNode.id,
          targetHandleId: params.targetHandle,
          defs: targetNode?.constraints?.nodeHandles,
        });
        return;
      }

      // --------------------------
      // Dynamic acceptance logic
      // - Primary: check sourceHandleDef.LinkTo
      // - Secondary (optional): check targetHandleDef.LinkTo for symmetric rules
      // - Matching rules are normalized (aliases accepted)
      // --------------------------
      const acceptsFromSource = (() => {
        const allowed = sourceHandleDef?.LinkTo ?? [];
        if (!Array.isArray(allowed) || allowed.length === 0) return false;

        return allowed.some((allowedEntry: any) => {
          // nodeName must match the target node's type
          if (norm(allowedEntry.nodeName) !== norm(targetNode.type)) return false;

          // handlePosition in allowedEntry may be an alias; normalize both
          const allowedPos = resolveAlias(allowedEntry.handlePosition ?? allowedEntry.handle ?? "");
          const targetPos = resolveAlias(targetHandleDef.name ?? "");
          return norm(allowedPos) === norm(targetPos);
        });
      })();

      // Optional symmetric check: target explicitly accepts incoming from source
      const acceptsFromTarget = (() => {
        const allowed = targetHandleDef?.LinkTo ?? [];
        if (!Array.isArray(allowed) || allowed.length === 0) return false;

        return allowed.some((allowedEntry: any) => {
          if (norm(allowedEntry.nodeName) !== norm(sourceNode.type)) return false;
          const allowedPos = resolveAlias(allowedEntry.handlePosition ?? allowedEntry.handle ?? "");
          const sourcePos = resolveAlias(sourceHandleDef.name ?? "");
          return norm(allowedPos) === norm(sourcePos);
        });
      })();

      // decide: accept if either side explicitly allows it (makes the system flexible)
      const accepted = acceptsFromSource || acceptsFromTarget;

      // construct readable rule explanation
      const ruleExplanation = accepted
        ? `Allowed by ${acceptsFromSource ? "source LinkTo" : "target LinkTo"} rule`
        : `Rejected: no matching LinkTo rule (${sourceNode.type}.${sourceHandleDef.name} → ${targetNode.type}.${targetHandleDef.name})`;

      if (!accepted) {
        console.warn(ruleExplanation, {
          sourceNode: sourceNode.id,
          sourceHandle: sourceHandleDef.name,
          targetNode: targetNode.id,
          targetHandle: targetHandleDef.name,
          params,
        });
        return;
      }

      // Passed validation — create edge
      const isToolConnection = sourceNode?.type === "tool" || targetNode?.type === "tool";

      const edgeObj = {
        id: edgeId,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: params.target,
        targetHandle: params.targetHandle,
        animated: false,
        style: isToolConnection ? { strokeDasharray: "6 6", stroke: "#888" } : undefined,
        meta: { rule: ruleExplanation }, // attach rule for debugging/UI if you want
      };

      state.edges = addEdge(edgeObj, state.edges);
    },





  },
});

export const { setSelectedNode,setNodes, setEdges, onNodesChange, onEdgesChange, addNode, onConnect } =
  flowSlice.actions;

export default flowSlice.reducer;
