import React from 'react';
import LoginSignupFormBtn from '../../Utilities/buttons/LoginSignupFormBtn';
import FormInputHandler from '../formInputHandler/FormInputHandler';
import axios from 'axios';
import ToolTip from '../tooltip/ToolTip';

import { BsInfoCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { baseUrl } from '../../Utilities/base/baseURL';
import { toast } from 'react-hot-toast';

function AdminSignupForm() {
    const [toolTip, setToolTip] = useState(false);
    const handleToolTip = () => {
        setToolTip(!toolTip);
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const response = await axios.post(
                `${baseUrl}/admin/signup`,
                formData,
                {
                    headers: { 'Content-Type': 'Application/json' },
                }
            );

            const { message } = response.data;
            if (response.status === 200) {
                setError({});
                toast.success(message);
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setError(err.response.data.errors);
            } else {
                toast.error('Signup failed!' || err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex">
                <div className="h-auto w-[400px] rounded-lg bg-foreground shadow-[0px_5px_25px_rgba(0,0,0,0.1)]">
                    <div className="mt-10 px-8">
                        <h2 className="text-2xl font-medium text-white">
                            Sign up
                        </h2>
                        <p className="mb-3 text-sm text-white/30">
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
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.firstName ? error.firstName.msg : ''}`}
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
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.email ? error.email.msg : ''}`}
                        </p>

                        <div className="relative">
                            <div
                                className={` ${
                                    toolTip ? 'block' : 'hidden'
                                } absolute right-[-1%] top-[-75%]`}
                            >
                                <ToolTip text="Its a permission key to access the club admin post!" />
                            </div>
                            <BsInfoCircleFill
                                onClick={handleToolTip}
                                className="absolute right-3 top-[50%] translate-y-[-50%] text-secondary"
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
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.accessKey ? error.accessKey.msg : ''}`}
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
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.password ? error.password.msg : ''}`}
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
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.confirmPass ? error.confirmPass.msg : ''}`}
                        </p>

                        <LoginSignupFormBtn
                            type="submit"
                            btnName="Signup"
                            isLoading={loading}
                            btnColor="secondary"
                        />

                        <div className="py-6">
                            <p className="text-center text-sm text-white">
                                Already have an account?
                                <span className="cursor-pointer font-bold text-secondary hover:underline">
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
