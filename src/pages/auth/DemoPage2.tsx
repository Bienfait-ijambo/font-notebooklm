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

// shadcn/ui imports (button + card used)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// icons
import { Mail, Database, Settings, Home, Moon, Sun, Menu, User, ChevronDown, Save, X, Play } from "lucide-react";

// theming
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useRef, useState } from 'react';

/*
  Improvements in this revision (UI/UX driven):
  - Left panel is toggleable (collapsed icons-only vs expanded). This gives more canvas space while keeping quick navigation.
  - Avatar placed at the bottom-left; clicking it opens a compact menu for "Theme" and "Settings" — familiar pattern for product UIs.
  - Replaced custom Select usage with native <select> for accessibility and predictable behavior across platforms.
  - Cleaner spacing, tactile hit targets, and a subtle transition to communicate state changes clearly.

  UX reasoning (short):
  1. Collapsible sidebar: users working on the canvas need maximum horizontal space — provide a persistent, non-intrusive toggle.
  2. Icons-only collapsed state: preserves discoverability (icons + tooltip) while saving real estate.
  3. Avatar at bottom: conventional placement, reduces accidental clicks and groups account actions together.
  4. Native select: best accessibility, predictable keyboard support and mobile behavior.
*/

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 80 },
    data: { label: "Airtable New User Data Entry", icon: Database, connection: "Airtable", workspace: "Hologram" },
  },
  {
    id: "2",
    position: { x: 380, y: 220 },
    data: { label: "Mailchimp Send Welcome Email", icon: Mail, connection: "Mailchimp", strategy: "Welcome" },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", markerEnd: { type: Mail } },
];

function WorkflowCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const { theme, setTheme } = useTheme();

  // Sidebar open/collapsed
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Avatar menu
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  const onNodeClick = (_, node) => setSelectedNode(node);
  const onPaneClick = () => setSelectedNode(null);

  // Close avatar menu when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const NodeContent = ({ data }) => {
    const Icon = data.icon || Settings;
    return (
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border border-purple-200 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition">
        <Icon className="w-5 h-5 text-purple-500 flex-shrink-0" />
        <div className="text-sm leading-tight text-gray-800 dark:text-gray-100 whitespace-pre-line">{data.label}</div>
      </div>
    );
  };

  const nodeTypes = { default: NodeContent };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left panel */}
    
      <aside className={`flex flex-col transition-all duration-200 ${sidebarOpen ? 'w-64 p-4 border-r' : 'w-16 p-2'} border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800`}>
        <div className="flex items-center justify-between mb-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Database className="w-5 h-5 text-purple-500" /> <span>Hologram</span>
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10">
              <Database className="w-5 h-5 text-purple-500" />
            </div>
          )}

          {/* toggle */}
          <button
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem icon={<Home className="w-5 h-5" />} label="Home" open={sidebarOpen} />
          <NavItem icon={<Settings className="w-5 h-5" />} label="Workflows" open={sidebarOpen} />
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700" />

          <div className="text-xs text-gray-500 px-1 mt-3">In Progress</div>
          <div className="mt-2 space-y-1">
            <ProgressItem label="Transform Database" open={sidebarOpen} />
            <ProgressItem label="Duplicate New Users" open={sidebarOpen} />
            <ProgressItem label="New User Sign Up" open={sidebarOpen} active openLabel={sidebarOpen} />
          </div>
        </nav>

        {/* bottom area with avatar */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <div ref={avatarRef} className="relative">
              <button
                onClick={() => setAvatarMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-haspopup="true"
                aria-expanded={avatarMenuOpen}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">LG</div>
                {sidebarOpen && <div className="text-sm">Luke Goatee</div>}
                {sidebarOpen && <ChevronDown className="w-4 h-4 ml-1" />}
              </button>

              {avatarMenuOpen && (
                <div className="absolute left-0 bottom-12 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light'); setAvatarMenuOpen(false); }}>
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />} Change theme
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => { /* navigate to settings */ setAvatarMenuOpen(false); }}>
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
        <header className="h-14 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          {/* keep a small toggle to quickly open/close sidebar (helps keyboard users) */}
          <button aria-label="Toggle sidebar" className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setSidebarOpen((s) => !s)}>
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-purple-500" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">New User Sign Up</span>
              <span className="text-xs text-gray-500">Workflow · Hologram</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <div className="text-sm text-gray-500">Updated 30m ago</div>
            <button className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"><Play className="w-4 h-4" /> Run Once</button>
            <button className="px-3 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"><Save className="w-4 h-4" /> Publish</button>
          </div>

          {/* small avatar cluster on the right */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800" />
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800" />
            </div>
            <div className="hidden sm:flex text-xs text-gray-500">Team</div>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            className="bg-dot-pattern"
          >
            <Background gap={20} color="#ddd" />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>

      {/* Right Panel */}
      {selectedNode && (
        <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 overflow-y-auto shadow-xl transition-transform">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2"><Mail className="w-5 h-5 text-purple-500" /> Settings</h2>
            <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}><X className="w-4 h-4" /></Button>
          </div>
          <Card className="bg-transparent border-none shadow-none">
            <CardHeader>
              <CardTitle>{selectedNode.data.label.split('')[0]}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Connection</Label>
                <Input value={selectedNode.data.connection || ''} readOnly />
              </div>
              <div>
                <Label>Workspace</Label>
                <Input value={selectedNode.data.workspace || 'Hologram'} readOnly />
              </div>

              <div>
                <Label>Strategy</Label>
                {/* Native select for accessibility */}
                <select defaultValue={selectedNode.data.strategy || 'Welcome'} className="w-full border rounded-md px-2 py-1 bg-white dark:bg-gray-700">
                  <option value="Welcome">Welcome</option>
                  <option value="Onboarding">Onboarding</option>
                </select>
              </div>

              <div>
                <Label>Message</Label>
                <textarea className="w-full rounded-md px-3 py-2 bg-white dark:bg-gray-700" placeholder="Welcome message..."></textarea>
              </div>
              <div className="flex justify-end">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1"><Save className="w-4 h-4" /> Save</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, open }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
      <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      {open && <div className="text-sm">{label}</div>}
    </div>
  );
}

function ProgressItem({ label, open, active }) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-md ${active ? 'bg-purple-50 dark:bg-purple-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} cursor-pointer`}>
      <div className="w-3 h-3 rounded-full bg-purple-500" />
      {open && <div className={`text-sm ${active ? 'font-semibold' : ''}`}>{label}</div>}
    </div>
  );
}

export default function DemoPage2() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <WorkflowCanvas />
    </ThemeProvider>
  );
}
