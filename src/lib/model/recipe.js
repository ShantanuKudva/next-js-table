import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  time: Number,
  description: String,
  vegan: Boolean,
});

const Recipes =
  mongoose.models.Recipes || mongoose.model("Recipes", recipeSchema); // Check if the model already exists

export default Recipes; // Export the model using default export
