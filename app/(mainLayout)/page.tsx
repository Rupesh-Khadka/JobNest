import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-screen h-screen  ">
      <h1 className="text-7xl text-primary">Hello</h1>
      <Button className="bg-primary text-white">Click me</Button>
      <div className="h-52 w-52 bg-primarys">
        <h1>New one</h1>
      </div>
    </div>
  );
}
