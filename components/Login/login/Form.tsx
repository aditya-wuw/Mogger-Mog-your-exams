"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CreateContext } from "@/Context/ContextProvider";
import Loader from "@/components/Loader";
import { SignIn_goolge } from "../SignUp/action";

const Form = () => {
  const [Visi, setVisi] = useState(false);
  const Router = useRouter();
  const {loader,setloader} = CreateContext();
  useEffect(()=>{setloader(false)},[]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

 const login = async (data: object) => {
  setloader(true);
  try {
    const res = await axios.post("/api/auth/login", data);
    if (res.data.success) {
      Router.push("/home");
    } 
  } catch (err: any) {
    if (err.status === 300) {
      setErrors({email:err.response.data.message , password:""});
    } 
    else if(err.response){
      setErrors({email:err.response.data.message , password:""});
    }
    else {
      console.error(err);
    }
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      login(formData);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  if(loader) return <div><Loader/></div>
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-5 p-6 bg-gradient-to-br from-green-800/30 to-green-200 backdrop-blur-md shadow-md rounded space-y-4 w-full text-green-800"
    >
      <h2 className="text-2xl font-bold">Login</h2>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded bg-white"
          value={formData.email}
          onChange={handleChange}
          placeholder="johnbravo@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="relative">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type={Visi ? "text" : "password"}
          name="password"
          placeholder="************"
          className="w-full p-2 border rounded bg-white"
          value={formData.password}
          onChange={handleChange}
        />
        {Visi ? (
          <FaEye
            className="absolute w-5 h-5 bottom-3 right-5 hover:cursor-pointer"
            onClick={() => setVisi(!Visi)}
          />
        ) : (
          <IoIosEyeOff
            className="absolute w-5 h-5 bottom-3 right-5 hover:cursor-pointer"
            onClick={() => setVisi(!Visi)}
          />
        )}
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}

      <button
        type="submit"
        className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Login
      </button>
      <button onClick={SignIn_goolge} className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded transition flex justify-center items-center">
        <FcGoogle className="w-5 h-5" />
        oogle
      </button>
      <div className="flex gap-1">
        <p>don't have an account ? </p>{" "}
        <Link
          href={"/Auth/SignUp"}
          className="text-green-800 font-bold underline hover:cursor-pointerLink"
        >
          SignUp
        </Link>
      </div>
    </form>
  );
};

export default Form;
