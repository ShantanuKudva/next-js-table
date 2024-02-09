import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { CardStackPlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

function AddRecipe() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(0);
  const [cardVisibility, setCardVisibility] = useState(false); // State to track if form should be displayed
  const [vegan, setVegan] = useState(false);

  const handleSubmit = async (e) => {
    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          time: time,
          description: description,
          vegan: vegan,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      console.log("Recipe added successfully");

      // Clear the form fields
      setTitle("");
      setDescription("");
      setVegan(false);
      setTime(0);
      // Hide the form after successful submission
      setCardVisibility(false);

      // Refresh the router
      router.refresh();
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleCheckboxToggle = () => {
    setVegan((prevIsVegan) => !prevIsVegan);
  };

  return (
    <div className="flex justify-center items-center">
      <Button
        className="flex gap-2 justify-center items-center"
        onClick={() => setCardVisibility(true)}
      >
        <CardStackPlusIcon />
        Add a Recipe
      </Button>

      {cardVisibility && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-md">
          <Card className="p-8 ">
            <div className="flex items-center justify-between mb-16">
              <CardTitle className="m-auto">Add a Recipe</CardTitle>
              <Button
                onClick={() => setCardVisibility(false)}
                className="place-items-end"
              >
                <Cross1Icon />
              </Button>
            </div>
            <CardContent className="mt-5 flex gap-5 justify-between text-center items-center ">
              <CardTitle className="text-xl w-[50%]">Add Title</CardTitle>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </CardContent>

            <CardContent className="mt-5 flex gap-5 justify-between text-center items-center ">
              <CardTitle className="text-xl w-[50%]">Add Description</CardTitle>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>

            <div className="grid grid-cols-2">
              <CardContent className="mt-5 flex gap-2 justify-evenly  text-center items-center ">
                <CardTitle className="text-xl  ">Is it Vegan?</CardTitle>
                <input
                  type="checkbox"
                  checked={vegan}
                  onChange={handleCheckboxToggle} // Step 4: Set up the event handler function
                />
                <p>{vegan === false ? "No it's not" : "Yes!"}</p>
              </CardContent>

              <CardContent className="mt-5 flex gap-5  text-center items-center ">
                <CardTitle className="text-xl ">
                  How many minutes does it take to cook?
                </CardTitle>
                <Input
                  type="number"
                  onChange={(e) => setTime(e.target.valueAsNumber)}
                  value={time}
                />
              </CardContent>
            </div>
            <Button onClick={handleSubmit}>Submit!</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default AddRecipe;
