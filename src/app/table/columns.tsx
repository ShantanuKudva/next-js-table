export type Recipe = {
  id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
};

export const columns = [
  { accessorKey: "title", header: "title" },
  { accessorKey: "time", header: "Time Taken" },
  { accessorKey: "description", header: "description" },
];
