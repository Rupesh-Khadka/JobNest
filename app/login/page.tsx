import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";
import { LoginForm } from "@/components/forms/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image src={Logo} alt="Logo " className="size-12" />
          <h1 className="text-2xl font-bold">
            Job<span className="text-primary">Nest</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
