import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Bot, ChevronLeft, ChevronRight, Grid, Home, PersonStanding, Plus, RefreshCcwDot, Settings, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthButton } from "../../../zapier/AuthButton";

import { Wrench } from "lucide-react";
import { addNode } from "@/store/workflow/workflowSlice";
import { useDispatch } from "react-redux";

const LeftPanel = () => {


    // left panel width & collapsed state
    const [leftWidth, setLeftWidth] = useState(235); // px
    const [isResizing, setIsResizing] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const minWidth = 72;
    const maxWidth = 520;

    const APPS = [
        { id: "google-sheets", label: "Agent", icon: <Bot size={18} /> },
        { id: "toolx", label: "Tool", icon: <Bot size={18} /> },
        { id: "Input", label: "Input", icon: <Bot size={18} /> },
        { id: "output", label: "output", icon: <Bot size={18} /> },



        { id: "google-", label: "End", icon: <Square size={18} /> },

    ];
    const Logics = [
        { id: "google-sheets", label: "If/else", icon: <Bot size={18} /> },
        { id: "google-", label: "While", icon: <RefreshCcwDot size={18} /> },
        {
            id: "google-drivxe", label: "User Approval", icon: <PersonStanding size={18} />
        },
    ];

    // Resizer handlers
    useEffect(() => {
        const onMouseMove = (e) => {
            if (!isResizing) return;
            const newWidth = e.clientX; // since left panel anchored at left of screen
            const clamped = Math.max(minWidth, Math.min(maxWidth, newWidth));
            setLeftWidth(clamped);
        };

        const onMouseUp = () => setIsResizing(false);

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isResizing]);





    const dispatch = useDispatch();
    const handleAddNode = (type: "agent" | "tool" | "inputNode" | "outputNode") => {
        dispatch(addNode(type));
    };



    function showNode(label: string) {
        if (label == 'Agent') {
            handleAddNode('agent')
        } else if (label == 'Tool') {
            handleAddNode('tool')
        } else if (label == 'Input') {
            handleAddNode('inputNode')

        }
        else if (label == 'output') {
            handleAddNode('outputNode')

        }
    }





    return (<aside
        className={`bg-white border-r overflow-hidden flex flex-col ${collapsed ? "w-20" : ""}`}
        style={{ width: collapsed ? 72 : leftWidth }}
    >


        {/* Body: categories & app list */}
        <div className="flex-1 overflow-auto p-3">

            <div className="flex items-center justify-between px-3 py-3 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded ">
                        <Plus />
                    </div>
                    {!collapsed && <div className="text-sm font-semibold">New Project</div>}
                </div>

                <div className="flex items-center gap-2">


                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed((s) => !s)}
                        aria-label={collapsed ? "Expand panel" : "Collapse panel"}
                    >
                        {collapsed ? <ChevronRight /> : <ChevronLeft />}
                    </Button>
                </div>
            </div>


            {/* Categories (left column style) */}
            <div className="mb-4 mt-2">
                <div className="flex flex-col gap-1">
                    {[
                        { key: "home", label: "Home", icon: <Home size={16} /> },
                        { key: "apps", label: "Workflows", icon: <Settings size={16} /> },
                    ].map((c) => (
                        <div
                            key={c.key}
                            className={`flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 cursor-pointer ${collapsed ? "justify-center" : ""}`}
                        >
                            <div className="w-8 h-5 flex items-center justify-center rounded ">{c.icon}</div>
                            {!collapsed && <div className="text-sm ">{c.label}</div>}
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            <div className="mt-4">
                <div className="flex items-center justify-between mb-2 px-1">
                    {!collapsed && <div className="text-xs text-muted-foreground">Core</div>}
                    <div className="text-xs text-muted-foreground"> </div>
                </div>

                <div className="flex flex-col gap-2">
                    {APPS.map((app) => (
                        <div
                            key={app.id}
                            draggable
                            onClick={() => showNode(app.label)}
                            className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 cursor-grab ${collapsed ? "justify-center" : ""}`}
                        >
                            <div className="w-8 h-5 flex items-center justify-center rounded  ">{app.icon}</div>
                            {!collapsed && (
                                <>
                                    <div className="flex-1 text-sm ">{app.label}</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>


            <div className="mt-4">
                <div className="flex items-center justify-between mb-2 px-1">
                    {!collapsed && <div className="text-xs text-muted-foreground">Core</div>}
                    <div className="text-xs text-muted-foreground"> </div>
                </div>

                <div className="flex flex-col gap-2">
                    {Logics.map((app) => (
                        <div
                            key={app.id}
                            draggable
                            className={`flex items-center gap-2 p-2 rounded-md hover:bg-slate-50 cursor-grab ${collapsed ? "justify-center" : ""}`}
                        >
                            <div className="w-8 h-5 flex items-center justify-center rounded  ">{app.icon}</div>
                            {!collapsed && (
                                <>
                                    <div className="flex-1 text-sm ">{app.label}</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>


        </div>




        <div className="flex mt-2 mb-5 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2 ml-5 hover:bg-slate-100 p-2 rounded-md cursor-pointer">
                <AuthButton></AuthButton>
                <p>Bienfait Ijambo</p>

            </div>
        </div>


        {/* Resizer bar */}
        <div
            className="w-1 cursor-col-resize hover:bg-slate-200 bg-transparent"
            onMouseDown={() => setIsResizing(true)}
            style={{ position: "absolute", top: 0, bottom: 0, right: 0 }}
        />
    </aside>);
}

export default LeftPanel;