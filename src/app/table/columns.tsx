"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Pencil1Icon, EyeOpenIcon, SlashIcon } from "@radix-ui/react-icons";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTableColumnHeader } from "./dataTableColumnHeader";

export type Recipe = {
  _id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
};

interface RecipeData {
  id: string;
  title: string;
  description: string;
  time: string;
}

const handleClick = (data: RecipeData) => {
  // Implement your logic to display the card and increase the opacity of the background here
  // You can use state to control the visibility of the card and overlay
  console.log("Clicked data:", data);
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Title" />;
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Time Taken" />;
    },
  },
  { accessorKey: "description", header: "Description" },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return <RecipeActions data={data} />;
    },
  },
  {
    id: "delete",
    cell: ({ row }) => (
      <Button onClick={() => deleteRow(row.original)}>Delete</Button>
    ),
  },
];

function deleteRow(data) {
  console.log(data);
  return;
}

const RecipeActions: React.FC<{ data: RecipeData }> = ({ data }) => {
  const [isCardVisible, setCardVisibility] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(data.description);
  const [title, setTitle] = useState(data.title);
  const handleClick = () => {
    setCardVisibility(true);
  };

  const handleClose = () => {
    setCardVisibility(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Save edited description logic here
    setIsEditing(false);
    console.log("Description saved:", description);
  };

  const handleCancel = () => {
    setDescription(data.description);
    setIsEditing(false);
  };
  const saveChangesToDatabase = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newTitle: title,
          newDescription: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      const responseData = await response.json();
      console.log(responseData); // Handle response data if necessary
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <>
      {isCardVisible && (
        <div
          className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-md ${
            isEditing ? "bg-opacity-90" : "bg-opacity-50"
          }`}
        >
          <div
            className={` p-4 rounded-lg shadow-lg ${
              isEditing ? "w-[70%]" : ""
            }`}
          >
            <Card>
              {(data.title != title || data.description != description) &&
                !isEditing && (
                  <Button
                    className="m-4"
                    onClick={() => saveChangesToDatabase(data._id)}
                  >
                    Save Changes to Database
                  </Button>
                )}
              <CardHeader>
                {isEditing ? (
                  <Textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=""
                  />
                ) : (
                  <CardTitle className="text-3xl">{title}</CardTitle>
                )}

                <div className="">
                  {isEditing ? (
                    <div className="flex justify-start gap-4 mt-2">
                      <Button onClick={handleSave} className="mr-2">
                        Save
                      </Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-4 mt-2">
                      <Button onClick={handleEdit}>Edit</Button>
                      <Button onClick={handleClose}>Close</Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className=""
                  />
                ) : (
                  <CardDescription>{description}</CardDescription>
                )}
              </CardContent>
              <CardFooter>
                <p>Time taken to cook: {data.time} Minutes</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <Button onClick={handleClick} className="flex">
        <Pencil1Icon /> <SlashIcon /> <EyeOpenIcon />
      </Button>
    </>
  );
};
