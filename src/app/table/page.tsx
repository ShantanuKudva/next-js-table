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
