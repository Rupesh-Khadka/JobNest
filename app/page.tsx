import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl text-primary">Hello</h1>
      <Button className="bg-primary text-white">Click me</Button>
    </div>
  );
}
