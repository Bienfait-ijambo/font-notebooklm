/* register node types */

import { AgentNode } from "./agent/AgentNodes";
import { calendarNode, driveNode, embeddingModelNode, gmailNode, InputNode, notionNode, OutputNode, slackNode, ToolNode, vectordbNode } from "./tools/toolNodes";


export const nodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  inputNode: InputNode,
  outputNode: OutputNode,
  gmailNode:gmailNode,
  driveNode:driveNode,
  notionNode:notionNode,
  slackNode:slackNode,
  vectordbNode:vectordbNode,
  embeddingModelNode:embeddingModelNode,
  calendarNode:calendarNode




};
