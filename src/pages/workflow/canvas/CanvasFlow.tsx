import React, { useCallback, useEffect, useRef, useState } from "react";
import  {ReactFlow,
  ReactFlowProvider,
  addEdge,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from  '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  Grid,
  PlusCircle,
  Settings,
  Send,
  GitBranch,
  X,
  Home,
  Search,
  ChevronLeft,
  ChevronRight,
  Columns,
  RotateCcw,
  RotateCw,
  Hand,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
/*
  Workflow Dashboard — Improved leftPanel + Undo/Redo + Floating Bottom Toolbar

  This update places a compact floating toolbar in the center-bottom of the canvas
  containing: Pan (hand), Execute (play), Undo, Redo.

  Behavior notes:
  - Pan mode: when active, node dragging is disabled and dragging the canvas will pan.
  - Select mode: when active, node dragging is enabled as usual.
  - Execute: placeholder callback (hook into your backend/executor).
  - Undo/Redo: wired to history implemented previously.

  The toolbar is absolutely positioned inside the main canvas container so it visually
  floats above the grid, centered horizontally and near the bottom (like the screenshot).
*/

const initialNodes = [
  { id: "1", type: "default", position: { x: 50, y: 60 }, data: { label: "Google Drive — New File" } },
  { id: "2", type: "default", position: { x: 350, y: 200 }, data: { label: "AI Summary Agent" } },
  { id: "3", type: "default", position: { x: 750, y: 200 }, data: { label: "Gmail — Send Email" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", markerEnd: { type: MarkerType.Arrow } },
  { id: "e2-3", source: "2", target: "3", markerEnd: { type: MarkerType.Arrow } },
];

const CanvasFlow = () => {
      // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  // UI state
  const [selectedNode, setSelectedNode] = useState(null);



  // interaction mode: 'select' (default) or 'pan'
  const [mode, setMode] = useState("select");

  // Node library (draggable)
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
    const newNode = { id, type: "default", position, data: { label: `${type} node` } };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // selection
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

  // ---- Undo / Redo history ----
  const historyRef = useRef({ stack: [], index: -1 });
  const isRestoring = useRef(false);
  const pushDebounceRef = useRef(null);
  const HISTORY_LIMIT = 80;

  // push snapshot into history (handles truncation)
  const pushHistory = useCallback((snapshot) => {
    const h = historyRef.current;
    // if we're restoring, don't push
    if (isRestoring.current) return;

    // when pushing new entry, drop any future entries
    if (h.index < h.stack.length - 1) {
      h.stack = h.stack.slice(0, h.index + 1);
    }

    h.stack.push(snapshot);
    if (h.stack.length > HISTORY_LIMIT) h.stack.shift();
    h.index = h.stack.length - 1;
  }, []);

  // restore snapshot at given index
  const restoreSnapshot = useCallback((snapshot) => {
    if (!snapshot) return;
    isRestoring.current = true;
    setNodes(snapshot.nodes || []);
    setEdges(snapshot.edges || []);
    setTimeout(() => {
      isRestoring.current = false;
    }, 0);
  }, [setNodes, setEdges]);

  // undo/redo helpers
  const canUndo = () => historyRef.current.index > 0;
  const canRedo = () => historyRef.current.index < historyRef.current.stack.length - 1;

  const undo = () => {
    const h = historyRef.current;
    if (h.index <= 0) return;
    h.index -= 1;
    const snapshot = h.stack[h.index];
    restoreSnapshot(snapshot);
  };

  const redo = () => {
    const h = historyRef.current;
    if (h.index >= h.stack.length - 1) return;
    h.index += 1;
    const snapshot = h.stack[h.index];
    restoreSnapshot(snapshot);
  };

  // debounce pushing history to avoid many snapshots during drags
  useEffect(() => {
    if (isRestoring.current) return;

    if (pushDebounceRef.current) clearTimeout(pushDebounceRef.current);
    pushDebounceRef.current = setTimeout(() => {
      pushHistory({ nodes, edges });
      pushDebounceRef.current = null;
    }, 300);

    return () => {
      if (pushDebounceRef.current) clearTimeout(pushDebounceRef.current);
    };
  }, [nodes, edges, pushHistory]);

  // push initial snapshot on mount
  useEffect(() => {
    pushHistory({ nodes: initialNodes, edges: initialEdges });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keyboard shortcuts for undo/redo
  useEffect(() => {
    const onKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
      if (!ctrlKey) return;

      if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      }

      if ((e.key.toLowerCase() === "z" && e.shiftKey) || e.key.toLowerCase() === "y") {
        e.preventDefault();
        if (canRedo()) redo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);


  // Execute workflow placeholder
  const executeWorkflow = () => {
    // Replace with your execution logic
    console.log("Execute workflow");
    // Optionally show visual feedback here
  };

    return ( 
        
         <div className="flex-1 relative" ref={reactFlowWrapper}>
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
                // Switch behavior based on mode: when in 'pan', disable node dragging so canvas pans
                nodesDraggable={mode === "select"}
                panOnDrag={mode === "pan"}
                style={{ width: "100%", height: "100%" }}
              >
                <MiniMap />
                <Controls />
                <Background gap={16} />
              </ReactFlow>

              {/* Floating center-bottom toolbar */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-white rounded-full shadow-xl px-4 py-2 flex items-center gap-3">
                  <button
                    aria-label="Pan (Hand)"
                    onClick={() => setMode((m) => (m === "pan" ? "select" : "pan"))}
                    className={`p-2 rounded-full ${mode === "pan" ? "bg-slate-100" : "hover:bg-slate-50"}`}
                    title="Pan (toggle)"
                  >
                    <Hand />
                  </button>

                  <button
                    aria-label="Execute workflow"
                    onClick={executeWorkflow}
                    className="p-2 rounded-full hover:bg-slate-50"
                    title="Execute workflow"
                  >
                    <Play />
                  </button>

                  <div className="w-px h-6 bg-slate-100" />

                  <button
                    aria-label="Undo"
                    onClick={undo}
                    disabled={!canUndo()}
                    className={`p-2 rounded-full ${canUndo() ? "hover:bg-slate-50" : "opacity-50 cursor-not-allowed"}`}
                    title="Undo (Ctrl/Cmd+Z)"
                  >
                    <RotateCcw />
                  </button>

                  <button
                    aria-label="Redo"
                    onClick={redo}
                    disabled={!canRedo()}
                    className={`p-2 rounded-full ${canRedo() ? "hover:bg-slate-50" : "opacity-50 cursor-not-allowed"}`}
                    title="Redo (Ctrl/Cmd+Shift+Z)"
                  >
                    <RotateCw />
                  </button>
                </div>
              </div>

              {/* Overlayed Node Config Panel (appears above canvas when a node is selected) */}
              {selectedNode && (
                <div className="absolute top-6 right-6 z-50 w-96 bg-white shadow-2xl rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold">{selectedNode.data?.label || `Node ${selectedNode.id}`}</div>
                      <div className="text-xs text-muted-foreground">Node ID: {selectedNode.id}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                        <X />
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex flex-col gap-3">
                    <label className="text-xs text-muted-foreground">Label</label>
                    <Input
                      value={selectedNode.data?.label || ""}
                      onChange={(e) => updateSelectedNodeLabel(e.target.value)}
                    />

                    <label className="text-xs text-muted-foreground">Description</label>
                    <Input placeholder="Short description (optional)" />

                    <div className="flex gap-2 mt-2">
                      <Button onClick={removeSelectedNode}>Delete node</Button>
                      <Button variant="outline">Duplicate</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ReactFlowProvider>
          </div>
          
        );
}
 
export default CanvasFlow;