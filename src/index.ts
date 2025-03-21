import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { PlanetsTool, PlanetTool } from "./tools/planets";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "SWAPI",
  version: "1.0.0",
});

server.tool(
  PlanetsTool.name,
  PlanetsTool.description,
  PlanetsTool.parameters,
  PlanetsTool.handler
);

server.tool(
  PlanetTool.name,
  PlanetTool.description,
  PlanetTool.parameters,
  PlanetTool.handler
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Server started");
}

main().catch((error) => console.error("Error starting server", error));
