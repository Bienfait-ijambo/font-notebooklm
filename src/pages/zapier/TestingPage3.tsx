// TestingPage.tsx
import React, { useCallback, useEffect, useState } from "react";
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

/**
 * ------------------------------
 * THEME / tweakable colors (change here)
 * ------------------------------
 */
const THEME = {
  agentBorder: "#10B981", // green border for agent handles/outline
  toolBorder: "#9CA3AF", // tool handle color
  inputHandle: "#3B82F6",
  outputHandle: "#F59E0B",
  dashedStroke: "#9CA3AF",
  agentBg: "bg-gray-900", // tailwind classes; change or replace with inline styles
};

/**
 * ------------------------------
 * SAMPLE LLM MODEL (your DB doc)
 * ------------------------------
 */
const sampleModel = {
  agentInfo: {
    _id: "68fbd873be0ddbc1857df57f",
    name: "Support Assistant",
    instructions: "You are a friendly support assistant. Always respond the user in kindful way",
    includeChatHistory: true,
    model: "accounts/fireworks/models/deepseek-v3p1",
    reasoningEffort: "medium",
    testingInput: "hello",
    tools: [
      { name: "Gmail", type: "gmail", config: { accountId: "abc" }, enabled: true },
      { name: "KnowledgeBase", type: "search", config: {}, enabled: true },
      { name: "WebSearch", type: "webSearch", config: { index: "kb" }, enabled: true },
      { name: "ScrapeTool", type: "webSearch", config: { input: { query: "string" } }, enabled: true },
    ],
    temperature: 0,
    maxTokens: 1024,
    owner: "68beb16d17836bc4d0e84bda",
    active: true,
  },
};

/**
 * ------------------------------
 * ICON helper - replace URLs with your assets
 * ------------------------------
 */
function getIconForTool(type: string) {
  const map: Record<string, string> = {
    gmail: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
    search: "https://cdn-icons-png.flaticon.com/512/622/622669.png",
    webSearch: "https://cdn-icons-png.flaticon.com/512/151/151773.png",
    default: "https://cdn-icons-png.flaticon.com/512/25/25313.png",
  };
  return map[type] ?? map.default;
}

/**
 * ------------------------------
 * Custom Nodes (Agent / Tool / Input / Output)
 * ------------------------------
 * Adjust styles here if you want other colors or sizes.
 * ------------------------------
 */

