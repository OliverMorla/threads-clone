"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (data.ok) {
        alert(data.message);
        // router.push("/auth/login");
      } else {
        throw new Error(data.message);
      }
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
        </section>
      </h1>
      <form
        action=""
        className="flex flex-col max-h-fit max-w-[500px] w-full gap-2 p-2"
        onSubmit={handleSubmit}
      >
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="p-3 bg-transparent border-b-2 border-[--quinary] appearance-none"
          onChange={handleInput}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
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
          value="Create Account"
          className="cursor-pointer rounded-lg p-3 bg-[--quinary] text-[--septenary] hover:bg-[--septenary] hover:text-[--quinary] transition-all"
        />
      </form>
      <section>
        <p>
          Already have an account? <a href="/auth/login">Login</a>
        </p>
      </section>
    </main>
  );
};

export default Register;
