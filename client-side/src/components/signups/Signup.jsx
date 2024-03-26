import React from "react";
import { useState } from "react";
import RoleSelectBtn from "../../Utilities/buttons/RoleSelectBtn";
import SignupForm from "../forms/SignupForm";
import AdminSignupForm from "../forms/AdminSignupForm";

function Signup() {
  const [selectRole, setSelectRole] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [faildMsg, setFaildMsg] = useState("");

  return (
    <>
      <div>
        <p className=" text-center">Ahsan: Put the header here...</p>
      </div>
      <div className="h-[90vh] flex flex-col justify-center items-center">
        <p
          className={`${
            successMsg
              ? "block bg-green-200 text-green-800 "
              : faildMsg
              ? "block bg-rose-200 text-rose-800"
              : "hidden"
          } w-[300px] p-1 mb-5 text-center transition-all ease-linear`}
        >
          {successMsg ? successMsg : faildMsg}
        </p>

        <div className=" w-[300px] bg-white shadow-[0px_0px_5px_rgba(0,0,0,0.1)] flex justify-between items-center gap-2 mb-6 p-[5px] rounded-md">
          <RoleSelectBtn
            type="button"
            role="user"
            btnName="User"
            state={selectRole}
            setState={setSelectRole}
          />

          <RoleSelectBtn
            type="button"
            role="admin"
            btnName="Admin"
            state={selectRole}
            setState={setSelectRole}
          />
        </div>
        {selectRole === "admin" ? (
          <AdminSignupForm
            setSuccessMsg={setSuccessMsg}
            setFaildMsg={setFaildMsg}
          />
        ) : (
          <SignupForm setSuccessMsg={setSuccessMsg} setFaildMsg={setFaildMsg} />
        )}
      </div>

      <footer className="flex justify-center text-xs text-gray">
        <p>
          DIU Event Junction (Tamim.Ahsan.Prantik.Sraboni.Maliha) &copy; 2023 |
          All right reserved.
        </p>
      </footer>
    </>
  );
}

export default Signup;
