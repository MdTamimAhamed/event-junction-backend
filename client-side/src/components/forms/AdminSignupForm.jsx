import React from "react";
import LoginSignupFormBtn from "../../Utilities/buttons/LoginSignupFormBtn";
import FormInputHandler from "../formInputHandler/FormInputHandler";
import axios from "axios";
import ToolTip from "../tooltip/ToolTip";

import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../../Utilities/base/baseURL";

function AdminSignupForm({ setSuccessMsg, setFaildMsg }) {
  const [toolTip, setToolTip] = useState(false);
  const handleToolTip = () => {
    setToolTip(!toolTip);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState({});

  async function onSubmitHandler(e) {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      email,
      accessKey,
      password,
      confirmPass,
    };

    try {
      const response = await axios.post(`${baseUrl}/admin/signup`, formData, {
        headers: { "Content-Type": "Application/json" },
      });

      const { message } = response.data;
      if (response.status === 200) {
        setError({});
        setSuccessMsg(message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors);
      } else {
        setFaildMsg("Signup failed!");
      }
    }
  }

  return (
    <>
      <div className=" flex">
        <div className="h-auto w-[400px] shadow-[0px_5px_25px_rgba(0,0,0,0.1)] bg-white rounded-lg ">
          <div className="px-8 mt-10">
            <h2 className="text-2xl font-medium">Sign up</h2>
            <p className="mb-3 text-sm text-gray">
              Required special permission!
            </p>
          </div>
          <form onSubmit={onSubmitHandler} className="px-8">
            <div className="flex gap-2">
              <FormInputHandler
                state={firstName}
                setState={setFirstName}
                type="text"
                name="firstName"
                placeholder="First Name"
              />
              <FormInputHandler
                state={lastName}
                setState={setLastName}
                type="text"
                name="lasttName"
                placeholder="Last Name"
              />
            </div>
            <p
              className={`${
                error.firstName
                  ? "block text-xs text-red bg-rose-100 p-1"
                  : "hidden"
              }`}
            >
              {`${error.firstName ? error.firstName.msg : ""}`}
            </p>

            <FormInputHandler
              state={email}
              setState={setEmail}
              type="email"
              name="email"
              placeholder="DIU Email"
            />

            <p
              className={`${
                error.email
                  ? "block text-xs text-red bg-rose-100 p-1"
                  : "hidden"
              }`}
            >
              {`${error.email ? error.email.msg : ""}`}
            </p>

            <div className=" relative">
              <div
                className={` ${
                  toolTip ? "block" : "hidden"
                }  absolute right-[-1%] top-[-75%]`}
              >
                <ToolTip text="Its a permission key to access the club admin post!" />
              </div>
              <BsInfoCircleFill
                onClick={handleToolTip}
                className=" text-secondary absolute top-[50%] right-3 translate-y-[-50%]"
              />
              <FormInputHandler
                state={accessKey}
                setState={setAccessKey}
                type="text"
                name="accessToken"
                placeholder="Access Token"
              />
            </div>

            <p
              className={`${
                error.accessKey
                  ? "block text-xs text-red bg-rose-100 p-1"
                  : "hidden"
              }`}
            >
              {`${error.accessKey ? error.accessKey.msg : ""}`}
            </p>

            <FormInputHandler
              state={password}
              setState={setPassword}
              type="password"
              name="password"
              placeholder="Password"
            />

            <p
              className={`${
                error.password
                  ? "block text-xs text-red bg-rose-100 p-1"
                  : "hidden"
              }`}
            >
              {`${error.password ? error.password.msg : ""}`}
            </p>

            <FormInputHandler
              state={confirmPass}
              setState={setConfirmPass}
              type="password"
              name="confirmPass"
              placeholder="Confirm Password"
            />

            <p
              className={`${
                error.confirmPass
                  ? "block text-xs text-red bg-rose-100 p-1"
                  : "hidden"
              }`}
            >
              {`${error.confirmPass ? error.confirmPass.msg : ""}`}
            </p>

            <LoginSignupFormBtn
              type="submit"
              btnName="Signup"
              btnColor="black" //color from color-scheme
            />

            <div className="py-6">
              <p className="text-sm text-center">
                Already have an account?
                <span className=" font-bold text-black cursor-pointer hover:underline">
                  <Link to="/"> Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminSignupForm;
