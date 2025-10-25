import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MiniMap,
    ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';

const initialNodes = [
    {
        id: 'n1',
        data: { label: 'Node 1' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: 'n2',
        data: { label: 'Node 2' },
        position: { x: 100, y: 100 },
    },
];

const initialEdges = [];

function TestingPage() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
     const [idCount, setIdCount] = useState(3); // to generate unique IDs


    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );


    // Function to add a node dynamically
  const addNode = useCallback((type: string) => {
    const newNode = {
      id: `n${idCount}`,
      position: {
        x: Math.random() * 400, // randomize position to avoid overlap
        y: Math.random() * 400,
      },
      data: {
        label:
          type === 'agent'
            ? `🧠 Agent Node (GPT)`
            : `🔧 Tool Node (Search)`,
      },
      type: type === 'agent' ? 'default' : 'default',
    };

    setNodes((nds) => [...nds, newNode]);
    setIdCount((prev) => prev + 1);
  }, [idCount]);

    return (

        <div >
            <div>
  <div className="mb-2">
    <Button onClick={() => addNode('agent')}>AgentNode (GPT)</Button>
    <Button onClick={() => addNode('tool')}>ToolNode (Search)</Button>

    {/* ✅ Live state (updates as you add nodes) */}
    <p className="mt-4 text-sm font-semibold">All Nodes:</p>
    <pre className="bg-gray-100 p-2 rounded text-xs">
      {JSON.stringify(nodes, null, 2)}
    </pre>

    <p className="mt-2 text-sm font-semibold">Connections:</p>
    <pre className="bg-gray-100 p-2 rounded text-xs">
      {JSON.stringify(edges, null, 2)}
    </pre>
  </div>
</div>
            <div style={{ width: "100%", height: "100vh" }}>
                <h1>hello world</h1>

                <div style={{ width: "100%", height: "90vh" }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
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
            </div>



        </div>
    );
}

export default TestingPage;
