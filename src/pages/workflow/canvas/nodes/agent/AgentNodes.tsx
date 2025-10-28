import { Handle, Position } from "@xyflow/react";
import { THEME } from "../NodeTheme";
import { Plus } from "lucide-react";
import BotIcon from '@/assets/bot.png'

export function AgentNode({ data }: any) {
  return (
    <div
      className={`rounded-xl border-2 ${THEME.agentBg} text-white px-4 py-3 shadow-md min-w-[220px]`}
      style={{ borderColor: THEME.agentBorder, }}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
          {/* inline SVG bot icon - color controlled by fill */}
          {/* <img src={BotIcon} alt="" /> */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
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
        style={{
          background: THEME.agentBorder, width: 10,
          height: 10,
        }}

      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{
          background: THEME.agentBorder, width: 10,
          height: 10,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="tools"
        style={{
          background: THEME.agentBorder, width: 10,
          height: 10,
        }}
      />



    </div>
  );
}



// export function AgentNode({ data }: any) {
//   const THEME = {
//     agentBg: "bg-gradient-to-br from-purple-600 to-indigo-700",
//     agentBorder: "#9b8cff",
//   };

//   return (
//     <div
//       className={`relative rounded-2xl ${THEME.agentBg} text-white px-4 py-3 shadow-lg min-w-[230px] transition-all hover:shadow-xl hover:-translate-y-[1px] border-2`}
//       style={{
//         borderColor: THEME.agentBorder,
//         boxShadow: `0 4px 10px -2px ${THEME.agentBorder}55`,
//       }}
//     >
//       {/* Node content */}
//       <div className="flex items-center gap-3">
//         {/* Bot icon */}
//         <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M12 2v2"
//               stroke="white"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//             />
//             <rect
//               x="7"
//               y="6"
//               width="10"
//               height="8"
//               rx="2"
//               stroke="white"
//               strokeWidth="1.2"
//             />
//             <circle cx="9" cy="10" r="0.7" fill="white" />
//             <circle cx="15" cy="10" r="0.7" fill="white" />
//             <path
//               d="M9 16c1 1 3 1 4 0"
//               stroke="white"
//               strokeWidth="1.2"
//               strokeLinecap="round"
//             />
//           </svg>
//         </div>

//         <div className="flex flex-col">
//           <div className="font-semibold text-sm leading-tight">
//             {data.label || "AI Agent"}
//           </div>
//           <div className="text-xs text-gray-300">
//             {data.sub || data.meta?.model || "Tools Agent"}
//           </div>
//         </div>
//       </div>

//       {/* ReactFlow Handles */}
//       <Handle
//         type="target"
//         position={Position.Left}
//         id="in"
//         style={{
//           background: THEME.agentBorder,
//           border: "2px solid white",
//           width: 10,
//           height: 10,
//         }}
//       />

//       <Handle
//         type="source"
//         position={Position.Right}
//         id="out"
//         style={{
//           background: THEME.agentBorder,
//           border: "2px solid white",
//           width: 10,
//           height: 10,
//         }}
//       />

//       {/* Two bottom handles — symmetrically placed */}
//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="bottom-left"
//         style={{
//           left: "35%",
//           background: THEME.agentBorder,
//           border: "2px solid white",
//           width: 10,
//           height: 10,
//         }}
//       />

//       <Handle
//         type="source"
//         position={Position.Bottom}
//         id="bottom-right"
//         style={{
//           left: "65%",
//           background: THEME.agentBorder,
//           border: "2px solid white",
//           width: 10,
//           height: 10,
//         }}
//       />
//     </div>
//   );
// }