function AgentNode({ data }: any) {
  return (
    <div
      className={`rounded-xl border-2 ${THEME.agentBg} text-white px-4 py-3 shadow-md min-w-[220px]`}
      style={{ borderColor: THEME.agentBorder }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
          {/* inline SVG bot icon - color controlled by fill */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="7" y="6" width="10" height="8" rx="2" stroke="white" strokeWidth="1.2" />
            <circle cx="9" cy="10" r="0.7" fill="white" />
            <circle cx="15" cy="10" r="0.7" fill="white" />
            <path d="M9 16c1 1 3 1 4 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        <div>
          <div className="font-semibold text-sm">{data.label || "AI Agent"}</div>
          <div className="text-xs text-gray-400">{data.sub || data.meta?.model || "Tools Agent"}</div>
        </div>
      </div>

      {/* Handles: left TARGET (inputs), right SOURCE (outputs), bottom SOURCE (tools) */}
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        style={{ background: THEME.agentBorder }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ background: THEME.agentBorder }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="tools"
        style={{ background: THEME.agentBorder }}
      />
    </div>
  );
}

function ToolNode({ data }: any) {
  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="rounded-full bg-gray-800 text-white w-20 h-20 flex items-center justify-center shadow-md"
        style={{ border: `2px solid ${THEME.toolBorder}` }}
      >
        {data.icon ? (
          // icon image - if you use SVGs that require color changes, set their fill to currentColor
          <img src={data.icon} alt="tool" className="w-8 h-8" />
        ) : (
          <div className="text-xl">🔎</div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-300 text-center max-w-[80px]">{data.label}</div>

      {/* Top target so connections from agent bottom will be vertical */}
      <Handle type="target" position={Position.Top} id="tool_in" style={{ background: THEME.toolBorder }} />
    </div>
  );
}

function InputNode({ data }: any) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium text-white">{data.label || "Input"}</div>
      <Handle type="source" position={Position.Right} id="out" style={{ background: THEME.inputHandle }} />
    </div>
  );
}

function OutputNode({ data }: any) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium">{data.label || "Output"}</div>
      <Handle type="target" position={Position.Left} id="in" style={{ background: THEME.outputHandle }} />
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

/**
 * ------------------------------
 * Convert LLM doc -> nodes + edges
 * ------------------------------
 */
function convertModelToGraph(agentDoc: any) {
  const nodes: any[] = [];
  const edges: any[] = [];
  const agentId = `agent_${agentDoc._id}`;

  // center agent
  nodes.push({
    id: agentId,
    type: "agent",
    position: { x: 400, y: 120 },
    data: {
      label: agentDoc.name || "AI Agent",
      sub: agentDoc.model || "",
      meta: agentDoc,
    },
  });

  const tools = agentDoc.tools ?? [];
  const toolSpacing = 140;
  const startX = Math.max(120, 400 - (tools.length * toolSpacing) / 2);
  const y = 320;

  tools.forEach((tool: any, idx: number) => {
    const id = `tool_${idx}_${tool.type}`;
    const x = startX + idx * toolSpacing;
    nodes.push({
      id,
      type: "tool",
      position: { x, y },
      data: {
        label: tool.name,
        icon: getIconForTool(tool.type),
        meta: tool,
      },
    });

    // dashed edge from agent bottom -> tool top
    edges.push({
      id: `e-${agentId}-${id}`,
      source: agentId,
      sourceHandle: "tools",
      target: id,
      targetHandle: "tool_in",
      animated: false,
      style: { strokeDasharray: "6 6", stroke: THEME.dashedStroke },
    });
  });

  return { nodes, edges };
}

/**
 * ------------------------------
 * Main component
 * ------------------------------
 */
export default function TestingPage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [idCount, setIdCount] = useState(1);

  // initialize from sampleModel on mount
  useEffect(() => {
    const { nodes: initNodes, edges: initEdges } = convertModelToGraph(sampleModel.agentInfo);
    setNodes(initNodes);
    setEdges(initEdges);
    setIdCount(initNodes.length + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  /**
   * onConnect: build deterministic edge id, check node types, apply dashed style for tool connections.
   * Include `nodes` in deps so we look up current nodes.
   */
  const onConnect = useCallback(
    (params: any) => {
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
        style: isToolConnection ? { strokeDasharray: "6 6", stroke: THEME.dashedStroke } : undefined,
      };

      setEdges((eds) => addEdge(edgeObj, eds));
    },
    [nodes]
  );

  // Add dynamic nodes (agent/tool/input/output)
  const addNode = useCallback(
    (type: "agent" | "tool" | "inputNode" | "outputNode") => {
      const id = `n${idCount}`;
      let newNode: any;

      if (type === "agent") {
        newNode = {
          id,
          type: "agent",
          position: { x: 300 + Math.random() * 180, y: 120 + Math.random() * 60 },
          data: { label: "AI Agent", sub: "Tools Agent" },
        };
      } else if (type === "tool") {
        newNode = {
          id,
          type: "tool",
          position: { x: 120 + Math.random() * 800, y: 360 + Math.random() * 140 },
          data: { label: "Search Tool", icon: getIconForTool("search") },
        };
      } else if (type === "inputNode") {
        newNode = {
          id,
          type: "inputNode",
          position: { x: 40 + Math.random() * 120, y: 120 + Math.random() * 240 },
          data: { label: "Input Trigger" },
        };
      } else {
        newNode = {
          id,
          type: "outputNode",
          position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
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
          <Button
            onClick={() => {
              // reload from the sample model (helpful when testing)
              const { nodes: initNodes, edges: initEdges } = convertModelToGraph(sampleModel.agentInfo);
              setNodes(initNodes);
              setEdges(initEdges);
              setIdCount(initNodes.length + 1);
            }}
          >
            Load Sample LLM
          </Button>
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
          <div style={{ flex: 1 }} >
            <div className="text-sm font-semibold mb-1">Nodes</div>
            <pre className="bg-gray-800 text-white p-2 rounded text-xs max-h-48 overflow-auto">{JSON.stringify(nodes, null, 2)}</pre>
          </div>

          <div style={{ flex: 1 }}>
            <div className="text-sm font-semibold mb-1">Edges</div>
            <pre className="bg-gray-800 text-white p-2 rounded text-xs max-h-48 overflow-auto">{JSON.stringify(edges, null, 2)}</pre>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}
