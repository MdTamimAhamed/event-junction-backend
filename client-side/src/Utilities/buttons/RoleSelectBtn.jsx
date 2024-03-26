import React from "react";

function RoleSelectBtn({ type, btnName, role, state, setState }) {
  const roleSelectHandler = () => {
    setState(role);
  };

  return (
    <>
      <button
        className={`
        ${
          state === "admin"
            ? role === "user"
              ? "text-black"
              : "bg-black text-white"
            : role === "admin"
            ? "text-black"
            : "bg-black text-white"
        }
        w-full py-1 text-sm font-medium rounded `}
        type={type || "button"}
        onClick={roleSelectHandler}
      >
        {btnName}
      </button>
    </>
  );
}

export default RoleSelectBtn;
