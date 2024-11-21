import React from 'react';
import LoginSignupFormBtn from '../../Utilities/buttons/LoginSignupFormBtn';
import FormInputHandler from '../formInputHandler/FormInputHandler';
import Welcom from './Welcom';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Utilities/base/baseURL';
import { toast } from 'react-hot-toast';
import ToolTip from '../tooltip/ToolTip.jsx';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            email,
            password,
        };

        try {
            setLoading(true);
            const response = await axios.post(
                `${baseUrl}/user/login`,
                formData,
                {
                    headers: { 'Content-Type': 'Application/json' },
                }
            );

            const { message, token } = response.data;

            if (token) {
                localStorage.setItem('user-token', token);
                setError({});
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                toast.success(message);
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setError(error.response.data.errors);
            } else {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex gap-1">
                <div className="h-auto w-[400px] rounded-bl-lg rounded-tl-lg bg-foreground shadow-[0px_5px_25px_rgba(0,0,0,0.1)]">
                    <div className="mt-10 px-8">
                        <h2 className="text-2xl font-medium text-white">
                            Login
                        </h2>
                        <p className="mb-3 text-sm text-white/30">
                            Please login to continue.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="px-8">
                        <div className={`group relative`}>
                            <FormInputHandler
                                state={email}
                                setState={setEmail}
                                type="email"
                                name="diuEmail"
                                placeholder="Enter email"
                            />
                            <div
                                className={`absolute -right-2/4 top-1/2 hidden w-[200px] -translate-y-1/2 rounded bg-black p-2 text-[0.7em] text-white shadow-md group-hover:block`}
                            >
                                <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-black"></div>
                                <p>use "tamimahamed016@gmail.com" or signup!</p>
                                <p>password: 123456</p>
                            </div>
                        </div>

                        <p
                            className={`${
                                error.email
                                    ? 'block p-1 text-xs text-red'
                                    : 'hidden'
                            }`}
                        >
                            {error.email ? error.email.msg : ''}
                        </p>

                        <FormInputHandler
                            state={password}
                            setState={setPassword}
                            type="password"
                            name="password"
                            placeholder="Password"
                        />

                        <div className="flex justify-end text-sm font-medium text-secondary">
                            <p>Forgot password?</p>
                        </div>

                        <LoginSignupFormBtn
                            type="submit"
                            btnName="Login"
                            isLoading={loading}
                            btnColor="secondary" //color from color-scheme
                        />

                        <div className="py-6">
                            <p className="text-center text-sm text-white">
                                Don't have an account?
                                <span className="cursor-pointer font-bold text-secondary hover:underline">
                                    <Link to="/signup"> Signup</Link>
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

export default LoginForm;
