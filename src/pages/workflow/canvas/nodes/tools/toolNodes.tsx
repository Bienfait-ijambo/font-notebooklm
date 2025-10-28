import { Handle, Position } from "@xyflow/react";
import { THEME } from "../NodeTheme";

export function ToolNode({ data }: any) {
  return (
    <div className="flex flex-col items-center select-none">
      <div
        className="rounded-full  text-white w-20 h-20 flex items-center justify-center shadow-md"
        style={{ border: `2px solid ${THEME.toolBorder}` }}
      >
        {data.icon ? (
          // icon image - if you use SVGs that require color changes, set their fill to currentColor
          <img src={data.icon} alt="tool" className="w-8 h-8" />
        ) : (
          <div className="text-xl">🔎</div>
        )}
      </div>
      <div className="mt-2 text-xs text-gray-300 text-center max-w-[80px]">{data.label}</div>

      {/* Top target so connections from agent bottom will be vertical */}
      <Handle type="target" position={Position.Top} id="tool_in" style={{ background: THEME.toolBorder }} />
    </div>
  );
}

export function InputNode({ data }: any) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium text-gray-800">{data.label || "Input"}</div>
      <Handle type="source" position={Position.Right} id="out" style={{ background: THEME.inputHandle }} />
    </div>
  );
}

export function OutputNode({ data }: any) {
  return (
    <div className="rounded-md border bg-white/5 px-3 py-2 text-sm text-white">
      <div className="font-medium">{data.label || "Output"}</div>
      <Handle type="target" position={Position.Left} id="in" style={{ background: THEME.outputHandle }} />
    </div>
  );
}