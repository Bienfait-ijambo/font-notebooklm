import React, { useCallback, useRef, useState } from "react";
import  {
    ReactFlow,
  ReactFlowProvider,
  addEdge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// shadcn/ui components (assumes you have shadcn installed and configured)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// lucide icons
import { Grid, PlusCircle, Settings, Send, GitBranch } from "lucide-react";

/*
  Workflow Dashboard

  Design notes (step-by-step thinking, captured as comments):
  1) Layout: a top Navbar for global actions, a leftPanel for node library (draggable),
     a center canvas using reactflow, and a rightPanel for node configuration.
  2) Accessibility: keyboard controls come from ReactFlow Controls + clear focus states.
  3) Node drag-and-drop: implement native HTML5 drag start using dataTransfer with a node type.
  4) Node selection & editing: selected node is stored in state; rightPanel shows editable fields.
  5) Styling: Tailwind for layout & spacing; shadcn/ui Cards and Buttons for consistent look.

  How to use: drop this component in a page (e.g. pages/workflow.tsx in Next.js), make sure
  dependencies are installed: reactflow, lucide-react, @/components/ui (shadcn), tailwind.
*/

const initialNodes = [
  {
    id: "1",
    type: "default",
    position: { x: 50, y: 60 },
    data: { label: "Google Drive — New File" },
  },
  {
    id: "2",
    type: "default",
    position: { x: 350, y: 200 },
    data: { label: "AI Summary Agent" },
  },
  {
    id: "3",
    type: "default",
    position: { x: 750, y: 200 },
    data: { label: "Gmail — Send Email" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", markerEnd: { type: MarkerType.Arrow } },
  { id: "e2-3", source: "2", target: "3", markerEnd: { type: MarkerType.Arrow } },
];

export default function WorkflowDashboard() {
  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  // UI state
  const [selectedNode, setSelectedNode] = useState(null);

  // Node library
  const nodeTypes = [
    { type: "trigger", label: "Trigger — Google Drive", icon: <GitBranch size={16} /> },
    { type: "agent", label: "AI Agent", icon: <Grid size={16} /> },
    { type: "action", label: "Action — Gmail", icon: <Send size={16} /> },
  ];

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds)),
    [setEdges]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const position = rfInstance.project({ x: event.clientX - reactFlowBounds.left, y: event.clientY - reactFlowBounds.top });
    const id = String(+new Date());
    const newNode = {
      id,
      type: "default",
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onSelectionChange = ({ nodes: selectedNodes }) => {
    if (selectedNodes && selectedNodes.length > 0) setSelectedNode(selectedNodes[0]);
    else setSelectedNode(null);
  };

  const updateSelectedNodeLabel = (value) => {
    if (!selectedNode) return;
    setNodes((nds) => nds.map((n) => (n.id === selectedNode.id ? { ...n, data: { ...n.data, label: value } } : n)));
    setSelectedNode((s) => ({ ...s, data: { ...s.data, label: value } }));
  };

  const removeSelectedNode = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
    setSelectedNode(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="p-2">
            <Grid />
          </Button>
          <h1 className="text-lg font-semibold">Workflow — Dashboard</h1>
          <span className="text-sm text-muted-foreground ml-2">Draft</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-2">
            <Button>Test run</Button>
            <Button>Save</Button>
          </div>
          <Button variant="outline">Publish</Button>
        </div>
      </nav>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Node library */}
        <aside className="w-72 border-r bg-white p-4 overflow-auto">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle />
                Add Nodes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3 mt-2">
                {nodeTypes.map((n) => (
                  <div
                    key={n.type}
                    draggable
                    onDragStart={(e) => onDragStart(e, n.type)}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-grab border"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded bg-slate-100">{n.icon}</div>
                    <div className="flex-1 text-sm font-medium">{n.label}</div>
                    <div className="text-xs text-muted-foreground">drag</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Quick actions</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Import</Button>
                <Button size="sm">Templates</Button>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Center: ReactFlow Canvas */}
        <main className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <div className="absolute inset-0">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setRfInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onSelectionChange={onSelectionChange}
                fitView
                style={{ width: "100%", height: "100%" }}
              >
                <MiniMap />
                <Controls />
                <Background gap={16} />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </main>

        {/* Right Panel: Node configuration */}
        <aside className="w-96 border-l bg-white p-4 overflow-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Node Configuration</h3>
            <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
              <Settings />
            </Button>
          </div>

          <Separator className="my-3" />

          {selectedNode ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedNode.data?.label || `Node ${selectedNode.id}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="text-xs text-muted-foreground">Label</label>
                <Input
                  value={selectedNode.data?.label || ""}
                  onChange={(e) => updateSelectedNodeLabel(e.target.value)}
                  className="mt-2"
                />

                <label className="text-xs text-muted-foreground mt-4">Description</label>
                <Input placeholder="Short description" className="mt-2" />

                <div className="mt-4 flex gap-2">
                  <Button onClick={removeSelectedNode}>Delete Node</Button>
                  <Button variant="outline">Duplicate</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-sm text-muted-foreground">
              Select a node on the canvas to edit its configuration. You can drag nodes from the left
              library into the canvas.
            </div>
          )}

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Run & Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Execute workflows, view logs & executions.</p>
                <div className="mt-3 flex gap-2">
                  <Button>Execute</Button>
                  <Button variant="ghost">View Logs</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
