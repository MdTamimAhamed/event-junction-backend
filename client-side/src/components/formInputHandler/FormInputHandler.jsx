import React from "react";

function FormInputHandler({ state, setState, type, name, placeholder }) {
  return (
    <>
      <input
        className="w-full px-3 py-[6px] my-[6px] border border-[rgba(0,0,0,0.2)]
         outline-light-gray rounded-md "
        value={state}
        onChange={(e) => setState(e.target.value)}
        type={type || "text"}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
}

export default FormInputHandler;
