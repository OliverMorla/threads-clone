"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const { data: session } = useSession();

  if (session?.user) redirect("/");

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // handle login input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle login submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        redirect: true,
        email: input.email,
        password: input.password,
        callbackUrl: "/",
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <main className="h-full w-full flex justify-center items-center flex-col">
      <Image
        src={"/assets/images/banner-main.png"}
        width={1080}
        height={512}
        alt="Banner"
        className="absolute object-cover top-0 "
      />
      <h1 className="flex justify-center">
        <Image
          src={"/assets/icons/logo.svg"}
          alt="Logo"
          width={35}
          height={35}
        />
        <section>
          <h1 className="text-4xl font-bold">Threads</h1>
          <h2 className="text-2xl font-bold">Clone</h2>
          <p>
            Email: guest@threads.com <br /> Password: password
          </p>
        </section>
      </h1>
      <form
        action=""
        className="flex flex-col max-h-fit max-w-[500px] w-full gap-2 p-2"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          type="text"
          placeholder="Username, Phone, or Email"
          className="p-3 bg-transparent border-b-2 border-[--quinary] appearance-none"
          onChange={handleInput}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-3 bg-transparent border-b-2 border-[--quinary] appearance-none"
          onChange={handleInput}
        />
        <input
          type="submit"
          value="Login"
          className="cursor-pointer rounded-lg p-3 bg-[--quinary] text-[--septenary] hover:bg-[--septenary] hover:text-[--quinary] transition-all"
        />
      </form>
      <section className="text-center">
        <h4>
          Forgot Password ·{" "}
          <Link
            href={"/auth/register"}
            className="hover:font-bold transition-all"
          >
            Register
          </Link>
        </h4>
        <p>or</p>
        <button className="bg-transparent border-[1px] border-white rounded-lg p-4 flex gap-2 items-center hover:bg-[--septenary] hover:text-[--quinary] transition-all">
          <Image
            src={"/assets/icons/instagram.svg"}
            width={20}
            height={20}
            alt=""
          />{" "}
          Continue with Instagram
        </button>
      </section>
    </main>
  );
};

export default Login;
