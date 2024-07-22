"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AddEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [assignment, setAssignment] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit", e.target);

    if (!firstName || !lastName || !email) {
      alert("Missing required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/create-employee/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, phone }),
      });

      if (res.ok) {
        router.push("/");
      }

      if (!res.ok) {
        throw new Error({ message: "Failed to create employee" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8">
      <input
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="First Name"
        required
      />
      <input
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Last Name"
        required
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Email"
        required
      />
        <input
        onChange={(e)=>setPhone(e.target.value)}
        value={phone}
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Phone Number"
      />

      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Assignment"
      />


      <button type="submit" className="text-white py-3 px-6 w-fit bg-green-500">
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployee;
