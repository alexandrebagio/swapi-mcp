import { SWAPI } from "../config";

export const getPlanets = async (search: string, page: number) => {
  const response = await fetch(
    `${SWAPI}planets/?search=${search}&page=${page}`
  );
  const data = await response.json();

  return data;
};
