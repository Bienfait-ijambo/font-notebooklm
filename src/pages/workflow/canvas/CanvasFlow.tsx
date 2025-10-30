import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType,
    applyNodeChanges,
    applyEdgeChanges,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import BottomToolBar from "./nodes/BottomToolbar";
import { getIconForTool } from "./nodes/utils";
import { nodeTypes } from "./nodes/registerNode";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { onConnect, onEdgesChange, onNodesChange, setEdges, setNodes, setSelectedNode, type NodeObjType } from "@/store/workflow/workflowSlice";


const CanvasFlow = () => {


    const reactFlowWrapper = useRef(null);
    const [rfInstance, setRfInstance] = useState(null);
    // interaction mode: 'select' (default) or 'pan'
    const [mode, setMode] = useState("select");



    const dispatch = useDispatch();
    const { nodes, edges,selectedNode } = useSelector((state: RootState) => state.flow);


    const handleNodesChange = useCallback(
        (changes: any) => dispatch(onNodesChange(changes)),
        [dispatch]
    );

    const handleEdgesChange = useCallback(
        (changes: any) => dispatch(onEdgesChange(changes)),
        [dispatch]
    );


    const handleConnect = useCallback(
        (params: any) => dispatch(onConnect(params)),
        [dispatch]
    );




// setNodes
    // Selection change drives the overlay
  const onSelectionChange = ({ nodes:selectedNodes }:{nodes:NodeObjType[]}) => {
    if (selectedNodes && selectedNodes.length > 0) dispatch(setSelectedNode(selectedNodes[0]));
    else dispatch(setSelectedNode(null));
  };

  const updateSelectedNodeLabel = (value) => {
    // if (!selectedNode) return;
    // dispatch(setNodes((nds) => nds.map((n) => (n.id === selectedNode.id ? { ...n, data: { ...n.data, label: value } } : n))));
    // dispatch(setSelectedNode((s) => ({ ...s, data: { ...s.data, label: value } })));
  };

  const removeSelectedNode = () => {
    if (!selectedNode) return;
   dispatch( setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id)));
   dispatch( setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id)))
   dispatch(setSelectedNode(null))
  };

 


    return (


        <div className="flex-1 relative" ref={reactFlowWrapper}>



            <ReactFlowProvider>
                <div className="absolute inset-0">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onConnect={handleConnect}
                        onNodesChange={handleNodesChange}
                        onEdgesChange={handleEdgesChange}
                        onSelectionChange={onSelectionChange}
                        fitView
                        nodesDraggable={mode === "select"}
                        panOnDrag={mode === "pan"}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <MiniMap />
                        <Controls />
                        <Background gap={16} />
                    </ReactFlow>

                    {/* Floating center-bottom toolbar */}
                    <BottomToolBar mode={mode} setMode={setMode} />

                    {/* config panel here */}
                    {/* {selectedNode && (
                        <div>

                        </div>
                    )} */}
                    {/* config panel here */}
                    {/* config panel here */}
                </div>
            </ReactFlowProvider>
        </div>

    );
}

export default CanvasFlow;