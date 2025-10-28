import { Handle, Position } from "@xyflow/react";
import { THEME } from "../NodeTheme";

export function ToolNode({ data }: { data: { icon: string, label: string } }) {



  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="rounded-full bg-white   text-white w-15 h-15 flex items-center justify-center shadow-md"
        style={{ border: `2px solid ${THEME.toolBorder}` }}
      >
        {data.icon ? (
          // icon image - if you use SVGs that require color changes, set their fill to currentColor
          <img src={data.icon} alt="tool" className="w-8 h-8" />
        ) : (
          <div className="text-xl"></div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-800  text-center max-w-[80px]">{data.label}</div>

      {/* Top target so connections from agent bottom will be vertical */}
      <Handle type="target" position={Position.Top} id="tool_in" style={{
        background: THEME.toolBorder, width: 10,
        height: 10,
      }} />
    </div>
  );
}

export function InputNode({ data }: any) {

  return (

    <div className="flex flex-col items-center">
      {/* Bordered container */}
      <div className="relative rounded-md border bg-white rounded-l-3xl px-4 py-3 text-sm shadow-sm flex items-center justify-center">
        {data.icon ? (
          <img src={data.icon} alt="tool" className="w-8 h-8" />
        ) : (
          <div className="text-xl">🔎</div>
        )}

        {/* Handle — positioned at the right middle */}
        <Handle
          type="source"
          position={Position.Right}
          id="out"
          style={{
            background: THEME.inputHandle,
            position: "absolute",
            top: "50%",
            right: "-6px", // adjust offset if needed
            transform: "translateY(-50%)",
            width: 10,
            height: 10,
          }}
        />
      </div>

      {/* Label below */}
      <div className="mt-1 text-xs text-gray-900  text-center max-w-[120px]">
        {data.label}
      </div>
    </div>



  );
}







// export function OutputNode({ data }: any) {
//   return (

//     <div className="flex flex-col items-center ">
//       {/* Bordered container */}
//       <div className="relative rounded-md border bg-white w-28 rounded-l-xl rounded-r-xl px-4 py-3 text-sm shadow-sm flex items-center justify-center">
//         {data.icon ? (
//           <img src={data.icon} alt="tool" className="w-8 h-8" />
//         ) : (
//           <div className="text-xl">🔎</div>
//         )}

//         {/* Handle — positioned at the right middle */}
//         <Handle
//           type="target"
//           position={Position.Left}
//           id="in"
//           style={{
//             background: THEME.inputHandle,
//             position: "absolute",
//             top: "50%",
//             right: "-6px", // adjust offset if needed
//             transform: "translateY(-50%)",
//             width: 10,
//             height: 10,
//           }}
//         />

//       </div>

//       {/* Label below */}
//       <div className="mt-1 text-xs text-gray-900  text-center max-w-[120px]">
//         {data.label}
//       </div>
//     </div>

//   );
// }


export function OutputNode({ data }: any) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium">{data.label || "Output"}</div>
      <Handle type="target" position={Position.Left} id="in" style={{ background: THEME.outputHandle }} />
    </div>
  );
}