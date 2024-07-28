"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


// destructure props
const EditEmployeeForm = ({ id, firstName, lastName, email }) => {

  // create states for fields in form to be updated
  // empty fields will not update
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // router will redirect user to home page if update is successful
  const router = useRouter();

  const handleSubmit = async (e) => {
    const confirmed = confirm("Are you sure?");
    e.preventDefault();

    try {

      // pass user entered data to update-employee route
      const res = await fetch(
        `http://localhost:3000/api/update-employee/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newFirstName,
            newLastName,
            newEmail,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update employee");
      }

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8">
      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="First Name"
        onChange={(e) => setNewFirstName(e.target.value)}
        value={newFirstName}
      />

      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Last Name"
        onChange={(e) => setNewLastName(e.target.value)}
        value={newLastName}
      />

      <input
        type="text"
        className="border border-slate-500 px-8 py-2"
        placeholder="Email"
        onChange={(e) => setNewEmail(e.target.value)}
        value={newEmail}
      />

      <button type="submit" className="text-white py-3 px-6 w-fit bg-green-500">
        Update Employee
      </button>
    </form>
  );
};

export default EditEmployeeForm;
