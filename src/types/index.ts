export interface McpTextContent {
  type: "text";
  text: string;
  [key: string]: unknown;
}

export type McpContent = McpTextContent;

export interface McpResponse {
  content: McpContent[];
  _meta?: Record<string, unknown>;
  isError?: boolean;
  [key: string]: unknown;
}
