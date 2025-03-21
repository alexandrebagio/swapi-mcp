import { z } from "zod";
import { SWAPI } from "../config";
import { McpContent } from "../types";

interface StarShipsToolParams {
  page: number;
  search?: string;
}

export const StarShipsTool = {
  name: "starships",
  description: "List all starships",
  parameters: {
    page: z.number().optional().default(1).describe("Page number"),
    search: z.string().optional().describe("Search query"),
  },
  handler: async (parameters: StarShipsToolParams) => {
    const { search, page } = parameters;
    const response = await fetch(
      `${SWAPI}starships/?search=${search}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const content: McpContent[] = data.results.map((starship: any) => ({
      type: "text",
      text: JSON.stringify(starship),
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

export const StarShipTool = {
  name: "starship",
  description: "Get a details of a starship by id",
  parameters: {
    id: z.string().describe("Starship id"),
  },
  handler: async (parameters: { id: string }) => {
    const { id } = parameters;
    const response = await fetch(`${SWAPI}startships/${id}`);
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
