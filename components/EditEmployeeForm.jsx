"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// destructure props
const EditEmployeeForm = ({ id, firstName, lastName, email }) => {
  // create states for fields in form to be updated
  // empty fields will not update
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newEmail, setNewEmail] = useState(email);
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState('');

  // router will redirect user to home page if update is successful
  const router = useRouter();

  useEffect(() => {
    // Check if at least one field has been updated
    if (
      newFirstName !== firstName ||
      newLastName !== lastName ||
      newEmail !== email
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }

    if (newFirstName === "" || newLastName === "" || newEmail === "") {
      setIsFormValid(false);
    }
  }, [newFirstName, newLastName, newEmail, firstName, lastName, email]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setNewEmail(value);

    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    const confirmed = confirm("Are you sure?");
    e.preventDefault();

    try {
      // pass user entered data to update-employee route
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/update-employee/${id}`,
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
        alert("Employee update successful");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-3 mt-8 w-80">
      <div>
        <p>First Name</p>

        <input
        autoComplete="off"
          type="text"
          className="border border-slate-500 px-2 py-2 w-full"
          placeholder={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value.trim())}
          // value={newFirstName}
        />
      </div>

      <div>
        <p>Last Name</p>
        <input
          type="text"
          className="border border-slate-500 px-2 py-2 w-full"
          placeholder={newLastName}
          onChange={(e) => setNewLastName(e.target.value.trim())}
          // value={newLastName}
        />
      </div>

      <div>
        <p>Email</p>
        <input
          type="text"
          className="border border-slate-500 px-2 py-2 w-full"
          placeholder={newEmail}
          onChange={handleEmailChange}
          // value={newEmail}
        />
        {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
      </div>

      <button
        type="submit"
        className={`${
          isFormValid
            ? "cursor-pointer text-white py-3 px-6 w-full bg-green-500"
            : "bg-gray-500 text-white py-3 px-6 w-full"
        }`}
        disabled={!isFormValid}
      >
        Update Employee
      </button>
    </form>
  );
};

export default EditEmployeeForm;
