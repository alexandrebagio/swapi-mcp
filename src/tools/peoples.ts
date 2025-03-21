import { z } from "zod";
import { SWAPI } from "../config";
import { McpContent } from "../types";

interface PeoplesToolParams {
  page: number;
  search?: string;
}

export const PeoplesTool = {
  name: "peoples",
  description: "List all peoples",
  parameters: {
    page: z.number().optional().default(1).describe("Page number"),
    search: z.string().optional().describe("Search query"),
  },
  handler: async (parameters: PeoplesToolParams) => {
    const { search, page } = parameters;
    const response = await fetch(
      `${SWAPI}people/?search=${search}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const content: McpContent[] = data.results.map((people: any) => ({
      type: "text",
      text: JSON.stringify(people),
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

export const PeopleTool = {
  name: "people",
  description: "Get a details of a people by id",
  parameters: {
    id: z.string().describe("People id"),
  },
  handler: async (parameters: { id: string }) => {
    const { id } = parameters;
    const response = await fetch(`${SWAPI}people/${id}`);
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
