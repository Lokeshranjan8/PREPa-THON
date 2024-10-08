import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "./label";
import { Input } from "./input";
import { tn } from "../../utils/cn";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import toast, { Toaster } from "react-hot-toast";
import { OAuthProvider } from "appwrite";
import { account } from "../../appwrite/app.config";


interface FormData {
  username: string;
  email: string;
  password: string;
}

export function SignupForm() {

  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  //google auth
  const gAuth = (e: any) => {
    e.preventDefault()
    account.createOAuth2Session(
      OAuthProvider.Google,
      'http://localhost:3000/display', //on success
      'http://localhost:3000/login' //on failure
    )
  }
  //git auth
  const gitAuth = (e: any) => {
    e.preventDefault()
    account.createOAuth2Session(
      OAuthProvider.Github,
      'http://localhost:3000/display',
      'http://localhost:3000/login'
    )
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }


  // Handle form submission
  const formSubmit = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    console.log(formData);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}signup`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
        body: JSON.stringify(formData), // Stringify the form data
      });
      await response.json(); // Parse JSON response
      if (response.ok) { // status code:[200,299]
        // console.log(data)
        setTimeout(() => {
          navigate('/display');
        }, 2000)
        toast.success("User created")
      } else if (response.status === 401) {
        toast("Username already taken")
      } else if (response.status === 400) {
        toast.error("Email already taken");
      } else if (response.status === 402) {
        toast.error("Username and Email both are taken")
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error, Try later");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Toaster />

      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to Unlock the mysteries of cosmic X-ray bursts
      </p>

      <form className="my-5" action="POST">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              name="username"
              onChange={handleInputChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
            onChange={handleInputChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={formSubmit}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={gitAuth}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={gAuth}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>

  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={tn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
