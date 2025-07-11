"use client";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import Link from "next/link";
import  { SignIn_goolge, SignIn_ } from "@/components/Login/SignUp/action";
import { CreateContext } from "@/Context/ContextProvider";
import Loader from "@/components/Loader";
import Mogger from "@/components/Mogger";
const Form = () => {
  const {loader,setloader} = CreateContext();
  useEffect(()=>{setloader(false)},[setloader])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
    };
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setloader(true);
      const error:string = await SignIn_(formData);
      if(error) {
        setErrors(prev =>({...prev, name :error}))
        setloader(false);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleGoogle = async() => {
    setloader(true);
    await SignIn_goolge();
  }
  const [Visi, setVisi] = useState(false);
  if(loader) return <div><Loader/></div>
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-5 p-6 bg-gradient-to-br from-green-800/30 to-green-200 backdrop-blur-md shadow-md rounded space-y-4 w-full text-green-800"
    >
      <Mogger/>
      <h2 className="text-2xl font-bold mt-3 ml-2">SignUp</h2>

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border rounded bg-white"
          value={formData.name}
          onChange={handleChange}
          placeholder="john bravo"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

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
        SignUp
      </button>
      <button
        type="button"
        className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded transition flex justify-center items-center"
        onClick={handleGoogle}
      >
        <FcGoogle className="w-5 h-5" />
        oogle
      </button>
      <div className="flex gap-1">
        <p>Already have an account ? </p>{" "}
        <Link
          href={"/Auth/login"}
          className="text-green-800 font-bold underline hover:cursor-pointerLink"
        >
          login
        </Link>
      </div>
    </form>
  );
};

export default Form;
