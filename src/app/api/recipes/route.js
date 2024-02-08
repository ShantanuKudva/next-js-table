import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Recipes from "@/lib/model/recipe"; // Import default export

export async function GET(req, res) {
  await mongoose.connect(
    "mongodb+srv://kudvashantanu2002:shantanu@newclusterfortodo.bzi1006.mongodb.net/Recipes?retryWrites=true&w=majority"
  );
  const data = await Recipes.find({});
  console.log(data); // Ensure to await the result of Recipe.find()
  return NextResponse.json({ res: data });
}

export async function POST(req) {
  await mongoose.connect(
    "mongodb+srv://kudvashantanu2002:shantanu@newclusterfortodo.bzi1006.mongodb.net/Recipes?retryWrites=true&w=majority"
  );
  const { id, title, image, time, description } = await req.json();
  await Recipes.create({ title, image, time, description });
  return NextResponse.json({ message: "Recipe Created " }, { status: 201 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await mongoose.connect(
    "mongodb+srv://kudvashantanu2002:shantanu@newclusterfortodo.bzi1006.mongodb.net/Recipes?retryWrites=true&w=majority"
  );
  await Recipes.findByIdAndDelete(id);
  return NextResponse.json({ message: "Recipe deleted " }, { status: 200 });
}
