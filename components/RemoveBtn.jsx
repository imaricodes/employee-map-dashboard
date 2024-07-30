import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const RemoveBtn = ({ employeeId }) => {
  const router = useRouter;
  const removeEmployee = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      // alert("confirmed");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/delete-employee?id=${employeeId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        location.reload();
      }



    }
  };

  return (
    <div>
      <button onClick={removeEmployee} className="text-red-500">
        <HiOutlineTrash size={24} />
      </button>
    </div>
  );
};

export default RemoveBtn;
