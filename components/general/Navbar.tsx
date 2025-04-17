import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToogle";
import { auth, signOut } from "@/app/utils/auth";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" height={50} width={50} />
        <h1 className="text-2xl font-bold">
          Job<span className="text-primary ">Nest</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link className={buttonVariants({ size: "lg" })} href="/post-job">
          Post Job
        </Link>

        {session?.user ? (
          <UserDropdown />
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>

      {/* <div className="flex  items-center gap-8">
        <ThemeToggle />
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <Button className="cursor-pointer">Logout</Button>
          </form>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div> */}
    </nav>
  );
}
