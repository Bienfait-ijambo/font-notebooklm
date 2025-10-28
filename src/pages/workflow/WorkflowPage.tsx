
// shadcn/ui components (assumes you have shadcn installed and configured)
import { Button } from "@/components/ui/button";


import LeftPanel from "./canvas/leftpanel/LeftPanel";
import TopNav from "./TopNav";
import CanvasFlow from "./canvas/CanvasFlow";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUp, Download, MessageSquare, RotateCw, Shuffle, Terminal, Trash2, X } from "lucide-react";
import { RightPanel } from "./canvas/rightpanel/RightPanel";



export default function WorkflowDashboard() {

    const [rightWidth, setRightWidth] = useState(420);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    function onMove(e) {
      if (!isDragging) return;
      // calculate new width from right edge
      const newWidth = Math.max(280, window.innerWidth - e.clientX - 8);
      const clamped = Math.min(Math.max(newWidth, 300), 900);
      setRightWidth(clamped);
    }
    function onUp() {
      setIsDragging(false);
      document.body.style.cursor = '';
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
  };
  
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Navbar with Undo/Redo buttons */}
     <TopNav />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Resizable + collapsible */}
        <LeftPanel />

        {/* <main className="flex-1 relative">  */}
          <CanvasFlow />
       {/* </main> */}

        {/* Right side: small utility column (optional) kept minimal to avoid conflicting with overlay) */}
       <aside className="bg-white dark:bg-gray-800 border-l" style={{ width: rightWidth }}>
            <RightPanel node={selectedNode} onSave={() => setSelectedNode(null)} />
          </aside>
      </div>
    </div>
  );
}



