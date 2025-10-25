// TestingPage.tsx
import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  MiniMap,
  Handle,
  Position,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";

/* --- custom nodes (same as yours) --- */
function AgentNode({ data }) {
  return (
    <div className="rounded-xl border-2 border-green-400 bg-gray-900 text-white px-4 py-3 shadow-md min-w-[200px]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">

<svg fill="#ffffff" width="64" height="64" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect x="18" y="10" width="2" height="2"/>
  <rect x="12" y="10" width="2" height="2"/>
  <path d="M26,20H21V18h1a2.0023,2.0023,0,0,0,2-2V12h2V10H24V8a2.0023,2.0023,0,0,0-2-2H20V2H18V6H14V2H12V6H10A2.0023,2.0023,0,0,0,8,8v2H6v2H8v4a2.0023,2.0023,0,0,0,2,2h1v2H6a2.0023,2.0023,0,0,0-2,2v8H6V22H26v8h2V22A2.0023,2.0023,0,0,0,26,20ZM10,8H22v8H10Zm3,10h6v2H13Z"/>
  <rect className="cls-1" width="32" height="32" fill="none"/>
</svg>

        </div>

        <div>
          <div className="font-semibold text-sm">{data.label || "AI Agent"}</div>
          <div className="text-xs text-gray-400">{data.sub || "Tools Agent"}</div>
        </div>
      </div>

      {/* Handles: left TARGET (inputs), right SOURCE (outputs), bottom SOURCE (tools) */}
      <Handle type="target" position={Position.Left} id="in" style={{ background: "#10B981" }} />
      <Handle type="source" position={Position.Right} id="out" style={{ background: "#10B981" }} />
      <Handle type="source" position={Position.Bottom} id="tools" style={{ background: "#10B981" }} />
    </div>
  );
}

function ToolNode({ data }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full border-2 border-gray-400 bg-gray-800 text-white w-20 h-20 flex items-center justify-center shadow-md">
        {data.icon ? <img src={data.icon} alt="tool" className="w-8 h-8" /> : <div className="text-xl text-white">🔎</div>}
      </div>
      <div className="mt-2 text-xs text-gray-300">{data.label}</div>

      {/* Top target so connections from agent bottom will be vertical */}
      <Handle type="target" position={Position.Top} id="tool_in" style={{ background: "#9CA3AF" }} />
    </div>
  );
}

function InputNode({ data }) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium text-gray-600">{data.label || "Input"}</div>
      <Handle type="source" position={Position.Right} id="out" style={{ background: "#3B82F6" }} />
    </div>
  );
}

function OutputNode({ data }) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium">{data.label || "Output"}</div>
      <Handle type="target" position={Position.Left} id="in" style={{ background: "#F59E0B" }} />
    </div>
  );
}

/* register node types */
const nodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};

export default function TestingPage2() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [idCount, setIdCount] = useState(1);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  /**
   * FIXED onConnect:
   * - create a stable edge id
   * - compute dashed style if either side is a `tool`
   * - call addEdge(edgeObj, eds) to ensure ReactFlow keys are set
   *
   * Note: include `nodes` in deps so we always inspect the current nodes state.
   */
  const onConnect = useCallback(
    (params) => {
      // build a unique edge id (source-target-handle + timestamp)
      const edgeId = `e-${params.source}-${params.sourceHandle ?? "s"}-${params.target}-${params.targetHandle ?? "t"}-${Date.now()}`;

      // find nodes in the current nodes state
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      const isToolConnection = sourceNode?.type === "tool" || targetNode?.type === "tool";

      const edgeObj = {
        id: edgeId,
        source: params.source,
        sourceHandle: params.sourceHandle,
        target: params.target,
        targetHandle: params.targetHandle,
        animated: false,
        // dashed style for tool-involved connections
        style: isToolConnection ? { strokeDasharray: "6 6", stroke: "#9CA3AF" } : undefined,
      };

      setEdges((eds) => addEdge(edgeObj, eds));
    },
    [nodes]
  );

  const addNode = useCallback(
    (type: "agent" | "tool" | "inputNode" | "outputNode") => {
      const id = `n${idCount}`;
      let newNode: any;

      if (type === "agent") {
        newNode = {
          id,
          type: "agent",
          position: { x: 300 + Math.random() * 40, y: 120 + Math.random() * 40 },
          data: { label: "AI Agent", sub: "Tools Agent" },
        };
      } else if (type === "tool") {
        newNode = {
          id,
          type: "tool",
          position: { x: 200 + Math.random() * 600, y: 360 + Math.random() * 120 },
          data: { label: "Search Tool", icon: "https://cdn-icons-png.flaticon.com/512/25/25313.png" },
        };
      } else if (type === "inputNode") {
        newNode = {
          id,
          type: "inputNode",
          position: { x: 50 + Math.random() * 40, y: 100 + Math.random() * 250 },
          data: { label: "Input Trigger" },
        };
      } else {
        newNode = {
          id,
          type: "outputNode",
          position: { x: 900 + Math.random() * 40, y: 100 + Math.random() * 250 },
          data: { label: "Output Action" },
        };
      }

      setNodes((nds) => [...nds, newNode]);
      setIdCount((c) => c + 1);
    },
    [idCount]
  );

  return (
    <ReactFlowProvider>
      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <Button onClick={() => addNode("agent")}>Add Agent Node</Button>
          <Button onClick={() => addNode("tool")}>Add Tool Node</Button>
          <Button onClick={() => addNode("inputNode")}>Add Input Node</Button>
          <Button onClick={() => addNode("outputNode")}>Add Output Node</Button>
        </div>

        <div style={{ width: "100%", height: "75vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* debug / live JSON */}
        <div className="mt-4 flex gap-4">
          <div style={{ flex: 1 }}>
            <div className="text-sm font-semibold mb-1">Nodes</div>
            <pre className="bg-gray-800 text-white p-2 rounded text-xs max-h-48 overflow-auto">
              {JSON.stringify(nodes, null, 2)}
            </pre>
          </div>

          <div style={{ flex: 1 }}>
            <div className="text-sm font-semibold mb-1">Edges</div>
            <pre className="bg-gray-800 text-white p-2 rounded text-xs max-h-48 overflow-auto">
              {JSON.stringify(edges, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
