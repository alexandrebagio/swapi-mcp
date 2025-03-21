import { z } from "zod";
import { SWAPI } from "../config";
import { McpContent } from "../types";

interface SpeciesToolParams {
  page: number;
  search?: string;
}

export const SpeciesTool = {
  name: "species",
  description: "List all species",
  parameters: {
    page: z.number().optional().default(1).describe("Page number"),
    search: z.string().optional().describe("Search query"),
  },
  handler: async (parameters: SpeciesToolParams) => {
    const { search, page } = parameters;
    const response = await fetch(
      `${SWAPI}species/?search=${search}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const content: McpContent[] = data.results.map((specie: any) => ({
      type: "text",
      text: JSON.stringify(specie),
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

export const SpecieTool = {
  name: "specie",
  description: "Get a details of a specie by id",
  parameters: {
    id: z.string().describe("Specie id"),
  },
  handler: async (parameters: { id: string }) => {
    const { id } = parameters;
    const response = await fetch(`${SWAPI}species/${id}`);
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
