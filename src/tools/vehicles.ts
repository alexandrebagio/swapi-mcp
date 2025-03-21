import { z } from "zod";
import { SWAPI } from "../config";
import { McpContent } from "../types";

interface VehiclesToolParams {
  page: number;
  search?: string;
}

export const VehiclesTool = {
  name: "vehicles",
  description: "List all vehicles",
  parameters: {
    page: z.number().optional().default(1).describe("Page number"),
    search: z.string().optional().describe("Search query"),
  },
  handler: async (parameters: VehiclesToolParams) => {
    const { search, page } = parameters;
    const response = await fetch(
      `${SWAPI}vehicles/?search=${search}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const content: McpContent[] = data.results.map((vehicles: any) => ({
      type: "text",
      text: JSON.stringify(vehicles),
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

export const VehicleTool = {
  name: "vehicle",
  description: "Get a details of a vehicle by id",
  parameters: {
    id: z.string().describe("Vehicle id"),
  },
  handler: async (parameters: { id: string }) => {
    const { id } = parameters;
    const response = await fetch(`${SWAPI}vehicles/${id}`);
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
