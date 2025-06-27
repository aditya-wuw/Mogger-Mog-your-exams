"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

const Form = () => {
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
    if (formData.password.length < 12)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [Visi, setVisi] = useState(false);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-5 p-6 bg-white shadow-md rounded space-y-4 w-full"
    >
      <h2 className="text-2xl font-bold">Login</h2>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded"
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
          type={Visi ? "text": "password"}
          name="password"
          placeholder="************"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
        />
        {Visi ? <FaEye className="absolute w-5 h-5 bottom-3 right-5 hover:cursor-pointer" onClick={() => setVisi(!Visi)} /> : <IoIosEyeOff  className="absolute w-5 h-5 bottom-3 right-5 hover:cursor-pointer" onClick={() => setVisi(!Visi)}/>}
        
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Login
      </button>
      <button className="w-full hover:cursor-pointer bg-green-500 hover:bg-green-400 text-white font-semibold py-2 px-4 rounded transition flex justify-center items-center">
        <FcGoogle className="w-5 h-5" />
        oogle
      </button>
    </form>
  );
};

export default Form;
