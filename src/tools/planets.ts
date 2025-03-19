import { z } from "zod";
import { getPlanets } from "../service/planets";
import { McpContent } from "../types";

interface PlanetsToolParams {
  page: number;
  search?: string;
}

export const PlanetsTool = {
  name: "planets",
  description: "List all planets",
  parameters: {
    page: z.number().optional().default(1).describe("Page number"),
    search: z.string().optional().describe("Search query"),
  },
  handler: async (parameters: PlanetsToolParams) => {
    const { search, page } = parameters;
    const response = await getPlanets(search ?? "", page);

    const content: McpContent[] = response.results.map((planet: any) => ({
      type: "text",
      text: planet.name,
    }));

    return {
      content,
      _meta: {
        total: response.count,
        page,
      },
    };
  },
};
