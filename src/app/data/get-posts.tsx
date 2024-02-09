import { getRecipes } from "../table/page";
import { useQuery } from "@tanstack/react-query";

export function useGetPosts() {
  return useQuery({
    queryFn: async () => getRecipes(),
    queryKey: ["recipes"],
  });
}
