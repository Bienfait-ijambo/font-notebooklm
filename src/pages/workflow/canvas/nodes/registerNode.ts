/* register node types */

import { AgentNode } from "./agent/AgentNodes";
import { InputNode, OutputNode, ToolNode } from "./tools/toolNodes";


export const nodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  inputNode: InputNode,
  outputNode: OutputNode,
};
