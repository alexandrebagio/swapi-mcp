import { z } from "zod";
import { SWAPI } from "../config";
import { McpContent } from "../types";

interface FilmsToolParams {
  page: number;
  search?: string;
}

export const FilmsTool = {
  name: "films",
  description: "List all films",
  parameters: {
    page: z.number().optional().default(1).describe("Page number"),
    search: z.string().optional().describe("Search query"),
  },
  handler: async (parameters: FilmsToolParams) => {
    const { search, page } = parameters;
    const response = await fetch(
      `${SWAPI}films/?search=${search}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const content: McpContent[] = data.results.map((film: any) => ({
      type: "text",
      text: JSON.stringify(film),
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

export const FilmTool = {
  name: "film",
  description: "Get a details of a film by id",
  parameters: {
    id: z.string().describe("Film id"),
  },
  handler: async (parameters: { id: string }) => {
    const { id } = parameters;
    const response = await fetch(`${SWAPI}films/${id}`);
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
