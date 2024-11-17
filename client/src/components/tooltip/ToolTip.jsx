import React from "react";

const ToolTip = ({ text }) => {
  return (
    <>
      <div
        className={` relative w-[200px] p-2 rounded bg-black shadow-md text-white text-[0.7em]`}
      >
        <div className="w-2 h-2 bg-black rotate-45 absolute bottom-[-8%] right-5"></div>
        <p>{text}</p>
      </div>
    </>
  );
};

export default ToolTip;
