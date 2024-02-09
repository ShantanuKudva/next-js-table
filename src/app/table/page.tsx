import React from "react";
import { Recipe, columns } from "./columns";
import DataTable from "./DataTable";

async function getRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch("http://localhost:3000/api/recipes", {
      cache: "no-store",
    });
    const data = await response.json();
    console.log(data.res);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    return data.res;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

async function DemoPage({}) {
  const data = await getRecipes();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DemoPage;

// import React from "react";
// import {
//   useQuery,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import { Recipe, columns } from "./columns";
// import DataTable from "./DataTable";

// async function getRecipes(): Promise<Recipe[]> {
//   try {
//     const response = await fetch("http://localhost:3000/api/recipes", {
//       cache: "no-store",
//     });
//     const data = await response.json();
//     console.log(data.res);
//     if (!response.ok) {
//       throw new Error("Failed to fetch recipes");
//     }

//     return data.res;
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//     throw error;
//   }
// }

// const queryClient = new QueryClient();

// export default function DemoPage() {
//   return (
//     // Provide the client to your App
//     <QueryClientProvider client={queryClient}>
//       <Table />
//       <ReactQueryDevtools />
//     </QueryClientProvider>
//   );
// }

// function Table() {
//   const { data, error, isPending } = useQuery({
//     queryKey: ["recipes"],
//     queryFn: () => fetchRecipes,
//   });

//   if (isPending) return <div>Loading...</div>;
//   if (error) return <div>Error fetching data</div>;

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }
