import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Recipes from "@/lib/model/recipe"; // Import default export

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await mongoose.connect(
    "mongodb+srv://kudvashantanu2002:shantanu@newclusterfortodo.bzi1006.mongodb.net/Recipes?retryWrites=true&w=majority"
  );

  await Recipes.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Recipe Updated" }, { status: 200 });
}
