import React, { useEffect, useState } from "react";
import LoginSignupFormBtn from "../../Utilities/buttons/LoginSignupFormBtn";
import FormInputHandler from "../formInputHandler/FormInputHandler";
import Welcom from "./Welcom";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../Utilities/base/baseURL";

function SignupForm({ setSuccessMsg, setFaildMsg }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      password,
      confirmPass,
    };

    try {
      const response = await axios.post(`${baseUrl}/user/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { message } = response.data;

      if (response.status === 200) {
        setError({});
        setSuccessMsg(message);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors);
      } else {
        setFaildMsg("Signup failed!");
      }
    }
  }

  return (
    <>
      <div className="flex">
        <div className="h-auto w-[400px] shadow-[0px_5px_25px_rgba(0,0,0,0.1)] bg-white rounded-tl-lg rounded-bl-lg ">
          <div className="px-8 mt-10 ">
            <h2 className="text-2xl font-medium">Sign up</h2>
            <p className="mb-3 text-sm text-gray">
              Please sign up to continue.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="px-8">
            <FormInputHandler
              state={firstName}
              setState={setFirstName}
              type="text"
              name="firstName"
              placeholder="First Name"
            />

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
              state={lastName}
              setState={setLastName}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />

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
              btnColor="secondary" //color from color-scheme
            />

            <div className="py-6">
              <p className="text-sm text-center">
                Already have an account?
                <span className=" font-bold text-secondary cursor-pointer hover:underline">
                  <Link to="/"> Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <Welcom />
      </div>
    </>
  );
}

export default SignupForm;
