import React from "react";
import { Recipe, columns } from "./columns";
import DataTable from "./DataTable";

async function getRecipies(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  return result.json();
}

async function DemoPage({}) {
  const data = await getRecipies();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DemoPage;
