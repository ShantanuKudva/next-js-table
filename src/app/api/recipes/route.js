import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Recipes from "@/lib/model/recipe"; // Import default export

export async function GET(req, res) {
  await mongoose.connect(
    "mongodb+srv://kudvashantanu2002:shantanu@newclusterfortodo.bzi1006.mongodb.net/Recipes?retryWrites=true&w=majority"
  );
  const data = await Recipes.find({});
  console.log(data); // Ensure to await the result of Recipe.find()
  return NextResponse.json({ res: true });
}
