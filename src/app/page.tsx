import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
}

async function getRecipies(): Promise<Recipe[]> {
  const result = await fetch("http://localhost:4000/recipes");

  return result.json();
}

export default async function Home() {
  const recipies = await getRecipies();
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipies.map((r, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{r.title}</CardTitle>
              <CardDescription>{r.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{r.description}</p>
            </CardContent>
            <CardFooter>
              <p>{r.time} Minutes</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
