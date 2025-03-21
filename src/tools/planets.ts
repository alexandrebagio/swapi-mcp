import { z } from "zod";
import { SWAPI } from "../config";
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
    const response = await fetch(
      `${SWAPI}planets/?search=${search}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const content: McpContent[] = data.results.map((planet: any) => ({
      type: "text",
      text: JSON.stringify(planet),
    }));

    return {
      content,
      _meta: {
        total: data.count,
        page,
      },
    };
  },
};

export const PlanetTool = {
  name: "planet",
  description: "Get a details of a planet by id",
  parameters: {
    id: z.string().describe("Planet id"),
  },
  handler: async (parameters: { id: string }) => {
    const { id } = parameters;
    const response = await fetch(`${SWAPI}planets/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const content: McpContent[] = [
      {
        type: "text",
        text: JSON.stringify(data),
      },
    ];

    return {
      content,
    };
  },
};
