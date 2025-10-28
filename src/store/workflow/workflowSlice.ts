// src/store/flowSlice.ts
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
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
  action: PayloadAction<"agent" | "tool" | "inputNode" | "outputNode">
) {
  const id = `n${state.idCount}`;
  let newNode: any;

  if (action.payload === "agent") {
    newNode = {
      id,
      type: "agent",
      position: { x: 300 + Math.random() * 180, y: 120 + Math.random() * 60 },
      data: { label: "AI Agent", sub: "Tools Agent" },
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
          // added
          {
            name: "right",
            type: "source",
            LinkTo: [{ nodeName: "outputNode", handlePosition: "left" }],
          },
        ],
      },
    };
  } else if (action.payload === "tool") {
    newNode = {
      id,
      type: "tool",
      position: { x: 120 + Math.random() * 800, y: 360 + Math.random() * 140 },
      data: { label: "Search Tool", icon: "🔧" },
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
  } else if (action.payload === "inputNode") {
    newNode = {
      id,
      type: "inputNode",
      position: { x: 40 + Math.random() * 120, y: 120 + Math.random() * 240 },
      data: { label: "Input Message" },
      constraints: {
        nodeHandles: [
          {
            name: "right",
            type: "source",
            LinkTo: [{ nodeName: "agent", handlePosition: "left" }],
          },
          
        ],
      },
    };
  } else {
    newNode = {
      id,
      type: "outputNode",
      position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
      data: { label: "Output Action" },
      constraints: {
        nodeHandles: [
          {
            name: "left",
            type: "target",
            LinkTo: [{ nodeName: "agent", handlePosition: "right" }],
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


// onConnect(state, action: PayloadAction<any>) {
//   const params = action.payload;

//   const edgeId = `e-${params.source}-${params.sourceHandle ?? "s"}-${params.target}-${params.targetHandle ?? "t"}-${Date.now()}`;

//   const sourceNode = state.nodes.find((n) => n.id === params.source);
//   const targetNode = state.nodes.find((n) => n.id === params.target);

//   if (!sourceNode || !targetNode) {
//     console.warn("onConnect: source or target node missing", { params });
//     return;
//   }

//   // helper: normalize strings (lowercase, remove trailing 'handle' if present)
//   const norm = (v: any) =>
//     typeof v === "string" ? v.toLowerCase().replace(/handle$/, "") : v;

//   const sourceHandleId = params.sourceHandle ?? null;
//   const targetHandleId = params.targetHandle ?? null;

//   // find handle def by id/name OR fallback to unique handle by type
//   const findHandleDef = (node: any, handleId: any, handleType: "source" | "target") => {
//     const defs = node?.constraints?.nodeHandles ?? [];

//     // 1) try exact id/name match (normalized)
//     if (handleId != null) {
//       const f = defs.find((h: any) => norm(h.name) === norm(handleId));
//       if (f) return f;
//     }

//     // 2) try to find a handle with the requested type and matching name if handleId present
//     if (handleId != null) {
//       const f2 = defs.find((h: any) => norm(h.name) === norm(handleId));
//       if (f2) return f2;
//     }

//     // 3) fallback: find the first handle with the requested type
//     const byType = defs.filter((h: any) => h.type === handleType);
//     if (byType.length === 1) return byType[0]; // unambiguous fallback
//     if (byType.length > 1 && handleId == null) {
//       // ambiguous: multiple handles of same type and no id provided
//       return null;
//     }

//     return null;
//   };

//   const sourceHandleDef = findHandleDef(sourceNode, sourceHandleId, "source");
//   const targetHandleDef = findHandleDef(targetNode, targetHandleId, "target");

//   if (!sourceHandleDef) {
//     console.warn("onConnect: could not resolve source handle definition", {
//       sourceNode: sourceNode.id,
//       sourceHandleId,
//       defs: sourceNode?.constraints?.nodeHandles,
//     });
//     return;
//   }

//   if (!targetHandleDef) {
//     console.warn("onConnect: could not resolve target handle definition", {
//       targetNode: targetNode.id,
//       targetHandleId,
//       defs: targetNode?.constraints?.nodeHandles,
//     });
//     return;
//   }

//   // Check allowed LinkTo entries on the source handle
//   const allowed = sourceHandleDef.LinkTo ?? [];

//   const acceptsTarget = allowed.some((allowedEntry: any) => {
//     // allowedEntry.nodeName should match targetNode.type
//     // allowedEntry.handlePosition should match the resolved target handle name
//     return (
//       norm(allowedEntry.nodeName) === norm(targetNode.type) &&
//       norm(allowedEntry.handlePosition) === norm(targetHandleDef.name)
//     );
//   });

//   // Optional fallback: allow if target handle explicitly allows incoming from the source (uncomment if desired)
//   /*
//   const targetAllowsSource = (targetNode.constraints?.nodeHandles ?? [])
//     .find(h => norm(h.name) === norm(targetHandleDef.name))?.LinkTo?.some((entry:any) =>
//       norm(entry.nodeName) === norm(sourceNode.type) && norm(entry.handlePosition) === norm(sourceHandleDef.name)
//     ) ?? false;
//   */

//   if (!acceptsTarget /* && !targetAllowsSource */) {
//     console.warn(
//       `Invalid connection: ${sourceNode.type} (${sourceHandleDef.name}) → ${targetNode.type} (${targetHandleDef.name})`,
//       { params }
//     );
//     return;
//   }

//   // Passed validation — create edge
//   const isToolConnection =
//     sourceNode?.type === "tool" || targetNode?.type === "tool";

//   const edgeObj = {
//     id: edgeId,
//     source: params.source,
//     sourceHandle: params.sourceHandle,
//     target: params.target,
//     targetHandle: params.targetHandle,
//     animated: false,
//     style: isToolConnection ? { strokeDasharray: "6 6", stroke: "#888" } : undefined,
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

export const { setNodes, setEdges, onNodesChange, onEdgesChange, addNode,onConnect } =
  flowSlice.actions;

export default flowSlice.reducer;
