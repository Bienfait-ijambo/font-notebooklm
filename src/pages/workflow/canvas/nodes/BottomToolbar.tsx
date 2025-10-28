import { Hand, Play, RotateCcw, RotateCw } from "lucide-react";

const BottomToolBar = ({setMode,mode}:{setMode:(m:string)=>any,mode:any}) => {
    return (  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50">
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
                    className="p-2 rounded-full hover:bg-slate-50"
                    title="Execute workflow"
                  >
                    <Play />
                  </button>

                  <div className="w-px h-6 bg-slate-100" />

                  <button
                    aria-label="Undo"
                    className={`p-2 rounded-full ${true ? "hover:bg-slate-50" : "opacity-50 cursor-not-allowed"}`}
                    title="Undo (Ctrl/Cmd+Z)"
                  >
                    <RotateCcw />
                  </button>

                  <button
                    aria-label="Redo"
                    className={`p-2 rounded-full ${true? "hover:bg-slate-50" : "opacity-50 cursor-not-allowed"}`}
                    title="Redo (Ctrl/Cmd+Shift+Z)"
                  >
                    <RotateCw />
                  </button>
                </div>
              </div>);
}
 
export default BottomToolBar;