import React, { useEffect, useState } from 'react';
import LoginSignupFormBtn from '../../Utilities/buttons/LoginSignupFormBtn';
import FormInputHandler from '../formInputHandler/FormInputHandler';
import Welcom from './Welcom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Utilities/base/baseURL';
import { toast } from 'react-hot-toast';

function SignupForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const response = await axios.post(
                `${baseUrl}/user/signup`,
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
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
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors);
            } else {
                toast.error('Signup failed!' || error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex">
                <div className="h-auto w-[400px] rounded-bl-lg rounded-tl-lg bg-foreground shadow-[0px_5px_25px_rgba(0,0,0,0.1)]">
                    <div className="mt-10 px-8">
                        <h2 className="text-2xl font-medium text-white">
                            Sign up
                        </h2>
                        <p className="mb-3 text-sm text-white/30">
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
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.firstName ? error.firstName.msg : ''}`}
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
                            placeholder="Email"
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
                                    ? 'block bg-rose-100 p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {`${error.confirmPass ? error.confirmPass.msg : ''}`}
                        </p>

                        <LoginSignupFormBtn
                            type="submit"
                            btnName="Signup"
                            isLoading={loading}
                            btnColor="secondary" //color from color-scheme
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
                <Welcom />
            </div>
        </>
    );
}

export default SignupForm;
