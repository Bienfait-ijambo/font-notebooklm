

// shadcn/ui components (assumes you have shadcn installed and configured)
import { Button } from "@/components/ui/button";


import LeftPanel from "./LeftPanel";
import TopNav from "./TopNav";
import CanvasFlow from "./canvas/CanvasFlow";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowUp, Download, MessageSquare, RotateCw, Shuffle, Terminal, Trash2, X } from "lucide-react";



export function RightPanel({ node, onSave }) {
  const [activeTab, setActiveTab] = useState("chat");
  const [logs, setLogs] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [composer, setComposer] = useState("");

  function addLog(line) {
    setLogs((l) => [...l, { id: Date.now(), text: line }]);
  }
  function clearLogs() {
    setLogs([]);
  }

  function sendChat() {
    if (!composer.trim()) return;
    const msg = { id: Date.now(), text: composer, from: "user", time: new Date() };
    setChatMessages((m) => [...m, msg]);
    setComposer("");
    addLog(`Chat sent: ${msg.text}`);
    // simulation: assistant reply
    setTimeout(() => setChatMessages((m) => [...m, { id: Date.now() + 1, text: "Assistant reply (simulated)", from: "assistant", time: new Date() }]), 600);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-3 py-2 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          {[
            // { id: "flow", label: "Flow" },
            // { id: "code", label: "Code" },
            // { id: "data", label: "Data" },
            { id: "chat", label: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
            // { id: "properties", label: "Properties" },
            { id: "logs", label: "Logs", icon: <Terminal className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1 rounded-md text-sm ${activeTab === t.id ? 'bg-gray-100 dark:bg-gray-900 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <div className="flex items-center gap-2">{t.icon}{t.label}</div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button title="Clear logs" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" onClick={clearLogs}><Trash2 className="w-4 h-4" /></button>
          <button title="Close" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => onSave && onSave()}><X className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            {chatMessages.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">Let's start chatting!</div>
            ) : (
              <div className="space-y-3">
                {chatMessages.map((m) => (
                  <div key={m.id} className={`p-3 rounded-md ${m.from === 'user' ? 'bg-purple-50 self-end' : 'bg-gray-100 dark:bg-gray-800'}`}>{m.text}</div>
                ))}
              </div>
            )}

            {/* Composer pinned to bottom */}
            <div className="mt-4 sticky bottom-0 bg-transparent pt-3">
              <div className="text-xs text-gray-500 mb-2">Prompt suggestions</div>
              <div className="flex gap-2 mb-2">
                <button className="px-2 py-1 rounded-full border text-sm">Summarize</button>
                <button className="px-2 py-1 rounded-full border text-sm">Extract data</button>
                <button className="px-2 py-1 rounded-full border text-sm">Explain</button>
              </div>
               {/* input area */}
               <ChatInput />

               
   
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className="h-full">
            <div className="h-full bg-black text-white  rounded-md font-mono text-sm" style={{ minHeight: 400 }}>
              {logs.length === 0 ? (
                <div className="text-gray-400">No logs found</div>
              ) : (
                <div className="space-y-1">
                  {logs.map((l) => (
                    <div key={l.id}>{l.text}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Node properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label>ID</Label>
                  <Input value={node?.id || ''} readOnly />
                </div>
                <div>
                  <Label>Label</Label>
                  <Input defaultValue={node?.data?.label?.split('')[0] || ''} />
                </div>
                <div>
                  <Label>Connection</Label>
                  <Input defaultValue={node?.data?.connection || ''} />
                </div>
                <div className="flex justify-end mt-2">
                  <Button>Save</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* others (flow/code/data) can be implemented later — placeholder) */}
        {activeTab === "flow" && <div className="text-sm text-gray-600">Flow overview (placeholder)</div>}
        {activeTab === "code" && <div className="text-sm text-gray-600">Code editor (placeholder)</div>}
        {activeTab === "data" && <div className="text-sm text-gray-600">Data explorer (placeholder)</div>}
      </div>
    </div>
  );
}



function ChatInput() {
  return (
    <div className="relative flex items-end gap-2 mx-auto w-full">
      <textarea
        className="flex px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full resize-none border border-primary/20 rounded-xl shadow-xl bg-primary-foreground pt-10 min-h-[100px]"
        placeholder="Enter message to start chat ..."
      />

      {/* Top overlay button */}
      <div className="absolute top-1 left-2 flex gap-1 right-2">
        <button
          className="gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-6 text-xs text-muted-foreground line-clamp-1 flex items-center justify-start"
        >
          Write a poem based on recent headlines about Vancouver.
        </button>
      </div>

      {/* Bottom action bar */}
      <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
        {/* Left buttons */}
        <div className="flex items-end gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-6 w-6"
            data-state="closed"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Right send button */}
        <div className="flex items-end gap-2">
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 w-8 rounded-full p-0"
            disabled
          >
            <ArrowUp className="w-5 h-5 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
