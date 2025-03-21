import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { FilmsTool, FilmTool } from "./tools/films";
import { PeoplesTool, PeopleTool } from "./tools/peoples";
import { PlanetsTool, PlanetTool } from "./tools/planets";
import { SpeciesTool, SpecieTool } from "./tools/species";

const server = new McpServer({
  name: "SWAPI",
  version: "1.0.0",
});

// Register tools

// Planets
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

// Peoples
server.tool(
  PeoplesTool.name,
  PeoplesTool.description,
  PeoplesTool.parameters,
  PeoplesTool.handler
);

server.tool(
  PeopleTool.name,
  PeopleTool.description,
  PeopleTool.parameters,
  PeopleTool.handler
);

// Films
server.tool(
  FilmsTool.name,
  FilmsTool.description,
  FilmsTool.parameters,
  FilmsTool.handler
);

server.tool(
  FilmTool.name,
  FilmTool.description,
  FilmTool.parameters,
  FilmTool.handler
);

// Species
server.tool(
  SpeciesTool.name,
  SpeciesTool.description,
  SpeciesTool.parameters,
  SpeciesTool.handler
);

server.tool(
  SpecieTool.name,
  SpecieTool.description,
  SpecieTool.parameters,
  SpecieTool.handler
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Server started");
}

main().catch((error) => console.error("Error starting server", error));
